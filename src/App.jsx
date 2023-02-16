import { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/reset.css'
import { Button, Card, Space,Avatar,Spin } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Timer = () =>{
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleStartStop = () => {
    setLoading(true);
    setStart(start => !start)
    if(start){
      setLoading(loading => loading = false);
    }
  }

  const handleReset = () =>{
    setCount(0)
  }
  
  useEffect(()=>{
    const timer = setInterval(()=>{
      if(start){
        setCount(count => count + 1)
      }
    },1000)

    return () =>{
      clearInterval(timer)
    }

    }
  ,[start])

 

  return(
    <div>
      <Card style={{width: 300,}} cover={
      <h1>Timer</h1>
    }
    actions={[
      <Button style={{ background: "lime", borderColor: "yellow" }} className={'lime-7'} onClick={handleStartStop}  >{start ? 'Stop' : 'Start'}</Button>
      ,
      <div style={{ fontSize:"16pt"}}>{count}</div>,
      <Button style={{ background: "red", borderColor: "yellow", color: "white" }} onClick={handleReset} disabled={start}>Reset</Button>,
    ]}
  >
     <Spin spinning={loading}>
   
      </Spin>
  
  </Card>
    </div>
  )
}



function App() {
  const [count, setCount] = useState(0)
  


  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <Timer/>
      </div>
    </div>
    
  )
}

export default App
