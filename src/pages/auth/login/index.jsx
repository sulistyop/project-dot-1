import { App, Button, Checkbox, Form, Input, Spin } from 'antd';
import AppLayout from '../../../components/layouts/app.layouts';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import { useState } from 'react';


const FormLogin = () =>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


  const onFinish = async (values) => {
    setLoading(true)
    const {data, error} = await supabase.auth.signInWithPassword({
      email:values?.email,
      password:values.password
    })

      setTimeout(()=>{
        try {
          if(data){
            navigate('/')
          }
          if (error) throw error
            alert('Login Berhasil !')      
        } catch (error) {
            alert(error.error_description || error.message)
            navigate('/auth/login')
        } finally {
          setLoading(false)
          
        }
      },1000)
     
  }


  
  const onFinishFailed = (errorInfo) => {

  }

  return (
    <AppLayout>
      
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0'>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Login Page
            </h1>
            {loading ? (
            <Spin></Spin>
          ) :
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
              <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button className='bg-blue-600' type="primary" htmlType="submit">
                  Submit
                </Button>
              
              </Form.Item>

            </Form>
            }

        </div>
    </AppLayout>
);
} 


export default FormLogin;