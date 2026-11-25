import { useState, useEffect } from "react"

/**
 * Ce composant affiche un timer pour la question en cours.
 * Si l'utilisateur n'a pas répondu à la question dans le temps imparti,
 * la question est considérée comme non répondu et la question suivante est affichée.
 */
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  // Utilisation de useEffect pour éviter les boucles infinies
  useEffect(() => {
    // une fois le délai écoulé, on appelle la fonction onTimeout
    // console.log('SETTING TIMEOUT')
    const timer = setTimeout(onTimeout, timeout)

    return () => clearTimeout(timer)
  }, [timeout, onTimeout])

  useEffect(() => {
    // Mettre à jour la valeur de la barre de progression toutes les 100ms
    // console.log("SETTING INTERVAL")
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode} />
}
