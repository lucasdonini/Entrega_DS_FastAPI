import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGet, usePost } from "../../utils/request";
import ProfessorHeader from "../../components/ProfessorHeader/ProfessorHeader";
import CardObservacao from "../../components/CardObservacao/CardObservacao";
import BoxNovaObservacao from "../../components/BoxNovaObservacao/BoxNovaObservacao";
import styles from "./TelaObservacoesProfessor.module.css";
import type Professor from "../../types/Professor";
import type Aluno from "../../types/Aluno";
import type ResponseLoginProfessor from "../../types/ResponseLoginProfessor";
import type Disciplina from "../../types/Disciplina";
import type Observacao from "../../types/Observacao";

interface CreateObservacao {
  mensagem: string;
  data_envio: string;
  id_destinatario: string;
  id_remetente: string;
}

export default function TelaObservacoesProfessor() {
  const navigate = useNavigate();
  const { matricula } = useParams();
  const [mostrarBox, setMostrarBox] = useState(false);
  const [materias, setMaterias] = useState<Disciplina[]>([]);
  const [professor, setProfessor] = useState<Professor>();
  const [aluno, setAluno] = useState<Aluno>();
  const [mensagemErro, setMensagemErro] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: sucessoPost,
    error: postError,
    loading: postLoading,
    post,
  } = usePost<boolean>();

  function handleEnviar(texto: string) {
    const obs: CreateObservacao = {
      mensagem: texto,
      data_envio: new Date().toISOString(),
      id_remetente: professor!.id,
      id_destinatario: matricula!,
    };
    post(`/api/enviar-observacao`, obs);
    setMostrarBox(false);
  }

  useEffect(() => {
    if (sucessoPost) setRefreshKey(refreshKey + 1);
  }, [sucessoPost]);

  useEffect(() => {
    const json = sessionStorage.getItem("info_professor");
    if (!json) {
      navigate("/login");
      return;
    }

    const infoProfessor: ResponseLoginProfessor = JSON.parse(json);
    setProfessor(infoProfessor.professor);
    setMaterias(infoProfessor.materias);
    setAluno(
      infoProfessor.alunos.find((aluno) => aluno.matricula === matricula),
    );
  }, []);

  const {
    data,
    error: errorLoadObs,
    loading: loadingObs,
  } = useGet<{ observacoes: Observacao[] }>(
    `/api/aluno/carregar-observacoes/${matricula}?refresh=${refreshKey}`,
  );
  console.log(data);

  if (loadingObs) return <p>Carregando...</p>;
  if (errorLoadObs) return <p>Erro: {errorLoadObs}</p>;
  if (!data) return null;

  return (
    !!data!.observacoes && (
      <>
        <ProfessorHeader nomeProfessor={professor!.nome} materias={materias} />
        <main>
          <button
            className={styles.btnVoltar}
            onClick={() => navigate("/professor")}
          >
            <i className="bi bi-arrow-left-circle"></i>
            <p>Voltar</p>
          </button>

          <div className={styles.blocoAluno}>
            <div className={styles.iconeUser}>
              <i className="bi bi-person"></i>
            </div>
            <div>
              <h2>{aluno!.nome}</h2>
              <p>Matrícula: {aluno!.matricula}</p>
            </div>
          </div>

          <div className={styles.options}>
            <Link
              to={`/professor/aluno/${matricula}/notas`}
              className={styles.abaNotas}
            >
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
              <span className={styles.contadorObs}>
                {data!.observacoes.length}
              </span>
            </div>
            <button
              className={styles.btnAdicionarObservacao}
              onClick={() => setMostrarBox(!mostrarBox)}
            >
              <i className="bi bi-plus"></i>
              {postLoading ? "Enviando..." : "Adicionar Observação"}
            </button>
          </div>

          {mostrarBox && (
            <BoxNovaObservacao
              onCancelar={() => setMostrarBox(false)}
              onEnviar={handleEnviar}
            />
          )}

          <div className={styles.containerObservacoes}>
            {data!.observacoes.map((obs, i) => (
              <CardObservacao
                key={i}
                texto={obs.mensagem}
                data={obs.data_envio}
              />
            ))}
          </div>

          {mensagemErro && <p>{mensagemErro}</p>}
        </main>
      </>
    )
  );
}
