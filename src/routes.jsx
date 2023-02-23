import { createBrowserRouter, redirect } from 'react-router-dom'
import MainPage from './pages/index'
import LoginPage from './pages/auth/login/index'
import { supabase } from './config/supabase'
import RegisterPage from './pages/auth/register/index'



const Router = createBrowserRouter([
    {
        path:'/',
        element:<MainPage/>
    },
    {
        path:'/auth',
        children:[
            {
                path:'login',
                element:<LoginPage/>,
                loader: async () =>{
                    const {data, error} = await supabase.auth.getSession()
                    if(data.session){
                        return redirect('/')
                    }

                    return null
                }
            },
            {
                path:'register',
                element:<RegisterPage/>,
                loader: async () =>{
                    const {data, error} = await supabase.auth.getSession()
                    if(data.session){
                        return redirect('/')
                    }

                    return null
                }
            }
          
        ]   
    }
])

export default Router