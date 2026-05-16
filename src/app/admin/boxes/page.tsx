"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from "lucide-react";
import { supabase, Box } from "@/lib/supabase";

export default function BoxesAdmin() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Box>>({
    numero: "", nome: "", descricao: "", categoria: "", imagem_url: "", instagram: "", telefone: "", ativo: true
  });

  useEffect(() => {
    fetchBoxes();
  }, []);

  async function fetchBoxes() {
    const { data, error } = await supabase
      .from("boxes")
      .select("*")
      .order("numero", { ascending: true });

    if (!error && data) {
      setBoxes(data);
    }
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing === "new") {
      const { error } = await supabase.from("boxes").insert([formData]);
      if (!error) {
        fetchBoxes();
        resetForm();
      } else {
        alert("Erro ao criar box: " + error.message);
      }
    } else if (isEditing) {
      const { error } = await supabase.from("boxes").update(formData).eq("id", isEditing);
      if (!error) {
        fetchBoxes();
        resetForm();
      } else {
        alert("Erro ao atualizar box: " + error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este Box? Isso não pode ser desfeito.")) {
      const { error } = await supabase.from("boxes").delete().eq("id", id);
      if (!error) {
        setBoxes(boxes.filter((b) => b.id !== id));
      } else {
        alert("Erro ao apagar: " + error.message);
      }
    }
  };

  const startEdit = (box: Box) => {
    setIsEditing(box.id);
    setFormData(box);
  };

  const startNew = () => {
    setIsEditing("new");
    setFormData({
      numero: "BOX ", nome: "", descricao: "", categoria: "", imagem_url: "", instagram: "", telefone: "", ativo: true
    });
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({});
  };

  if (loading) return <div>Carregando boxes...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Gerenciar Boxes</h1>
        {!isEditing && (
          <button 
            onClick={startNew}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={18} /> Novo Box
          </button>
        )}
      </div>

      {isEditing && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            {isEditing === "new" ? "Adicionar Novo Box" : "Editar Box"}
          </h2>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Número (Ex: BOX 103)</label>
                <input type="text" value={formData.numero || ''} onChange={(e) => setFormData({...formData, numero: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Nome do Box</label>
                <input type="text" value={formData.nome || ''} onChange={(e) => setFormData({...formData, nome: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Categoria</label>
                <input type="text" value={formData.categoria || ''} onChange={(e) => setFormData({...formData, categoria: e.target.value})} placeholder="Ex: Roupas, Acessórios..." required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Instagram</label>
                <input type="text" value={formData.instagram || ''} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="@perfil" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Telefone / WhatsApp</label>
                <input type="text" value={formData.telefone || ''} onChange={(e) => setFormData({...formData, telefone: e.target.value})} placeholder="(85) 90000-0000" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Descrição Curta</label>
              <textarea rows={2} value={formData.descricao || ''} onChange={(e) => setFormData({...formData, descricao: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>URL da Imagem</label>
              <input type="url" value={formData.imagem_url || ''} onChange={(e) => setFormData({...formData, imagem_url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <input type="checkbox" id="ativo" checked={formData.ativo} onChange={(e) => setFormData({...formData, ativo: e.target.checked})} style={{ width: '18px', height: '18px' }} />
              <label htmlFor="ativo" style={{ fontWeight: 500, color: '#334155', cursor: 'pointer' }}>Box está ativo e visível no site</label>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <button type="button" onClick={resetForm} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', color: '#475569', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <X size={18} /> Cancelar
              </button>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <Save size={18} /> Salvar Box
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {boxes.length === 0 ? (
          <div style={{ background: 'white', padding: '32px', textAlign: 'center', borderRadius: '12px', color: '#64748b', gridColumn: '1 / -1' }}>
            Nenhum box cadastrado.
          </div>
        ) : (
          boxes.map((box) => (
            <div key={box.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '150px', background: '#e2e8f0', position: 'relative' }}>
                {box.imagem_url ? (
                  <img src={box.imagem_url} alt={box.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <ImageIcon size={40} />
                  </div>
                )}
                {!box.ativo && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                    INATIVO
                  </div>
                )}
              </div>
              
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{box.numero}</span>
                  <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: '16px', color: '#64748b' }}>{box.categoria}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', color: '#0f172a' }}>{box.nome}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 16px 0', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{box.descricao}</p>
                
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <button onClick={() => startEdit(box)} style={{ flex: 1, background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 500 }}>
                    <Edit2 size={16} /> Editar
                  </button>
                  <button onClick={() => handleDelete(box.id)} style={{ flex: 1, background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 500 }}>
                    <Trash2 size={16} /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
