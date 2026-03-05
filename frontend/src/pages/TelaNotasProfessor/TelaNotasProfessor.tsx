import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ProfessorHeader from '../../components/ProfessorHeader/ProfessorHeader'
import NotaCard from '../../components/NotaCard/NotaCard'
import BoxAdicionarNota from '../../components/BoxAdicionarNota/BoxAdicionarNota'
import styles from './TelaNotasProfessor.module.css'

// Placeholders — substituir pelos dados vindos da API
const professor = {
  nome: 'Marcelo Grilo',
  materias: 'Banco de Dados, IA',
  usuario: '/* USUARIO_PROFESSOR */',
  disciplinas: [] as { codigo: string; nome: string }[], /* DISCIPLINAS_PROFESSOR */
}

const aluno = {
  nome: 'Lucas Kluska Donini',
  matricula: '12345678',
  notas: [
    {
    disciplina: 'Banco de Dados',
    n1: 10,
    n2: 10,
    media: 10
  },
  {
    disciplina: 'IA',
    n1: 8,
    n2: 6,
    media: 7
  }
] /* NOTAS_ALUNO */
}

export default function TelaNotas() {
  const navigate = useNavigate()
  const { matricula } = useParams() /* MATRICULA via React Router */

  const [mostrarAdicionar, setMostrarAdicionar] = useState(false)

  function handleSalvarNota(dados: { n1: number; n2: number; codigoDisciplina: string }) {
    /* CHAMADA_API_LANCAR_NOTA */
    setMostrarAdicionar(false)
  }

  return (
    <>
      <ProfessorHeader
        nomeProfessor={professor.nome}
        materias={professor.materias}
      />
      <main>
        <button className={styles.btnVoltar} onClick={() => navigate('/professor')}>
          <i className="bi bi-arrow-left-circle"></i>
          Voltar
        </button>

        <div className={styles.blocoAluno}>
          <div className={styles.iconeUser}>
            <i className="bi bi-person"></i>
          </div>
          <div>
            <h2>{aluno.nome}</h2>
            <p>Matrícula: {aluno.matricula}</p>
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.abaNotas}>
            <i className="bi bi-journal"></i>
            <p>Notas</p>
          </div>
          <Link to={`/professor/aluno/${matricula}/observacoes`} className={styles.abaObservacoes}>
            <i className="bi bi-chat-left-dots"></i>
            <p>Observações</p>
          </Link>
        </div>

        <div className={styles.preNotas}>
          <h2>Notas</h2>
          <button className={styles.btnAdicionarNota} onClick={() => setMostrarAdicionar(!mostrarAdicionar)}>
            <i className="bi bi-plus"></i>
            Adicionar Nota
          </button>
        </div>

        {mostrarAdicionar && (
          <BoxAdicionarNota
            matriculaAluno={aluno.matricula}
            usuarioProfessor={professor.usuario}
            disciplinas={professor.disciplinas}
            onCancelar={() => setMostrarAdicionar(false)}
            onSalvar={handleSalvarNota}
          />
        )}

        <div className={styles.notasContainer}>
          {aluno.notas.map((nota, i) => (
            <NotaCard
              key={i}
              index={i + 1}
              disciplina={nota.disciplina}
              n1={nota.n1}
              n2={nota.n2}
              media={nota.media}
            />
          ))}
        </div>
      </main>
    </>
  )
}