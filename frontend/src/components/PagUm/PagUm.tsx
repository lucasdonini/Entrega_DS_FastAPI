import capa from '../../assets/img/main garota.png'
import botaoComece from '../../assets/img/botão comece.png'
import styles from './PagUm.module.css'

export default function PagUm() {
  return (
    <div>
      <img src={capa} alt="Garota na escola" className={styles.capa} />

      <p className={styles.tituloCapa}>
        Formando <span>grandes mentes</span><br /> desde os <span>primeiros passos</span>.
      </p>

      <p className={styles.legendaCapa}>
        No Colégio Mémora, acompanhamos nossos alunos da infância ao ensino médio
        <br /> com uma educação sólida, acolhedora e pensada para cada fase, formando alunos confiantes e preparados para o futuro.
      </p>

      <button className={styles.botaoLp}>
        <img src={botaoComece} alt="Clique aqui" />
      </button>
    </div>
  )
}