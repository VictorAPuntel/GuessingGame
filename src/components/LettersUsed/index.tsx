import { Letter } from '../Letter'
import styles from './styles.module.css'

export type LettersUsedProp = {
  value: string
  isCorrect: boolean
}

type Props = {
  data: LettersUsedProp[]
}

export function LettersUsed({ data }: Props) {
  return (
    <div className={styles.lettersUsed}>
      <h5>Letras Utilizadas</h5>
      <div>
        {data.map(({ value, isCorrect }) => (
          <Letter
            key={value}
            value={value}
            size="small"
            color={isCorrect ? 'correct' : 'wrong'}
          />
        ))}
      </div>
    </div>
  )
}
