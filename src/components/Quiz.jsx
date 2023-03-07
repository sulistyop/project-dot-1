import { useState, useEffect } from "react";
import { Card, Button } from "antd"
import { supabase } from '../config/supabase'
import { useTimer } from "react-timer-hook";

const times = new Date();
const expiryTimestamp = times.setSeconds(times.getSeconds() + 90); // 1 minutes timer

//mengacak jawaban
const createRandom = (arr) => {
  let myArr = [...arr];  //membongkar array
  let randomizedArr = []; //wadah untuk array baru

  while (myArr.length > 0) {
    var randomIndex = Math.floor(Math.random() * myArr.length); //membuat nomor acak
    randomizedArr.push(myArr[randomIndex]); //mengacak array
    myArr.splice(randomIndex, 1);
  }
  return randomizedArr;
}


export const Quiz = (props) => {
  const question = props.result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const { correct_answer, incorrect_answers } = question[currentQuestion];
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  }, [])

  const MyTimer = () => {

    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
    } = useTimer({
      expiryTimestamp,
      onExpire: () => {
        setShowScore(true)
        return insertData()
      }
    });

    return (
      <div style={{ textAlign: 'center' }}>
        <p>Kerjakan Sebelum Waktu Habis</p>
        <div style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
      </div>
    );
  }

  const allAnswers = incorrect_answers
    ? incorrect_answers.concat(correct_answer)
    : [];


  async function insertData() {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          user_name: session.user.email,
          score: score,
          correct: correct,
          incorrect: incorrect
        }
      ])
    // console.log(data)
    // console.log(error)
  }

  const handleAnswerOptionClick = (answer) => {
    if (correct_answer == answer) {
      setScore(score + 1)
      setCorrect(correct + 1)
    } else {
      setInCorrect(incorrect + 1)
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true)
      return insertData()
    }
  }

  const handleBack = () => (
    window.location.reload()
  )

  const randomizedArr = createRandom(allAnswers)
  // console.log('benar :', correct_answer)



  return (

    <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0"}>

      {showScore ? '' : <MyTimer />}
      <Card>
        {
          showScore ?
            <Card extra={<Button onClick={handleBack}>Back</Button>}>
              <div className='score-section'>
                You scored {score} out of {question.length}
              </div>
            </Card>
            : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{question.length}
                  </div>
                  <div className='question-text font-bold'>{question[currentQuestion].question}</div>
                </div>
                <div className='answer-section'>
                  {randomizedArr.map((answerOption, i) => (
                    <button className="btn bg-lime-400 p-2 rounded-md m-2" key={i} onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption}</button>
                  ))}
                </div>
              </>
            )}
      </Card >

    </div >
  )
}