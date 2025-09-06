import styles from './app.module.css'
import { WORDS, type Challenge } from './utils/words'
import { Header } from './components/Header'
import { Tip } from './components/Tip'
import { Letter } from './components/Letter'
import { Input } from './components/Input'
import { Button } from './components/Button'
import { LettersUsed, type LettersUsedProp } from './components/LettersUsed'
import { useEffect, useState } from 'react'

export default function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [letter, setLetter] = useState('')
  const [lettersUsed, setletterUsed] = useState<LettersUsedProp[]>([])
  const [score, setScore] = useState(0)
  const ATTEMPS_MARGIN = 5

  function handleRestarGame() {
    const isConfirmed = window.confirm(
      'Você tem certeza que deseja reinicar o jogo?'
    )

    if (isConfirmed) {
      startGame()
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]
    setChallenge(randomWord)

    setScore(0)
    setLetter('')
    setletterUsed([])
  }

  function endGame(message: string) {
    alert(message)
    startGame()
  }

  function handleConfirm() {
    if (!challenge) return
    if (!letter.trim()) {
      return alert('Digite uma letra')
    }

    const value = letter.toUpperCase()
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    )

    if (exists) {
      setLetter('')
      return alert('Você já digitou essa letra' + value)
    }

    const hits = challenge.word
      .toUpperCase()
      .split('')
      .filter((char) => char === value).length

    const isCorrect = hits > 0

    const currentScore = score + hits

    setletterUsed((prevState) => [...prevState, { value, isCorrect }])
    setScore(currentScore)
    setLetter('')
  }

  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if (!challenge) {
      return
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame('Parabéns, você descobriu a palavra')
      }

      const attemptLimit = challenge.word.length + ATTEMPS_MARGIN

      if (lettersUsed.length === attemptLimit) {
        return endGame('Que pena, você usou todas as tentativas')
      }
    }, 200)
  }, [score, lettersUsed.length, challenge, endGame])

  if (!challenge) {
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={score}
          max={challenge.word.length + ATTEMPS_MARGIN}
          onRestart={handleRestarGame}
        />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split('').map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            )
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.isCorrect ? 'correct' : 'default'}
              />
            )
          })}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}
