import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
            <p>Avenida Beira Mar, s/n - Meireles</p>
            <p>Fortaleza - CE, Próximo ao nº 2800</p>
            <p className={styles.hours}>Domingo à Domingo das 16h às 22h</p>
            <p className={styles.phone}>(85) 98769-8445</p>
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
