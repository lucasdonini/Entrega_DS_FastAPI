import { useNavigate } from "react-router-dom";
import ProfessorHeader from "../../components/ProfessorHeader/ProfessorHeader";
import InsightCard from "../../components/InsightCard/InsightCard";
import TabelaAlunos from "../../components/TabelaAlunos/TabelaAlunos";
import styles from "./ProfessorHome.module.css";
import type ResponseLoginProfessor from "../../types/ResponseLoginProfessor";
import { useEffect, useState } from "react";
import type Professor from "../../types/Professor";
import type Aluno from "../../types/Aluno";

const iconeAlunos = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none" />
    <line
      x1="32"
      y1="64"
      x2="32"
      y2="144"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M56,216c15.7-24.08,41.11-40,72-40s56.3,15.92,72,40"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polygon
      points="224 64 128 96 32 64 128 32 224 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M169.34,82.22a56,56,0,1,1-82.68,0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);

const iconeNotas = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none" />
    <path
      d="M32,216V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V216l-32-16-32,16-32-16L96,216,64,200Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="64 160 96 96 128 160"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="72"
      y1="144"
      x2="120"
      y2="144"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="144"
      y1="128"
      x2="192"
      y2="128"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="168"
      y1="104"
      x2="168"
      y2="152"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);

const iconeMedia = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none" />
    <polyline
      points="224 208 32 208 32 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="200 72 128 144 96 112 32 176"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="200 112 200 72 160 72"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);

export default function ProfessorHome() {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [media, setMedia] = useState(0);
  const [qnt_notas, setQntNotas] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const json = sessionStorage.getItem("info_professor");
    if (!json) {
      navigate("/login");
      return;
    }

    const innerInfo: ResponseLoginProfessor = JSON.parse(json);
    setProfessor(innerInfo.professor);
    setAlunos(innerInfo.alunos);
    setMedia(innerInfo.media_alunos);
    setQntNotas(innerInfo.qnt_notas);
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <>
        <ProfessorHeader nomeProfessor={professor!.nome} materias={""} />
        <main>
          <a href="/" className={styles.btnVoltar}>
            <i className="bi bi-arrow-left-circle"></i>
            <p>Voltar</p>
          </a>

          <div className={styles.welcomeMessage}>
            <h1>Bem-vindo, {professor!.nome}!</h1>
            <h3>Gerencie suas turmas</h3>
          </div>

          <div className={styles.insightsContainer}>
            <InsightCard
              icone={iconeAlunos}
              valor={alunos.length}
              label="Total de alunos"
            />
            <InsightCard
              icone={iconeNotas}
              valor={qnt_notas}
              label="Notas lançadas"
            />
            <InsightCard
              icone={iconeMedia}
              valor={media}
              label="Média geral dos alunos"
            />
          </div>

          <TabelaAlunos
            alunos={alunos}
            onAlunoClick={(matricula) =>
              navigate(`/professor/aluno/${matricula}/notas`)
            }
          />
        </main>
      </>
    )
  );
}
