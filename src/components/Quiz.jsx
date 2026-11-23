import { useState } from "react"
import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"

/**
 * Afficher la question en cours à l'utilisateur et lorsqu'il a répondu à la question, passer à une autre question.
 * Ce composant est chargé de passer d'une question à une autre et d'enregistrer les réponses de l'utilisateur
 */
export default function Quiz() {
  // On peut regarder le nb de réponses stocké dans ce tableau et en déduire l'index de la question active
  const [userAnswers, setUserAnswers] = useState([])

  // State dérivé ou valeur calculée pour connaître le numéro de la question active qui s'affiche
  const activeQuestionIndex = userAnswers.length

  // Autre valeur calculée pour savoir quand le quiz est terminé
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  // Met à jour le state quand l'utilisateur sélectionne une réponse
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer])
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Icône Trophé" />
        <h2>Quiz terminé !</h2>
      </div>
    )
  }

  /** Mélanger les réponses : ce code s'exécute uniquement s'il y a encore une question à afficher */
  // Copier le tableau des réponses pour ne pas perdre l'ordre d'origine
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
  // Modifier les réponses aléatoirement pour obtenir une valeur négative dans 50 cas sur 100 ou une valeur positive
  shuffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
