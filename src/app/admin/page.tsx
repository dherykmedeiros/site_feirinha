"use client";

import { useEffect, useState } from "react";
import { Package, MessageSquare, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({ boxes: 0, mensagens: 0, historia: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [{ count: boxes }, { count: mensagens }, { count: historia }] = await Promise.all([
        supabase.from('boxes').select('*', { count: 'exact', head: true }),
        supabase.from('contatos').select('*', { count: 'exact', head: true }),
        supabase.from('historia').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        boxes: boxes || 0,
        mensagens: mensagens || 0,
        historia: historia || 0
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div>Carregando dashboard...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '24px', color: '#0f172a' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '16px', borderRadius: '12px' }}>
            <Package size={32} />
          </div>
          <div>
            <h3 style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Boxes Cadastrados</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{stats.boxes}</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#fce7f3', color: '#ec4899', padding: '16px', borderRadius: '12px' }}>
            <MessageSquare size={32} />
          </div>
          <div>
            <h3 style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Mensagens Recebidas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{stats.mensagens}</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#fef3c7', color: '#d97706', padding: '16px', borderRadius: '12px' }}>
            <Clock size={32} />
          </div>
          <div>
            <h3 style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Itens na História</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{stats.historia}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
