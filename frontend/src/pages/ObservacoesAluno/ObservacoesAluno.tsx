import { useNavigate, Link, useParams } from "react-router-dom";
import AlunoHeader from "../../components/AlunoHeader/AlunoHeader";
import CardObservacao from "../../components/CardObservacao/CardObservacao";
import styles from "./ObservacoesAluno.module.css";
import type ResponseLoginAluno from "../../types/ResponseLoginAluno";
import { useState, useEffect } from "react";
import type Aluno from "../../types/Aluno";
import type Observacao from "../../types/Observacao";

export default function ObservacoesAluno() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno>();
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const json = sessionStorage.getItem("info_aluno");
    if (!json) {
      navigate("/login");
      return;
    }

    const infoAluno: ResponseLoginAluno = JSON.parse(json);
    setAluno(infoAluno.aluno);
    setObservacoes(infoAluno.observacoes_aluno);
    setLoaded(true);
  }, []);

  console.log(observacoes)

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
            <Link to={`/aluno/notas`} className={styles.abaNotas}>
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
          {observacoes.map(({ id, mensagem, data_envio }) => (
            <CardObservacao
              key={id}
              id={id}
              sudo={false}
              texto={mensagem}
              data={data_envio}
            />
          ))}
        </section>
      </main>
    </>
  );
}
