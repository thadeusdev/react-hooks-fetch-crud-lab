import React, {useEffect, useState} from "react";
import QuestionItem from './QuestionItem'

const url = 'http://localhost:4000/questions'

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  function handleDelete(id){
    fetch(url/`${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      const newList = questions.filter((quiz) => quiz.id !== id)
      setQuestions(newList)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(url/`${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((quiz) => {
        if (quiz.id === updatedQuestion.id) return updatedQuestion;
        return quiz;
      });
      setQuestions(updatedQuestions);
    });
  }

  const questionLists = questions.map((quiz) => {
    return (
      <QuestionItem 
        key={quiz.id} 
        question={quiz} 
        onDeleteClick={handleDelete} 
        onAnswerChange = {handleAnswerChange}
      />
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionLists}</ul>
    </section>
  );
}

export default QuestionList;
