import Image from "next/image";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import Instagram from "@/components/Icons/Instagram";
import styles from "./page.module.css";
import { supabase, Box } from "@/lib/supabase";

// Forçando a revalidação da página para sempre buscar os boxes mais recentes (opcional, pode ser estático também)
export const revalidate = 60;

export default async function Boxes() {
  const { data: boxes } = await supabase
    .from('boxes')
    .select('*')
    .eq('ativo', true)
    .order('numero', { ascending: true });

  const boxesList: Box[] = boxes || [];

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <h1 className="title animate-fade-in">Nossos Boxes</h1>
          <p className="subtitle animate-fade-in delay-100">
            Confira alguns entre os milhares de artesanatos presentes na nossa Feirinha.
          </p>
          
          <div className={`${styles.searchContainer} animate-fade-in delay-200`}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input type="text" placeholder="Buscar por box, categoria ou nome..." className={styles.searchInput} />
            </div>
            <div className={styles.filters}>
              <button className={`${styles.filterBtn} ${styles.active}`}>Todos</button>
              <button className={styles.filterBtn}>Roupas</button>
              <button className={styles.filterBtn}>Acessórios</button>
              <button className={styles.filterBtn}>Couro</button>
              <button className={styles.filterBtn}>Decoração</button>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.boxesGrid} animate-fade-in delay-300`}>
        {boxesList.length > 0 ? (
          boxesList.map((box) => (
            <div key={box.id} className={`glass-panel ${styles.boxCard}`}>
              <div className={styles.boxImageContainer}>
                <img src={box.imagem_url || '/placeholder.png'} alt={box.nome} className={styles.boxImage} />
                <span className={styles.categoryBadge}>{box.categoria}</span>
              </div>
              
              <div className={styles.boxContent}>
                <div className={styles.boxHeader}>
                  <span className={styles.boxNumber}>{box.numero}</span>
                  <h3 className={styles.boxName}>{box.nome}</h3>
                </div>
                
                <p className={styles.boxDescription}>{box.descricao}</p>
                
                <div className={styles.boxFooter}>
                  {box.instagram && (
                    <a href={`https://instagram.com/${box.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className={styles.socialLink}>
                      <Instagram size={18} /> {box.instagram}
                    </a>
                  )}
                  
                  <Link href={`/boxes/${box.id}`} className={styles.detailsBtn}>
                    Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            Nenhum box encontrado no momento.
          </div>
        )}
      </section>
    </div>
  );
}
