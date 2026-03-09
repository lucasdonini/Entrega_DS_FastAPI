import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import livroPng from "../../assets/livro com lampada.png";
import styles from "./Cadastro.module.css";
import { usePost } from "../../utils/request";
import type Aluno from "../../types/Aluno";

export default function Cadastro() {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [username, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const { data, error, loading, post } = usePost<
    Aluno | "Aluno não encontrado"
  >();

  async function handleCadastrar() {
    const url = `/api/completar-cadastro/${matricula}`;
    post(url, { usuario: username, senha: senha });
  }

  useEffect(() => {
    if (!data && !error) return;

    if (error || data == "Aluno não encontrado") {
      setMensagemErro(error ?? data as string);
      return;
    }

    if (!data) {
      console.error(
        "Algo deu errado. A requisição funcionou mas o objeto resposta está vazio",
      );
      setMensagemErro("Erro interno");
      return;
    }

    navigate("/login");
  }, [data, error]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.signIn}>
          <div className={styles.headerForm}>
            <a href="/">
              <i className="bi bi-arrow-left-circle"></i>
            </a>
            <h1>Crie sua conta</h1>
          </div>

          <div>
            <div className={styles.inputGroup}>
              <label htmlFor="matricula">Número de Matrícula</label>
              <input
                type="text"
                id="matricula"
                placeholder="Digite seu número de matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                placeholder="Digite seu email institucional"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <input
                type="text"
                id="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button className={styles.btnCadastrar} onClick={handleCadastrar}>
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </div>

          {mensagemErro && <p>{mensagemErro}</p>}
        </div>

        <div className={styles.imagem}>
          <img src={livroPng} alt="Livro com Lâmpada" />
        </div>
      </div>
    </div>
  );
}
