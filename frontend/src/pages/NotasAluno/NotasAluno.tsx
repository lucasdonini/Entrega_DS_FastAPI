import { useNavigate, Link, useParams } from "react-router-dom";
import AlunoHeader from "../../components/AlunoHeader/AlunoHeader";
import styles from "./NotasAluno.module.css";
import type ResponseLoginAluno from "../../types/ResponseLoginAluno";
import { useEffect, useState } from "react";
import type Aluno from "../../types/Aluno";
import type Nota from '../../types/Nota'

export default function NotasAluno() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno>()
  const [notas, setNotas] = useState<Nota[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const json = sessionStorage.getItem("info_aluno");
    if (!json) {
      navigate("/login");
      return;
    }
    console.log(json)

    const infoAluno: ResponseLoginAluno = JSON.parse(json)
    setAluno(infoAluno.aluno)
    setNotas(infoAluno.notas)
    setLoaded(true)
  }, []);

  return loaded && (
    <>
      <AlunoHeader nomeAluno={aluno!.nome} />
      <main>
        <button className={styles.btnVoltar} onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left-circle"></i>
          <p>Voltar</p>
        </button>

        <section className={styles.apresentacaoInformacoes}>
          <h1 className={styles.tituloText}>Bem-vindo, {aluno!.nome}!</h1>
          <p className={styles.subtituloText}>Veja suas notas e observações</p>

          <div className={styles.options}>
            <div className={styles.abaNotas}>
              <i className="bi bi-journal"></i>
              <p>Notas</p>
            </div>
            <Link
              to={`/aluno/observacoes`}
              className={styles.abaObservacoes}
            >
              <i className="bi bi-chat-left-dots"></i>
              <p>Observações</p>
            </Link>
          </div>
        </section>

        <section className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Matéria</p>
                </th>
                <th>
                  <p>1° Nota</p>
                </th>
                <th>
                  <p>2° Nota</p>
                </th>
                <th>
                  <p>Média Final</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, i) => (
                <tr key={i}>
                  <td>
                    <p>{nota.materia}</p>
                  </td>
                  <td>
                    <p>{nota.n1}</p>
                  </td>
                  <td>
                    <p>{nota.n2}</p>
                  </td>
                  <td>
                    <p className={styles.media}>{(nota.n1 + nota.n2) / 2}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
