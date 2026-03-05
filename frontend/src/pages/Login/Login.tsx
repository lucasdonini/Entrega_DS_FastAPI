import { useState } from "react";
import { useNavigate } from "react-router-dom";
import elefante from "../../assets/elefante roxo.png";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(
    /* MENSAGEM_ERRO */ null,
  );

  async function handleLogin() {
    // POST /api/login — substituir pela chamada real
    /* CHAMADA_API_LOGIN */
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.imagem}>
          <img src={elefante} alt="Elefante Roxo" />
        </div>

        <div className={styles.formSide}>
          <div className={styles.headerForm}>
            <a href="/">
              <i className="bi bi-arrow-left-circle"></i>
            </a>
            <h1>Acesse sua conta</h1>
          </div>

          <div>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                placeholder="Digite seu nome de usuário ou e-mail"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <div className={styles.campoSenha}>
                <input
                  type={senhaVisivel ? "text" : "password"}
                  id="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <i
                  className={`bi ${senhaVisivel ? "bi-eye" : "bi-eye-slash"}`}
                  onClick={() => setSenhaVisivel(!senhaVisivel)}
                />
              </div>
            </div>

            <button className={styles.btnEntrar} onClick={handleLogin}>
              Entrar
            </button>
          </div>

          <div className={styles.footerLink}>
            <p>
              Não tem acesso? <a href="/cadastro">Faça seu cadastro aqui.</a>
            </p>
          </div>

          {mensagemErro && (
            <p className={styles.mensagemErro}>{mensagemErro}</p>
          )}
        </div>
      </div>
    </div>
  );
}
