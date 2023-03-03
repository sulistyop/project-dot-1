import { useState } from "react";
import { Card } from "antd"
import { supabase } from '../config/supabase'
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";



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
  const navigate = useNavigate();
  const question = props.result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const { correct_answer, incorrect_answers } = question[currentQuestion];


  const MyTimer = () => {
    const times = new Date();
    const expiryTimestamp = times.setSeconds(times.getSeconds() + 5); // 1 minutes timer
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
          user_name: 'Sulistyo Pradana',
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
  console.log('benar :', correct_answer)
  return (
    <>
      {showScore ? '' : <MyTimer />}
      {showScore ? (

        <>
          <div className='score-section'>
            You scored {score} out of {question.length}
          </div>
          <button className={'btn bg-slate-900 hover:bg-slate-50'} onClick={handleBack}>Kembali</button>
        </>
      ) : (
        <>

          <Card >
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
          </Card>
        </>
      )}

    </>
  )
}