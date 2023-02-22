import { Button, Card, Spin } from 'antd';
import { useEffect, useState } from 'react'


const { Meta } = Card;

export const Timer = () =>{
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
  },[start])

  return(
    <div className='flex flex-col items-center p-5'>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <h1 className='text-white p-2'>Tugas 1 Timer </h1>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center justify-center">
        <div className='text-7xl text-white'>{count}</div>
        <div className='flex'>
          <div className='inline'>
          <Button style={{ background: "lime", borderColor: "yellow" }} className={'lime-7 mx-0.5'} onClick={handleStartStop}  >{start ? 'Stop' : 'Start'}</Button>
          <Button style={{ background: "red", borderColor: "yellow", color: "white" }} onClick={handleReset} disabled={start}>Reset</Button>
          </div>
        </div>
        <Spin spinning={loading}/>
        </div>
      </div>
    </div>
    )
}
export default Timer;