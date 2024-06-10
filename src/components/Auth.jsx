import React from 'react'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies() 

export const Auth = (props) => {

  const {setIsAuth}=props;

    const signInwithGoogle= async()=>{
      try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
      }
      catch(error){
        console.error(err);
      }
    }


  return (
    <div className='w-full h-screen bg-gray-300'>
        <div className='w-full flex flex-col items-center'>
          <h1 className='w-full text-white text-center p-4 mb-5 text-3xl sm:text-5xl font-bold bg-blue-800 tracking-wide'>ConvoCloud</h1>
          <p className='mt-12 font-bold'>Sign In with Google to Continue</p>
          <button onClick={signInwithGoogle} className="bg-blue-800 text-white my-4 px-3 py-2 rounded-md hover:shadow-lg transition hover:shadow-gray-500 hover:bg-blue-900 active:shadow-none">Sign In with Google</button>
        </div>
    </div>
  )
}
