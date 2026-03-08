import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProfessorHeader from "../../components/ProfessorHeader/ProfessorHeader";
import NotaCard from "../../components/NotaCard/NotaCard";
import BoxAdicionarNota from "../../components/BoxAdicionarNota/BoxAdicionarNota";
import styles from "./TelaNotasProfessor.module.css";
import type Professor from "../../types/Professor";
import type Aluno from "../../types/Aluno";
import type Nota from "../../types/Nota";
import { useGet, usePost } from "../../utils/request";
import type ResponseLoginProfessor from "../../types/ResponseLoginProfessor";
import type Disciplina from "../../types/Disciplina";

interface CreateNota {
  n1: number;
  n2: number;
  matricula_aluno: string;
  cod_materia: number;
}

export default function TelaNotas() {
  const navigate = useNavigate();
  const { matricula } = useParams();
  const [mostrarAdicionar, setMostrarAdicionar] = useState(false);
  const [professor, setProfessor] = useState<Professor>();
  const [materias, setMaterias] = useState<Disciplina[]>([]);
  const [aluno, setAluno] = useState<Aluno>();
  const [mensagemErro, setMensagemErro] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: created_nota,
    error: post_error,
    loading: post_loading,
    post,
  } = usePost();

  function handleSalvarNota(dados: {
    n1: number;
    n2: number;
    cod_materia: number;
  }) {
    const nota: CreateNota = { ...dados, matricula_aluno: matricula! };
    post(`/api/lancar-nota/${matricula}`, nota);
    setMostrarAdicionar(false);
  }

  useEffect(() => {
    if (created_nota) setRefreshKey(refreshKey + 1);
  }, [created_nota]);

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
    error: errorLoadNotas,
    loading: loadingNotas,
  } = useGet<{ notas: Nota[] }>(
    `/api/aluno/recuperar-nota/${matricula}?refresh=${refreshKey}`,
  );
  console.log(data);

  if (loadingNotas) return <p>Carregando...</p>;
  if (errorLoadNotas) return <p>Erro: {errorLoadNotas}</p>;
  if (!data) return null;

  return (
    !!data!.notas && (
      <>
        <ProfessorHeader nomeProfessor={professor!.nome} materias={materias} />
        <main>
          <button
            className={styles.btnVoltar}
            onClick={() => navigate("/professor")}
          >
            <i className="bi bi-arrow-left-circle"></i>
            Voltar
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
            <div className={styles.abaNotas}>
              <i className="bi bi-journal"></i>
              <p>Notas</p>
            </div>
            <Link
              to={`/professor/aluno/${matricula}/observacoes`}
              className={styles.abaObservacoes}
            >
              <i className="bi bi-chat-left-dots"></i>
              <p>Observações</p>
            </Link>
          </div>

          <div className={styles.preNotas}>
            <h2>Notas</h2>
            <button
              className={styles.btnAdicionarNota}
              onClick={() => setMostrarAdicionar(!mostrarAdicionar)}
            >
              <i className="bi bi-plus"></i>
              {post_loading ? "Salvando..." : "Adicionar Nota"}
            </button>
          </div>

          {mostrarAdicionar && (
            <BoxAdicionarNota
              matriculaAluno={aluno!.matricula}
              usuarioProfessor={professor!.usuario}
              disciplinas={materias}
              onCancelar={() => setMostrarAdicionar(false)}
              onSalvar={handleSalvarNota}
            />
          )}

          <div className={styles.notasContainer}>
            {data!.notas.map((nota, i) => (
              <NotaCard
                key={i}
                index={i + 1}
                disciplina={nota.materia}
                n1={nota.n1}
                n2={nota.n2}
                media={(nota.n1 + nota.n2) / 2}
              />
            ))}
          </div>

          {mensagemErro && <p>{mensagemErro}</p>}
        </main>
      </>
    )
  );
}
