import { useState } from 'react'
import styles from './BoxAdicionarNota.module.css'
import type Disciplina from '../../types/Disciplina'

interface Props {
  matriculaAluno: string
  usuarioProfessor: string
  disciplinas: Disciplina[]
  onCancelar: () => void
  onSalvar: (dados: { n1: number; n2: number; cod_materia: number }) => void
}

export default function BoxAdicionarNota({ matriculaAluno, usuarioProfessor, disciplinas, onCancelar, onSalvar }: Props) {
  const [n1, setN1] = useState('')
  const [n2, setN2] = useState('')
  const [codigoDisciplina, setCodigoDisciplina] = useState(0)

  function handleSalvar() {
    onSalvar({ n1: Number(n1), n2: Number(n2), cod_materia: codigoDisciplina })
  }

  return (
    <div className={styles.box}>
      <h3>Lançamento de Nota</h3>

      <div className={styles.inputsNota}>
        <input
          type="number" step=".01" min="0" max="10"
          placeholder="Digite a n1"
          value={n1}
          onChange={(e) => setN1(e.target.value)}
        />
        <input
          type="number" step=".01" min="0" max="10"
          placeholder="Digite a n2"
          value={n2}
          onChange={(e) => setN2(e.target.value)}
        />
        <select value={codigoDisciplina} onChange={(e) => setCodigoDisciplina(Number(e.target.value))}>
          <option value="">-- Selecione --</option>
          {disciplinas.map(({codigo, nome}) => (
            <option key={codigo} value={codigo}>{nome}</option>
          ))}
        </select>
      </div>

      <div className={styles.botoesNota}>
        <button className={styles.cancelar} onClick={onCancelar}>Cancelar</button>
        <button className={styles.salvar} onClick={handleSalvar}>Concluir</button>
      </div>
    </div>
  )
}