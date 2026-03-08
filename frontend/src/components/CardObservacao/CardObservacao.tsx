import styles from './CardObservacao.module.css'

interface Props {
  texto: string
  data: string
}

export default function CardObservacao({ texto, data }: Props) {
  return (
    <div className={styles.card}>
      <h4>{texto}</h4>
      <p className={styles.dataObs}>{data}</p>
    </div>
  )
}