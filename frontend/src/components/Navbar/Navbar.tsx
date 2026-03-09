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
          <a href="#" className={styles.menuItem}>Início</a>
          <a href="#ensinos" className={styles.menuItem}>Ensinos</a>
          <a href="#escola" className={styles.menuItem}>Escola</a>
          <a href="#sobre-nos" className={styles.menuItem}>Sobre Nós</a>
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
