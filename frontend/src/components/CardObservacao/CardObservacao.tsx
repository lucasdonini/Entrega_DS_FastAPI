import styles from './CardObservacao.module.css'

interface Props {
  id: string
  texto: string
  data: string,
  sudo: boolean
  onExcluir?: (id: string) => void
}

export default function CardObservacao({ id, sudo, texto, data, onExcluir }: Props) {
  return (
    <div className={styles.card}>
      <h4>{texto}</h4>
      <p className={styles.dataObs}>{data}</p>
      {sudo && onExcluir && <button onClick={() => onExcluir(id)}>Excluir</button>}
    </div>
  )
}