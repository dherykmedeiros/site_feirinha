import styles from "./page.module.css";
import { Clock } from "lucide-react";

const timelineData = [
  {
    year: "1978",
    title: "O Início na Calçada",
    description: "Algumas pessoas decidiram expor seus produtos em frente ao hotel Othon Palace com o intuito de vendê-los aos turistas. Ocorreu o movimento das praças, e um tempo depois houve a transição para o calçadão."
  },
  {
    year: "1988",
    title: "A Regulamentação",
    description: "Aprovado o decreto que regulamentava o funcionamento das feiras de artesanato, considerando que tais feiras já integravam os eventos turísticos de Fortaleza."
  },
  {
    year: "1990",
    title: "Criação da ASFABEM",
    description: "Visando uma melhor organização, foi criada a Associação dos Feirantes de Artesanato da Beira Mar (ASFABEM) para atuar junto aos órgãos governamentais."
  },
  {
    year: "1995",
    title: "Patrimônio Cultural",
    description: "Sancionada a lei nº 062/95 pelo Prefeito Antônio Cambraia, que a tombou como Patrimônio Cultural do Município. O chão que era de areia e brita, foi pavimentado com pedras e iluminado."
  },
  {
    year: "2006",
    title: "Reordenamento",
    description: "A Feira passou por um novo reordenamento e layout. Feito um acordo com Prefeitura e com o Ministério Público Federal para manter os carrinhos no calçadão após o horário de comercialização."
  },
  {
    year: "2012",
    title: "Nova Estrutura",
    description: "Passa a funcionar em sua nova estrutura após requalificação. Pela primeira vez, os comerciantes tiveram infraestrutura adequada."
  },
  {
    year: "2022",
    title: "A Requalificação",
    description: "Em 2022 a nossa Feirinha passou por requalificação e possui hoje 712 boxes distribuídos em mais de 8 mil metros quadrados de área totalmente urbanizada e acessível."
  }
];

export default function Historia() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <h1 className="title animate-fade-in">Nossa História</h1>
          <p className="subtitle animate-fade-in delay-100">
            Acompanhe a trajetória da Feirinha da Beira Mar, desde os anos 70 até se tornar Patrimônio Cultural de Fortaleza.
          </p>
        </div>
      </section>

      <section className={`container ${styles.timelineSection}`}>
        <div className={styles.timeline}>
          {timelineData.map((item, index) => (
            <div key={item.year} className={`${styles.timelineItem} animate-fade-in delay-${(index % 3 + 1) * 100}`}>
              <div className={styles.timelineDot}>
                <Clock size={20} />
              </div>
              <div className={`glass-panel ${styles.timelineContent}`}>
                <div className={styles.timelineYear}>{item.year}</div>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
