import React, { useEffect, useState } from 'react'
import Question from './Question'
import { hot } from "react-hot-loader/root"
import FAQForm from './FAQForm'


const FAQList = props => {
     // using state for getting, setting, saving
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const fetchQuestions = async () => {
    try {
      // fetching data
      const response = await fetch('/api/v1/questions')
      // throwing an error
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      // waiting a parsing response from json
      const responseBody = await response.json()
      // setting questions in a state
      setQuestions(responseBody.questions)
    }
    catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

     // adding new questions by 
     // fieldState is a variable that we are saving new data on
  const handleNewFAQ = async (fieldState) => {
    try {
      // two arguments in this fetch - getter and setter(object to post)
      const response = await fetch('/api/v1/questions', {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        // send the data in json stringified format(for it to be understandable)
        body: JSON.stringify(fieldState)
      })

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()

      setQuestions(questions.concat(body.question))

      // or 

      // setQuestions([
      //   ...questions,
      //   body.question
      // ])

    }
    catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])


  const toggleQuestionSelect = id => {
    if (id === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(id)
    }
  }

  const questionListItems = questions.map(question => {
    let selected
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => {
      toggleQuestionSelect(question.id)
    }

    return (
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  return (
    <div className="page">
      <h1>We Are Here To Help</h1>
      <div className="question-list">{questionListItems}</div>
      <FAQForm handleNewFAQ={handleNewFAQ} />
    </div>
  )
}

export default hot(FAQList)
