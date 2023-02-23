import AppLayout from '../components/layouts/app.layouts'
import { supabase } from '../config/supabase'
import { Timer } from '../components/Timer'
import { Ref } from '../components/Ref'
import { useEffect, useState } from 'react'
import FormLogin from './auth/login'


const MainPage = () => {
      const [session, setSession] = useState(null)

      useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
              setSession(session)
            })
        
            supabase.auth.onAuthStateChange((_event, session) => {
              setSession(session)
            })
          },[]
      )
          
      return(
            <AppLayout>
                  {session ?
                        <div className='flex flex-col items-center p-2'>
                              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  dark:bg-gray-800 dark:border-gray-700">
                                    <div className='md:grid grid-cols-2 grid-rows-0'>
                                          {session ? <Timer/> :''}
                                          {session ? <Ref/> :''}
                                    </div>
                              </div>
                        </div>
                        : ''}
                
                 
            </AppLayout>
      )
}

  
export default MainPage