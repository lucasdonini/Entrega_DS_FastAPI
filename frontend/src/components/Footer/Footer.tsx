import logoFooter from '../../assets/img/logo definitiva.png'
import iconEmail from '../../assets/img/icon email.png'
import iconLoc from '../../assets/img/icon loc.png'
import styles from './Footer.module.css'

const coluna2 = ['Sobre Nós', 'Proposta Pedagógica', 'Ensinos Oferecidos', 'Equipe Pedagógica']
const coluna3 = ['Certificações', 'Parcerias']

export default function Footer() {
  return (
    <footer className={styles.footer} id="sobre-nos">

      <div className={styles.coluna1}>
        <img src={logoFooter} alt="Logo" className={styles.logof} />
        <p className={styles.textoF}>
          Conhecimento que acompanha toda a jornada,
          <br />do primeiro aprendizado às grandes conquistas.
        </p>
        <div>
          <div className={styles.email}>
            <img src={iconEmail} alt="Icon do E-mail" style={{ width: '24px', height: '16px', backgroundColor: 'transparent' }} />
            <p className={styles.textoF} style={{ marginTop: 0 }}>colegiomemora.contato@gmail.com</p>
          </div>
          <div className={styles.loc}>
            <img src={iconLoc} alt="Icon de Pin" style={{ width: '17px', height: '28px', backgroundColor: 'transparent' }} />
            <p className={styles.textoF} style={{ marginTop: 0 }}>São Paulo, SP - Brasil</p>
          </div>
        </div>
      </div>

      <div className={styles.colunas}>
        {coluna2.map((item) => (
          <p key={item} className={styles.textoF2}>{item}</p>
        ))}
      </div>

      <div className={styles.colunas}>
        {coluna3.map((item) => (
          <p key={item} className={styles.textoF2}>{item}</p>
        ))}
        <p className={styles.trabalheConosco}>Trabalhe Conosco</p>
      </div>

    </footer>
  )
}