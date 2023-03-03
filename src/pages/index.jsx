import AppLayout from '../components/layouts/app.layouts'
import { supabase } from '../config/supabase'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useQuestionsAmount } from '../modules/soal/hooks'
import { Spin } from 'antd'
import { Quiz } from '../components/Quiz'


const MainPage = () => {
  const [session, setSession] = useState(null)
  const [quiz, setQuiz] = useState(false)
  const { data, isLoading, error } = useQuestionsAmount({ amount: 10 })
  const [rank, setRank] = useState(null)
  const handleStartQuiz = (e) => {
    e.preventDefault()
    setQuiz(true)
  }

  const ShowQuestion = () => {
    return (
      <div className='flex flex-col items-center p-2'>
        {isLoading && <Spin />}
        {data && !isLoading && <Quiz result={data['results']} />}
      </div>
    )
  }

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    getDataAnswers()
  }, []
  )

  const getDataAnswers = async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
    setRank(data)

  }

  return (
    <AppLayout>
      <div className='flex flex-col items-center p-2'>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-md">
          <h1>Hasil Quiz</h1>
          {data && !isLoading && <>  {rank.map((lesson, i) => (
            <a key={i} className='text-black'>{i + 1} .{lesson.user_name} Score:{lesson.score} Correct : {lesson.correct} In Correct : {lesson.incorrect} </a>
          ))}</>}
        </div>
        {session ?
          <>
            {quiz ?
              <ShowQuestion /> :
              <Button onClick={handleStartQuiz} className='bg-blue-600 w-1/2 mt-2' type="primary" htmlType="submit">
                Mulai Quiz
              </Button>
            }
          </>
          :
          <h1 className='text-white'>Login Untuk Memulai Quiz</h1>
        }
      </div>
    </AppLayout >
  )
}


export default MainPage