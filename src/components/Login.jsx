import {  useRef, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export const Login = () =>{
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const {auth, setAuth} = useContext(AuthContext)
 

    const onSubmit = (e) =>{
        e.preventDefault()
        fetchLogin(
            emailRef.current.value,
            passwordRef.current.value,
        )

    }

    // fake login
    const fetchLogin = (email, password, callback) => {
        setTimeout(() => {
            if (email === 'test@gmail.com' && password === '123') {
                setAuth({
                    email : email,
                    password : password,
                })
            } else {
                return alert(new Error('Invalid email and password'));
            }
        }, 1000);
    }


  

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
        
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0"> 
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input 
                                        ref={emailRef}
                                        type="email" 
                                        name="email" id="email" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="test@gmail.com"
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
                                        placeholder="123"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                     
                                        />
                                </div>
                                <button type="submit" className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}




export default Login