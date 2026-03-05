import { useNavigate, Link, useParams } from 'react-router-dom'
import AlunoHeader from '../../components/AlunoHeader/AlunoHeader'
import styles from './NotasAluno.module.css'

// Placeholders — substituir pelos dados vindos da API
const aluno = {
  nome: 'Lucas Kluska Donini',
}

interface Nota {
  materia: string
  professor: string
  n1: number | string
  n2: number | string
  media: number | string
}

const notas: Nota[] = [
  {
    materia: 'Banco de Dados',
    professor: 'Marcelo Grilo',
    n1: 10,
    n2: 10,
    media: 10
  },
  {
    materia: 'IA',
    professor: 'Marcelo Grilo',
    n1: 8,
    n2: 6,
    media: 7
  }
] /* NOTAS_ALUNO */

export default function NotasAluno() {
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
            <div className={styles.abaNotas}>
              <i className="bi bi-journal"></i>
              <p>Notas</p>
            </div>
            <Link to={`/aluno/${matricula}/observacoes`} className={styles.abaObservacoes}>
              <i className="bi bi-chat-left-dots"></i>
              <p>Observações</p>
            </Link>
          </div>
        </section>

        <section className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th><p>Matéria</p></th>
                <th><p>Professor(a)</p></th>
                <th><p>1° Nota</p></th>
                <th><p>2° Nota</p></th>
                <th><p>Média Final</p></th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, i) => (
                <tr key={i}>
                  <td><p>{nota.materia}</p></td>
                  <td><p>{nota.professor}</p></td>
                  <td><p>{nota.n1}</p></td>
                  <td><p>{nota.n2}</p></td>
                  <td><p className={styles.media}>{nota.media}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}