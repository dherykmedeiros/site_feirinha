import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './Footer.module.css';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  
  const { data: settingsData } = await supabase.from('site_settings').select('*');
  const settings: Record<string, string> = {};
  
  if (settingsData) {
    settingsData.forEach(item => {
      settings[item.key] = item.value;
    });
  }
  
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h3>Feirinha da <span>Beira Mar</span></h3>
            <p className={styles.description}>
              Retratando a cultura de um povo através de seu artesanato e modo de ser.
            </p>
          </div>
          
          <div className={styles.links}>
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/boxes">Boxes</Link></li>
              <li><Link href="/historia">História</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </div>
          
          <div className={styles.contact}>
            <h4>Visite-nos</h4>
            <p>{settings.contact_address}</p>
            <p className={styles.hours}>{settings.contact_hours}</p>
            <p className={styles.phone}>{settings.contact_phone}</p>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p>© 2017 - {currentYear} por Artes Moda Produções. Criado carinhosamente.</p>
          <Link href="/politicas-de-privacidade" className={styles.privacy}>
            Políticas de Privacidade e Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
