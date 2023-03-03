import AppLayout from '../components/layouts/app.layouts'
import { supabase } from '../config/supabase'
import { useEffect, useState } from 'react'
import { Button, List, Avatar, } from 'antd'
import { useQuestionsAmount } from '../modules/soal/hooks'
import { Spin, Card } from 'antd'
import { Quiz } from '../components/Quiz'

const MainPage = () => {
  const [session, setSession] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const { data, isLoading, error } = useQuestionsAmount({ amount: 10 })
  const [rank, setRank] = useState(null)

  const handleStartQuiz = (e) => {
    e.preventDefault()
    setQuiz(true)
    setRank(null)
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
      .order('score', { ascending: false })
      .range(0, 4)
    setRank(data)
  }
  return (
    <AppLayout>
      <div className={'p-2'} style={{ background: '#ECECEC' }}>
        <div className={'text-center '}>
          {isLoading && <Spin />}
        </div>
        {rank && !isLoading &&
          <Card title="Hasil Quiz" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={rank}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                    title={<a href="#">{item.user_name}</a>}
                    description={'Score :' + item.score}
                  />
                </List.Item>
              )}
            />
          </Card>}
      </div>
      <div className='flex flex-col items-center p-2'>

        {session ?
          <>
            {!quiz ?
              <Button onClick={handleStartQuiz} className='bg-blue-600 w-1/2 mt-2' type="primary" htmlType="submit">
                Mulai Quiz
              </Button>
              : <ShowQuestion />
            }
          </>
          :
          <h1 className='text-black py-5 text-2xl'>Login Untuk Memulai Quiz</h1>
        }
      </div>
    </AppLayout >
  )
}


export default MainPage