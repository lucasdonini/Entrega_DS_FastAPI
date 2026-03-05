import logo from '../../assets/logo.png'
import styles from './AlunoHeader.module.css'

interface Props {
  nomeAluno: string       /* NOME_ALUNO */
  fotoPerfil: string      /* URL_FOTO_PERFIL */
}

export default function AlunoHeader({ nomeAluno, fotoPerfil }: Props) {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo do colégio Mémora" className={styles.logo} />
      <div className={styles.infoAluno}>
        <div className={styles.nomeClasse}>
          <p className={styles.textNome}>{nomeAluno}</p>
          <p className={styles.textAluno}>Aluno</p>
        </div>
        <img src={fotoPerfil} alt="foto de perfil do aluno" className={styles.perfil} />
      </div>
    </header>
  )
}