import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ProfessorHeader from '../../components/ProfessorHeader/ProfessorHeader'
import CardObservacao from '../../components/CardObservacao/CardObservacao'
import BoxNovaObservacao from '../../components/BoxNovaObservacao/BoxNovaObservacao'
import styles from './TelaObservacoesProfessor.module.css'

// Placeholders — substituir pelos dados vindos da API
const professor = {
  nome: 'Marcelo Grilo',
  materias: 'Banco de Dados, IA',
}

const aluno = {
  nome: 'Lucas Kluska Donini',
  matricula: '12345678',
}

interface Observacao {
  titulo: string
  texto: string
  data: string
}

const observacoesIniciais: Observacao[] = [
  {
    titulo: 'PDI Recusado',
    texto: 'Abre o Docker bixo!',
    data: '3/3/2026'
  },
  {
    titulo: 'Prova de Mongo',
    texto: 'Hoje tem prática',
    data: '2/3/2026'
  }
] /* OBSERVACOES_ALUNO */

export default function TelaObservacoesProfessor() {
  const navigate = useNavigate()
  const { matricula } = useParams() /* MATRICULA via React Router */

  const [mostrarBox, setMostrarBox] = useState(false)
  const [observacoes, setObservacoes] = useState<Observacao[]>(observacoesIniciais)

  function handleEnviar(texto: string) {
    /* CHAMADA_API_ADICIONAR_OBSERVACAO */
    setObservacoes([...observacoes, {
      titulo: 'Nova observação',
      texto,
      data: new Date().toLocaleDateString('pt-BR'),
    }])
    setMostrarBox(false)
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
          <p>Voltar</p>
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
          <Link to={`/professor/aluno/${matricula}/notas`} className={styles.abaNotas}>
            <i className="bi bi-journal"></i>
            <p>Notas</p>
          </Link>
          <div className={styles.abaObservacoes}>
            <i className="bi bi-chat-left-dots"></i>
            <p>Observações</p>
          </div>
        </div>

        <div className={styles.preObservacoes}>
          <div className={styles.tituloComContador}>
            <h2>Observações</h2>
            <span className={styles.contadorObs}>{observacoes.length}</span>
          </div>
          <button className={styles.btnAdicionarObservacao} onClick={() => setMostrarBox(!mostrarBox)}>
            <i className="bi bi-plus"></i>
            Adicionar Observação
          </button>
        </div>

        {mostrarBox && (
          <BoxNovaObservacao
            onCancelar={() => setMostrarBox(false)}
            onEnviar={handleEnviar}
          />
        )}

        <div className={styles.containerObservacoes}>
          {observacoes.map((obs, i) => (
            <CardObservacao key={i} titulo={obs.titulo} texto={obs.texto} data={obs.data} />
          ))}
        </div>
      </main>
    </>
  )
}