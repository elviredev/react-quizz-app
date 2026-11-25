import { useRef } from "react"

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  // Pour gérer une valeur qui ne changera pas quand le composant est exécuté à nouveau. Cela évite d'utiliser useState et useEffect
  const shuffledAnswers = useRef()

  /** Mélanger les réponses : ce code s'exécute uniquement s'il y a encore une question à afficher */
  if (!shuffledAnswers.current) {
    // Copier le tableau des réponses pour ne pas perdre l'ordre d'origine
    shuffledAnswers.current = [...answers]
    // Modifier les réponses aléatoirement pour obtenir une valeur négative dans 50 cas sur 100 ou une valeur positive
    // eslint-disable-next-line react-hooks/purity
    shuffledAnswers.current.sort(() => Math.random() - 0.5)
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // dernière réponse stockée dans les réponses de l'utilisateur
        const isSelected = selectedAnswer === answer
        let cssClass = ""

        if (answerState === "answered" && isSelected) {
          cssClass = "selected"
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
            >
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
