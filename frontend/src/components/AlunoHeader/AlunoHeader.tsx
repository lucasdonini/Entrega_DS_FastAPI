import logo from '../../assets/img/logo.png'
import styles from './AlunoHeader.module.css'

interface Props {
  nomeAluno: string       /* NOME_ALUNO */
}

export default function AlunoHeader({ nomeAluno }: Props) {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo do colégio Mémora" className={styles.logo} />
      <div className={styles.infoAluno}>
        <div className={styles.nomeClasse}>
          <p className={styles.textNome}>{nomeAluno}</p>
          <p className={styles.textAluno}>Aluno</p>
        </div>
      </div>
    </header>
  )
}