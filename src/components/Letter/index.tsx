import styles from './style.module.css'

type Props = {
  value?: string
  size?: 'default' | 'small'
  color?: 'default' | 'corret' | 'wrong'
}

export function Letter({
  value = '',
  size = 'default',
  color = 'default',
}: Props) {
  return (
    <div
      className={`${styles.letter} ${size === 'small' && styles.letterSmall} ${
        color === 'corret' && styles.letterCorrect
      } ${color === 'wrong' && styles.letterWrong}`}
    >
      <span>{value}</span>
    </div>
  )
}
