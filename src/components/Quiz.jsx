import { useState } from "react"
import QUESTIONS from "../questions.js"

/**
 * Afficher la question en cours à l'utilisateur et lorsqu'il a répondu à la question, passer à une autre question.
 * Ce composant est chargé de passer d'une question à une autre et d'enregistrer les réponses de l'utilisateur
 */
export default function Quiz() {
  // On peut regarder le nb de réponses stocké dans ce tableau et en déduire l'index de la question active
  const [userAnswers, setUserAnswers] = useState([])

  // State dérivé ou valeur calculée pour connaître le numéro de la question active qui s'affiche
  const activeQuestionIndex = userAnswers.length

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer])
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>))}
        </ul>
      </div>
    </div>
  )
}
