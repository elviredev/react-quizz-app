import { useState } from "react"
import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx"
import QUESTIONS from "../questions.js"

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  })

  // Déclenchée chaque fois qu'une réponse est sélectionnée
  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    })
    // au bout d'1 sec, afficher si réponse est correcte ou non
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      })

      // déclenche la fonction handleSelectAnswer du composant "Quiz"
      setTimeout(() => {
        onSelectAnswer(answer)
      }, 2000)
    }, 1000)
  }

  let answerState = ""

  // si dans le state "answer", j'ai une réponse sélectionnée, je veux définir answerState en fonction du statut de la réponse
  // answerState sera transmis à "Answers"
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong"
  } else if (answer.selectedAnswer) {
    answerState = "answered"
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />

      <h2>{QUESTIONS[questionIndex].text}</h2>

      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}
