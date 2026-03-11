import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../utils/request";
import elefante from "../../assets/img/elefante roxo.png";
import styles from "./Login.module.css";
import type ResponseLoginAluno from "../../types/ResponseLoginAluno";

type ResponseLogin = { sucesso: boolean } | ResponseLoginAluno;

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const { data, error, loading, post } = usePost<ResponseLogin>();

  function isAluno(data: ResponseLogin): data is ResponseLoginAluno {
    return !("sucesso" in data)
  } 

  useEffect(() => sessionStorage.clear(), []);

  useEffect(() => {
    if (!data && !error) return;
    
    if (error) {
      setMensagemErro(error);
      return;
    }
    
    if (!data) {
      console.error(
        "Algo deu errado. A requisição funcionou mas o objeto resposta está vazio",
      );
      setMensagemErro("Erro interno");
      return;
    }
    
    console.log(`resposta do post é aluno: ${isAluno(data!)}`)
    if (!isAluno(data)) {
      console.log(`professor fez login: ${data.sucesso}`)
      sessionStorage.setItem('usuario-professor', usuario)
      navigate("/professor");
    } else {
      sessionStorage.setItem("info_aluno", JSON.stringify(data));
      navigate(`/aluno/notas`);
    }
  }, [data, error]);

  const handleLogin = async () => {
    console.log(`é professor: ${!usuario.match(/.*@.*/)}`)
    const url = !usuario.match(/.*@.*/)
      ? "/api/login-professor"
      : "/api/login-aluno";
    console.log(`url alvo: ${url}`)
    post(url, { usuario: usuario, senha: senha });
  };

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
              {loading ? "Carregando..." : "Entrar"}
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
