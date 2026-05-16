import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // ISR - revalida a cada 60s

export default async function Home() {
  const { data: settingsData } = await supabase.from('site_settings').select('*');
  const settings: Record<string, string> = {};
  
  if (settingsData) {
    settingsData.forEach(item => {
      settings[item.key] = item.value;
    });
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        {/* Imagem do hero fica no CSS */}
        <div className={styles.heroContent}>
          <h1 
            className={`${styles.heroTitle} animate-fade-in`} 
            dangerouslySetInnerHTML={{ __html: settings.hero_title || 'Bem Vindos à <br/><span>Feirinha da Beira Mar</span>' }}
          />
          <p className={`${styles.heroSubtitle} animate-fade-in delay-100`}>
            {settings.hero_subtitle || 'Venha conhecer um pouquinho mais a gente. Navegue e se encante com belezas da nossa Feirinha.'}
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
            <h2 className="title">{settings.about_title || 'Um pouquinho mais sobre nós'}</h2>
            <p className="subtitle">{settings.about_subtitle || 'O Polo Artesanal Feirinha Beira Mar'}</p>
            
            <p className={styles.paragraph}>{settings.about_text_1}</p>
            <p className={styles.paragraph}>{settings.about_text_2}</p>
            <p className={styles.paragraph}>{settings.about_text_3}</p>
            
            <Link href="/historia" className={styles.linkButton}>
              Saber mais <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={`${styles.aboutFeatures} animate-fade-in delay-300`}>
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon}><MapPin size={32} /></div>
              <h3>Localização Privilegiada</h3>
              <p>{settings.contact_address}</p>
            </div>
            
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Clock size={32} /></div>
              <h3>Funcionamento</h3>
              <p>{settings.contact_hours}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.inviteSection}>
        <div className={`container ${styles.inviteContent}`}>
          <h2>{settings.invite_title}</h2>
          <p>{settings.invite_text}</p>
          <Link href="/contato" className={styles.primaryButton}>
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}
