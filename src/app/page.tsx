import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        {/* Usaremos a imagem gerada dinamicamente */}
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} animate-fade-in`}>
            Bem Vindos à <br />
            <span>Feirinha da Beira Mar</span>
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-in delay-100`}>
            Venha conhecer um pouquinho mais a gente. Navegue e se encante com belezas da nossa Feirinha.
          </p>
          <div className={`${styles.heroActions} animate-fade-in delay-200`}>
            <Link href="/boxes" className={styles.primaryButton}>
              Ver Boxes
              <ArrowRight size={20} />
            </Link>
            <Link href="/historia" className={styles.secondaryButton}>
              Nossa História
            </Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.aboutSection}`}>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutText} animate-fade-in delay-300`}>
            <h2 className="title">Um pouquinho mais sobre nós</h2>
            <p className="subtitle">O Polo Artesanal Feirinha Beira Mar</p>
            
            <p className={styles.paragraph}>
              A Feirinha da Beira Mar atrai e encanta tanto turistas quanto moradores locais retratando a cultura de um povo através de seu artesanato, de comidas típicas e do próprio modo de ser.
            </p>
            <p className={styles.paragraph}>
              Ela teve inicio na década de 80 e após anos de contribuição para o desenvolvimento turístico, geração de empregos e exposição da arte do povo cearense, ela foi tombada como Patrimônio Cultural do Município de Fortaleza.
            </p>
            <p className={styles.paragraph}>
              Em 2022 a nossa Feirinha passou por requalificação e possui hoje 712 boxes distribuídos em mais de 8 mil metros quadrados de área totalmente urbanizada e acessível.
            </p>
            
            <Link href="/historia" className={styles.linkButton}>
              Saber mais <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={`${styles.aboutFeatures} animate-fade-in delay-300`}>
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon}><MapPin size={32} /></div>
              <h3>Localização Privilegiada</h3>
              <p>Avenida Beira Mar, s/n - Meireles, Fortaleza - CE. Próximo ao número 2800.</p>
            </div>
            
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Clock size={32} /></div>
              <h3>Funcionamento</h3>
              <p>Estamos abertos de DOMINGO À DOMINGO.<br/>Das 16h às 22h.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.inviteSection}>
        <div className={`container ${styles.inviteContent}`}>
          <h2>Um passeio de encher os olhos</h2>
          <p>
            Vale dizer que ir à Feirinha da Beira Mar é um passeio extremamente agradável. Espero ver você passeando por aqui, a Ferinha da Beira Mar está ansiosa pela sua visita.
          </p>
          <Link href="/contato" className={styles.primaryButton}>
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}
