import { useEffect, useState, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Layout = ({children}) =>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [auth, setAuth] = useState({name:'',email:''})

    const handleLogin = (e) =>{
      e.preventDefault()
        setAuth({
            name : 'Sulistyo Pradana',
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }),[]
    }
  
    useEffect(()=>{
      if(!auth.email){
        emailRef.current.focus()
      }else{
        console.log(auth)
      }
       
    })
    
    const Login = () =>{
        return (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                            ref={emailRef}
                            type="email" 
                            name="email" id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com"
                            required=""
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            />
                    </div>
                    <button type="submit" className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                </form>
            </div>
        )
    }

    const Avatar = () =>{
        
        return (
            <div className="flex items-center space-x-4  p-5">
                <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/150?img=18" alt=""/>
                <div className="font-medium dark:text-white">
                    <div>{auth.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{auth.email}</div>
                </div>
            </div>
        )
    }
  
    return(
        <AuthContext.Provider value={auth}>
            <div className="bg-gray-50 dark:bg-gray-900">
            {!auth.email ? '' : <Avatar/>}
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0"> 
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        
                        {!auth.email ? <Login/> : ''}
                        {children}
                    </div>
                </div>
            </div>
           
        </AuthContext.Provider>
    )
}