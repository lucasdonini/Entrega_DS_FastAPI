import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import livroPng from '../../assets/livro com lampada.png'
import styles from './Cadastro.module.css'

export default function Cadastro() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleCadastrar() {
    /* CHAMADA_API_CADASTRO */
    navigate('/login')
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.signIn}>
          <div className={styles.headerForm}>
            <a href="/login">
              <i className="bi bi-arrow-left-circle"></i>
            </a>
            <h1>Crie sua conta</h1>
          </div>

          <div>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Nome Completo</label>
              <input
                type="text"
                id="username"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

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
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button className={styles.btnCadastrar} onClick={handleCadastrar}>
              Cadastrar
            </button>
          </div>
        </div>

        <div className={styles.imagem}>
          <img src={livroPng} alt="Livro com Lâmpada" />
        </div>
      </div>
    </div>
  )
}