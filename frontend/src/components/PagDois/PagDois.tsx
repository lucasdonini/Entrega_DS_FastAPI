import escola1 from '../../assets/img/escola 1.png'
import escola2 from '../../assets/img/escola 2.png'
import escola3 from '../../assets/img/escola 3.png'
import escola4 from '../../assets/img/escola 4.png'
import styles from './PagDois.module.css'

const carrosselItems = [
  { src: escola1, alt: 'Jardim de Infância',     label: 'Jardim de Infância' },
  { src: escola2, alt: 'Pré-escola',             label: 'Pré-Escola' },
  { src: escola3, alt: 'Ensino Fundamental',     label: 'Ensino Fundamental I e II' },
  { src: escola4, alt: 'Ensino Médio',           label: 'Ensino Médio' },
]

export default function PagDois() {
  return (
    <div id="escola">
      <div className={styles.intro}>
        <p className={styles.titulo2}>
          Aprender, crescer e <br />se fortalecer
        </p>
        <p className={styles.legenda2}>
          Do Jardim de Infância ao Ensino Médio, oferecemos uma formação
          <br />completa que acompanha cada fase do aprendizado e prepara nossos <br />
          alunos para escolhas seguras e uma carreira bem-sucedida.
        </p>
      </div>

      <div className={styles.carrossel} id="ensinos">
        {carrosselItems.map((item) => (
          <div key={item.label}>
            <img src={item.src} alt={item.alt} className={styles.carrosselImg} />
            <p className={styles.carrosselLegenda}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}