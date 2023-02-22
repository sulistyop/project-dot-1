import { useContext, useEffect, useState, useRef, Fragment, createContext } from 'react'
import { Layout } from './components/Layout'
import { AuthContext } from './context/AuthContext'
import { Timer } from './components/Timer'
import { Ref } from './components/Ref'

const Tugas = () =>{
  const auth = useContext(AuthContext)
  
  return(
    <section>{auth.email ? <Fragment><Timer/><Ref/></Fragment> : null}</section>
  )
}

const  App =()=> {
  return (
    <Layout>
      {/* Tugas 2 :
        Implement bikin halaman Login menggunakan ref
        input Email dan Password secara dummy
        simpan datanya sebagai context / di local storage
        */}
        <Tugas/>
      
    </Layout>
  )
}


export default App
