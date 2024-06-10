import { useState, useRef } from "react"
import { Auth } from "./components/Auth"
import Cookies from 'universal-cookie';
import { Chat } from "./components/Chat";
const cookies = new Cookies() 

import { signOut } from "firebase/auth";
import { auth } from "./firebase";


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom]=useState(null)

  const roomInputRef=useRef(null);

  const signUserOut=async ()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if(!isAuth){
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  
  return(
    <div className="w-full h-screen bg-gray-300">
      <h1 className='w-full text-white text-center p-2 sm:p-4 mb-5 text-3xl sm:text-5xl font-bold bg-blue-800 tracking-wide'>ConvoCloud</h1>
      {room ?
        <Chat room={room}/> : 
        <div className="flex flex-col text-center items-center">
          <label className="font-bold my-2 text-2xl sm:text-3xl text-blue-900">Enter Room Name: </label>
          <input className="border border-blue-800 py-2 px-3 rounded-full outline-none " ref={roomInputRef}/>
          <button 
            onClick={()=> setRoom(roomInputRef.current.value)}
            className="bg-blue-800 px-3 py-2 text-white my-2 rounded-md hover:shadow-lg transition hover:shadow-gray-500 hover:bg-blue-900 active:shadow-none">
            Enter Chat
          </button>
        </div>
      }
      <div className="sign-out">
        <button className="my-4 border border-blue-800 bg-white p-2 rounded-md ml-2 transition hover:text-white hover:bg-blue-800 font-semibold" onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  )

}

export default App
