import styles from './app.module.css'
import { Header } from './components/Header'

export default function App() {
  function handleRestarGame() {
    alert('Reinicia o game')
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestarGame} />
      </main>
    </div>
  )
}
