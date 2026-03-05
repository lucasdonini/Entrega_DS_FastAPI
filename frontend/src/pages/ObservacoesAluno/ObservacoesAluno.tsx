import { useNavigate, Link, useParams } from 'react-router-dom'
import AlunoHeader from '../../components/AlunoHeader/AlunoHeader'
import CardObservacao from '../../components/CardObservacao/CardObservacao'
import styles from './ObservacoesAluno.module.css'

// Placeholders — substituir pelos dados vindos da API
const aluno = {
  nome: 'Lucas Kluska Donini',
}

interface Observacao {
  titulo: string
  texto: string
  data: string
}

const observacoes: Observacao[] = [
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

export default function ObservacoesAluno() {
  const navigate = useNavigate()
  const { matricula } = useParams() /* MATRICULA via React Router */

  return (
    <>
      <AlunoHeader nomeAluno={aluno.nome} />
      <main>
        <button className={styles.btnVoltar} onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left-circle"></i>
          <p>Voltar</p>
        </button>

        <section className={styles.apresentacaoInformacoes}>
          <h1 className={styles.tituloText}>Bem-vindo, {aluno.nome}!</h1>
          <p className={styles.subtituloText}>Veja suas notas e observações</p>

          <div className={styles.options}>
            <Link to={`/aluno/${matricula}/notas`} className={styles.abaNotas}>
              <i className="bi bi-journal"></i>
              <p>Notas</p>
            </Link>
            <div className={styles.abaObservacoes}>
              <i className="bi bi-chat-left-dots"></i>
              <p>Observações</p>
            </div>
          </div>
        </section>

        <section className={styles.tituloObservacoes}>
          <h2>Observações</h2>
          <div className={styles.quantidade}>
            <p>{observacoes.length}</p>
          </div>
        </section>

        <section className={styles.containerObservacoes}>
          {observacoes.map((obs, i) => (
            <CardObservacao key={i} titulo={obs.titulo} texto={obs.texto} data={obs.data} />
          ))}
        </section>
      </main>
    </>
  )
}