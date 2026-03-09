import { useState } from 'react'
import styles from './TabelaAlunos.module.css'

interface Aluno {
  matricula: string
  nome: string
}

interface Props {
  alunos: Aluno[]
  onAlunoClick: (matricula: string) => void
}

export default function TabelaAlunos({ alunos, onAlunoClick }: Props) {
  const [buscaMat, setBuscaMat] = useState('')
  const [filtroMat, setFiltroMat] = useState('')
  const [buscaNome, setBuscaNome] = useState('')
  const [filtroNome, setFiltroNome] = useState('')

  const alunosFiltrados = alunos.filter((a) =>
    a.matricula.includes(filtroMat) && a.nome.includes(filtroNome)
  )

  function handleBuscar() {
    setFiltroMat(buscaMat)
    setFiltroNome(buscaNome)
  }

  return (
    <>
      <div className={styles.searchText}>
        <h2>Buscar aluno</h2>
        <div className={styles.searchField}>
          <input
            className={styles.input}
            type="text"
            placeholder="Buscar por matrícula..."
            value={buscaMat}
            onChange={(e) => setBuscaMat(e.target.value)}
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Buscar por nome..."
            value={buscaNome}
            onChange={e => setBuscaNome(e.target.value)}
          />

          <button className={styles.botaoBuscar} onClick={handleBuscar}>
            Buscar
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {alunosFiltrados.map((aluno, i) => (
            <tr
              key={aluno.matricula}
              className={i % 2 === 0 ? styles.fundoEscuro : ''}
              onClick={() => onAlunoClick(aluno.matricula)}
            >
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}