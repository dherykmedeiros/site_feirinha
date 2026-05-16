import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

export const revalidate = 60; // ISR

export default async function Historia() {
  const { data: timelineData } = await supabase
    .from("historia")
    .select("*")
    .order("ordem", { ascending: true });

  const timelineItems = timelineData || [];

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <h1 className="title animate-fade-in">A Nossa História</h1>
          <p className="subtitle animate-fade-in delay-100">
            A evolução da Feirinha da Beira Mar ao longo de quase cinco décadas, 
            do calçadão à nossa grandiosa estrutura atual.
          </p>
        </div>
      </section>

      <section className={`container ${styles.timelineSection}`}>
        <div className={styles.timeline}>
          {timelineItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right} animate-fade-in`}
            >
              <div className={styles.timelineDot}></div>
              <div className={`glass-panel ${styles.timelineContent}`}>
                <div className={styles.timelineYear}>{item.ano}</div>
                <h3 className={styles.timelineTitle}>{item.titulo}</h3>
                <p className={styles.timelineDesc}>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
