import { Button, Menu, Row, Col, Avatar, Dropdown, Space } from "antd"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { supabase } from "../../config/supabase"
import {UserOutlined} from "@ant-design/icons"


const leftItems = [
    {
        label: <NavLink to="/">Home</NavLink>,
        key: 'home',
        style:{
            color: '#fca311'
        }
    }
]

const rightItems = [
    {
        label: <NavLink to="/auth/login">Login</NavLink>,
        key: 'login',
        style:{
            color: '#fca311'
        }
    },
    {
        label: <NavLink to="/auth/register">Register</NavLink>,
        key: 'register',
        style:{
            color: '#fca311'
        }
    }
]





export const TopNavigation = () =>{
    const navigation = useNavigate()
    const [current, setCurrent] = useState('')
    const [session, setSession] = useState(null)
   
    useEffect(() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
          })
      
          supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
          })
        },[current]
    )
  

    // Logout 
    const handleLogout = () => {
        supabase.auth.signOut().then(()=>{
            navigation('/auth/login')
        })
    }

    

    //Dropdown Profile item
    const items = [
      
        {
          label: <div className="text-black flex flex-col items-center" ><Button className="text-black" onClick={handleLogout}>Logout</Button></div>,
          style: {
            color: '#fca311',
          }
        }
       
    ];

    // Dropdown Profile Parent
    const authItems = [
        {
            label : 
            <Dropdown menu={{items}} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <UserOutlined />      
                    </Space>
                </a>
            </Dropdown>,
            style: {
                color: '#fca311',
            }
        }
    ]


    const onClick = (e) =>{
        setCurrent(e.key)
    }

    return(
        <Row style={{width:'100%'}}>
            <Col>
                <Menu 
                style={{backgroundColor:'#14213d', display:'flex',justifyContent:'start'}} 
                onClick={onclick}
                selectedKeys={[current]}
                mode="horizontal"
                items={leftItems}
                />
            </Col>
       
            <Col flex={'auto'}>
                <Menu 
                style={{backgroundColor:'#14213d', display:'flex',justifyContent:'end'}} 
                onClick={onclick}
                selectedKeys={[current]}
                mode="horizontal"
                items={session ? authItems : rightItems }
                />
            </Col>
            

        </Row>
    )
}

export default TopNavigation