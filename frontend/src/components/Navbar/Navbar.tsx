import logo from "../../assets/img/logo definitiva.png";
import botaoEntrar from "../../assets/img/botão entrar.png";
import botaoCadastro from "../../assets/img/botão cadastro.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <img id={styles.logo} src={logo} alt="logo" />

        <div className={styles.menu}>
          <p className={styles.menuItem}>Início</p>
          <p className={styles.menuItem}>Ensinos</p>
          <p className={styles.menuItem}>Escola</p>
          <p className={styles.menuItem}>Sobre Nós</p>
        </div>

        <div className={styles.acoes}>
          <a href="/login">
            <img
              className={`${styles.botao} ${styles.botaoEntrar}`}
              src={botaoEntrar}
              alt="Botão Entrar"
            />
          </a>
          <a href="/cadastro">
            <img
              className={styles.botao}
              src={botaoCadastro}
              alt="Botão Cadastro"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
