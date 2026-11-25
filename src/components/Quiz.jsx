import { useState, useCallback } from "react"
import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"
import Question from "./Question.jsx"

/**
 * Afficher la question en cours à l'utilisateur et lorsqu'il a répondu à la question, passer à une autre question.
 * Ce composant est chargé de passer d'une question à une autre et d'enregistrer les réponses de l'utilisateur
 */
export default function Quiz() {
  // On peut regarder le nb de réponses stocké dans ce tableau et en déduire l'index de la question active
  const [userAnswers, setUserAnswers] = useState([])

  // Connaître le numéro de la question suivante qui s'affiche
  const activeQuestionIndex = userAnswers.length

  // Autre valeur calculée pour savoir quand le quiz est terminé
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  // Met à jour le state quand l'utilisateur sélectionne une réponse
  // useCallback mémorise la fonction pour éviter de la récréer à chaque rendu
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer])
  }, [])

  // Si le timer a expiré, on passe à la question suivante
  // Cette fonction utilise handleSelectAnswer et donc elle dépend aussi de handleSelectAnswer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  )

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Icône Trophé" />
        <h2>Quiz terminé !</h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <Question
        // À chaque fois que la question change, le composant est recréé grâce à "key" mais "key" est réservé pour React donc on crée notre propre props
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}
