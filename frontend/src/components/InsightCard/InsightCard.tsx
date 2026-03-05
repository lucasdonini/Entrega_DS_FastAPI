import styles from './InsightCard.module.css'
import { type ReactNode } from 'react'

interface Props {
  icone: ReactNode
  valor: number | string
  label: string
}

export default function InsightCard({ icone, valor, label }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.icone}>{icone}</div>
      <div className={styles.content}>
        <h2>{valor}</h2>
        <p>{label}</p>
      </div>
    </div>
  )
}