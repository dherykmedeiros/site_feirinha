"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Mensagem = {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  created_at: string;
};

export default function MensagensAdmin() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMensagens();
  }, []);

  async function fetchMensagens() {
    const { data, error } = await supabase
      .from("contatos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMensagens(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja apagar esta mensagem?")) {
      const { error } = await supabase.from("contatos").delete().eq("id", id);
      if (!error) {
        setMensagens(mensagens.filter((m) => m.id !== id));
      } else {
        alert("Erro ao apagar mensagem.");
      }
    }
  }

  if (loading) return <div>Carregando mensagens...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Mensagens de Contato</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mensagens.length === 0 ? (
          <div style={{ background: 'white', padding: '32px', textAlign: 'center', borderRadius: '12px', color: '#64748b' }}>
            Nenhuma mensagem recebida ainda.
          </div>
        ) : (
          mensagens.map((msg) => (
            <div key={msg.id} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 4px 0' }}>{msg.nome}</h3>
                  <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {msg.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(msg.created_at).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Apagar mensagem"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div style={{ color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {msg.mensagem}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
