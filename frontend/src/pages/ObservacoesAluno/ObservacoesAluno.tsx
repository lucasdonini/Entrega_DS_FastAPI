import { useNavigate, Link, useParams } from 'react-router-dom'
import AlunoHeader from '../../components/AlunoHeader/AlunoHeader'
import CardObservacao from '../../components/CardObservacao/CardObservacao'
import styles from './ObservacoesAluno.module.css'
import type ResponseLoginAluno from '../../types/ResponseLoginAluno'

export default function ObservacoesAluno() {
  const navigate = useNavigate()
  const { matricula } = useParams()

  const json = sessionStorage.getItem('info_aluno')
  if (!json) {
    navigate('/login')
    return
  }

  const { aluno, observacoes_aluno: observacoes }: ResponseLoginAluno = JSON.parse(json)

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
            <CardObservacao key={i} titulo={obs.remetente} texto={obs.mensagem} data={obs.data_envio} />
          ))}
        </section>
      </main>
    </>
  )
}