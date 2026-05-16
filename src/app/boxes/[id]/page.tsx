import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Instagram, CheckCircle2 } from "lucide-react";
import { supabase, Box } from "@/lib/supabase";
import styles from "./page.module.css";
import InstagramIcon from "@/components/Icons/Instagram";

export const revalidate = 60;

export default async function BoxDetails({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object
  const resolvedParams = await params;
  
  const { data: box, error } = await supabase
    .from("boxes")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !box) {
    notFound();
  }

  const boxData = box as Box;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/boxes" className={styles.backButton}>
          <ArrowLeft size={20} /> Voltar para os boxes
        </Link>

        <div className={`glass-panel ${styles.detailsCard} animate-fade-in`}>
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <img 
                src={boxData.imagem_url || '/placeholder.png'} 
                alt={boxData.nome} 
                className={styles.mainImage}
              />
              <div className={styles.categoryBadge}>{boxData.categoria}</div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.header}>
              <span className={styles.boxNumber}>{boxData.numero}</span>
              <h1 className={styles.boxName}>{boxData.nome}</h1>
              {boxData.ativo && (
                <span className={styles.statusBadge}>
                  <CheckCircle2 size={16} /> Box Ativo
                </span>
              )}
            </div>

            <div className={styles.descriptionBlock}>
              <h3>Sobre o Box</h3>
              <p className={styles.description}>{boxData.descricao}</p>
            </div>

            <div className={styles.contactBlock}>
              <h3>Contato e Redes</h3>
              
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <div className={styles.iconBox}><MapPin size={20} /></div>
                  <div>
                    <span className={styles.contactLabel}>Localização</span>
                    <span className={styles.contactValue}>Avenida Beira Mar, s/n - Fortaleza/CE</span>
                  </div>
                </li>
                
                {boxData.telefone && (
                  <li className={styles.contactItem}>
                    <div className={styles.iconBox}><Phone size={20} /></div>
                    <div>
                      <span className={styles.contactLabel}>Telefone / WhatsApp</span>
                      <span className={styles.contactValue}>{boxData.telefone}</span>
                    </div>
                  </li>
                )}

                {boxData.instagram && (
                  <li className={styles.contactItem}>
                    <div className={styles.iconBox}><InstagramIcon size={20} /></div>
                    <div>
                      <span className={styles.contactLabel}>Instagram</span>
                      <a 
                        href={`https://instagram.com/${boxData.instagram.replace('@','')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`${styles.contactValue} ${styles.link}`}
                      >
                        {boxData.instagram}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
