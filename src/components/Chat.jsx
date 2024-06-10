import React, { useEffect, useState,useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot,query, where, orderBy } from 'firebase/firestore';
import {auth, db } from '../firebase';

export const Chat =  (props) => {

    const {room}=props;

    const [newMessage, setNewMessage]=useState("");
    const[messages,setMessages]=useState([]);
    const messagesRef= collection(db, "messages");

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(()=>{
        const queryMessages=query(messagesRef, where("room","==", room),orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id});
            });
            scrollToBottom();
            setMessages(messages);
        })
        return () => unsubscribe();
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(newMessage==="") return;

        await addDoc(messagesRef, {
            text:newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
        })

        setNewMessage("")
    };

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col w-[270px] sm:w-[550px] bg-white'>
            <div className='bg-blue-800 text-white text-center text-2xl sm:text-3xl font-semibold p-3'>
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className='container p-3 overflow-y-auto max-h-[285px] sm:max-h-[400px]'>
                {messages.map((message) => (
                    <div className='my-1' key={message.id}>
                        <span className='font-bold'>{message.user}:</span> {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <form className='w-full flex' onSubmit={handleSubmit}>
                <input
                    className='w-full px-2 py-1 border outline-none border-blue-800'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    placeholder='Type your message here'
                />
                <button className='bg-blue-800 text-white px-2 py-1 hover:bg-blue-900' type='submit'>
                    Send
                </button>
            </form>
        </div>
    </div>

  )
}
