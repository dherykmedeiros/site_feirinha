"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import Instagram from "@/components/Icons/Instagram";
import styles from "./page.module.css";
// import { supabase } from "@/lib/supabase"; // será usado quando o BD estiver pronto

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulação de envio para o Supabase
    setTimeout(() => {
      setStatus("success");
      setFormData({ nome: "", email: "", mensagem: "" });
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <h1 className="title animate-fade-in">Fale Conosco</h1>
          <p className="subtitle animate-fade-in delay-100">
            Tem alguma dúvida ou sugestão? Entre em contato conosco.
          </p>
        </div>
      </section>

      <section className={`container ${styles.contactSection}`}>
        <div className={styles.contactGrid}>
          
          <div className={`${styles.contactInfo} animate-fade-in delay-200`}>
            <h2>Vamos conversar</h2>
            <p className={styles.infoDesc}>
              A Feirinha da Beira Mar está sempre aberta para ouvir você. Utilize nossos canais de atendimento ou preencha o formulário ao lado.
            </p>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h4>Telefone / WhatsApp</h4>
                  <p>(85) 98769-8445</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><Mail size={24} /></div>
                <div>
                  <h4>E-mail</h4>
                  <p>artesmoda.producoes@gmail.com</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h4>Endereço</h4>
                  <p>Avenida Beira Mar, s/n<br/>Meireles, Fortaleza - CE</p>
                </div>
              </div>
            </div>
            
            <div className={styles.socialBox}>
              <h4>Nossas Redes Sociais</h4>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={24} /></a>
              </div>
            </div>
          </div>

          <div className={`${styles.contactFormContainer} animate-fade-in delay-300`}>
            <form className={`glass-panel ${styles.contactForm}`} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Envie uma mensagem</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required 
                  placeholder="Seu nome"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="mensagem">Sua mensagem</label>
                <textarea 
                  id="mensagem" 
                  rows={5} 
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  required 
                  placeholder="Como podemos te ajudar?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando..." : (
                  <>Enviar Mensagem <Send size={18} /></>
                )}
              </button>
              
              {status === "success" && (
                <div className={styles.successMessage}>
                  Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
