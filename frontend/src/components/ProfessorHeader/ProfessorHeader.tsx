import logo from '../../assets/logo.png'
import styles from './ProfessorHeader.module.css'

interface Props {
  nomeProfessor: string
  materias: string
  fotoPerfil: string
}

export default function ProfessorHeader({ nomeProfessor, materias, fotoPerfil }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <img src={logo} alt="logo Colégio Mémora" className={styles.logo} />
        <div className={styles.professor}>
          <p>Prof. {nomeProfessor} <br />{materias}</p>
          <img src={fotoPerfil} alt="foto de perfil do professor" />
        </div>
      </div>
    </header>
  )
}