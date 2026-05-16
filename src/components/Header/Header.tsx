import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          Feirinha da <span>Beira Mar</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>Início</Link>
            </li>
            <li>
              <Link href="/boxes" className={styles.navLink}>Boxes</Link>
            </li>
            <li>
              <Link href="/historia" className={styles.navLink}>História</Link>
            </li>
            <li>
              <Link href="/contato" className={styles.navLink}>Contato</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
