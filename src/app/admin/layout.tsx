"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, Clock, MessageSquare, LogOut } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Se for a página de login, não mostra o layout com sidebar
  if (pathname === "/admin/login") {
    return <AdminGuard>{children}</AdminGuard>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AdminGuard>
      <div className={styles.adminContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Admin <span>Feirinha</span></h2>
          </div>
          
          <nav className={styles.sidebarNav}>
            <Link href="/admin" className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="/admin/boxes" className={`${styles.navItem} ${pathname.includes('/admin/boxes') ? styles.active : ''}`}>
              <Package size={20} /> Gerenciar Boxes
            </Link>
            <Link href="/admin/conteudo" className={`${styles.navItem} ${pathname.includes('/admin/conteudo') ? styles.active : ''}`}>
              <FileText size={20} /> Textos do Site
            </Link>
            <Link href="/admin/historia" className={`${styles.navItem} ${pathname.includes('/admin/historia') ? styles.active : ''}`}>
              <Clock size={20} /> Linha do Tempo
            </Link>
            <Link href="/admin/mensagens" className={`${styles.navItem} ${pathname.includes('/admin/mensagens') ? styles.active : ''}`}>
              <MessageSquare size={20} /> Mensagens
            </Link>
          </nav>
          
          <div className={styles.sidebarFooter}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={20} /> Sair
            </button>
            <Link href="/" className={styles.backToSite}>
              Voltar ao site
            </Link>
          </div>
        </aside>
        
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
