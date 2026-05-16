"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type HistoriaItem = {
  id: string;
  ano: string;
  titulo: string;
  descricao: string;
  ordem: number;
};

export default function HistoriaAdmin() {
  const [items, setItems] = useState<HistoriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<HistoriaItem>>({
    ano: "", titulo: "", descricao: "", ordem: 0
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from("historia")
      .select("*")
      .order("ordem", { ascending: true });

    if (!error && data) {
      setItems(data);
      // Sugere a próxima ordem para o form de novo item
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, ordem: data[data.length - 1].ordem + 1 }));
      } else {
        setFormData(prev => ({ ...prev, ordem: 1 }));
      }
    }
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing === "new") {
      const { error } = await supabase.from("historia").insert([formData]);
      if (!error) {
        fetchItems();
        resetForm();
      } else {
        alert("Erro ao criar item: " + error.message);
      }
    } else if (isEditing) {
      const { error } = await supabase.from("historia").update(formData).eq("id", isEditing);
      if (!error) {
        fetchItems();
        resetForm();
      } else {
        alert("Erro ao atualizar item: " + error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este marco histórico?")) {
      const { error } = await supabase.from("historia").delete().eq("id", id);
      if (!error) {
        setItems(items.filter((i) => i.id !== id));
      } else {
        alert("Erro ao apagar: " + error.message);
      }
    }
  };

  const startEdit = (item: HistoriaItem) => {
    setIsEditing(item.id);
    setFormData(item);
  };

  const startNew = () => {
    setIsEditing("new");
    setFormData({
      ano: "", titulo: "", descricao: "", 
      ordem: items.length > 0 ? items[items.length - 1].ordem + 1 : 1
    });
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({ ano: "", titulo: "", descricao: "", ordem: 0 });
  };

  if (loading) return <div>Carregando linha do tempo...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Linha do Tempo (História)</h1>
        {!isEditing && (
          <button 
            onClick={startNew}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={18} /> Novo Marco
          </button>
        )}
      </div>

      {isEditing && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            {isEditing === "new" ? "Adicionar Novo Marco" : "Editar Marco"}
          </h2>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Ano</label>
                <input type="text" value={formData.ano || ''} onChange={(e) => setFormData({...formData, ano: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Título</label>
                <input type="text" value={formData.titulo || ''} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Ordem</label>
                <input type="number" value={formData.ordem || 0} onChange={(e) => setFormData({...formData, ordem: parseInt(e.target.value)})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Descrição</label>
              <textarea rows={4} value={formData.descricao || ''} onChange={(e) => setFormData({...formData, descricao: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={resetForm} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', color: '#475569', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <X size={18} /> Cancelar
              </button>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <Save size={18} /> Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.length === 0 ? (
          <div style={{ background: 'white', padding: '32px', textAlign: 'center', borderRadius: '12px', color: '#64748b' }}>
            Nenhum item na história ainda.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Ordem: {item.ordem}</div>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)', fontWeight: 800 }}>{item.ano}</div>
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 8px 0' }}>{item.titulo}</h3>
                <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>{item.descricao}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => startEdit(item)} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Editar">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Excluir">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
