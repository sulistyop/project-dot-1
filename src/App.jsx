import { Timer } from './components/Timer'
import { Ref } from './components/Ref'
import { Login } from './components/login'
import { AuthContext } from './context/AuthContext'
import {  useState } from 'react'

export default function App () {
   const [auth, setAuth] = useState({email:'',password:''})

    return (
      <div className="bg-gray-50 dark:bg-gray-900 w-full h-full">
        <AuthContext.Provider value={{auth, setAuth}}>
          {auth.email ?
              <div className='flex flex-col items-center p-5'>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className='text-white p-5'>
                      <h2>Anda Login sebagai : {auth.email}</h2>
                      <button className='bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={()=>setAuth({email:'',password:''})}>Logout</button>
                    </div>
                  </div>
              </div>
            : ''}
          {!auth.email ? <Login/> :''}
          {auth.email ? <Timer/> :''}
          {auth.email ? <Ref/> :''}
      </AuthContext.Provider>
      </div>
    )
}




