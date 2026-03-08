import logo from '../../assets/logo.png'
import styles from './ProfessorHeader.module.css'
import type Disciplina from '../../types/Disciplina'

interface Props {
  nomeProfessor: string
  materias: Disciplina[]
}

export default function ProfessorHeader({ nomeProfessor, materias }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <img src={logo} alt="logo Colégio Mémora" className={styles.logo} />
        <div className={styles.professor}>
          <p>Prof. {nomeProfessor} <br />{materias.map(m => m.nome).join(', ')}</p>
        </div>
      </div>
    </header>
  )
}