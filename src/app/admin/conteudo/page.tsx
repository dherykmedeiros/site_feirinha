"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

type SiteSettings = {
  [key: string]: string;
};

export default function ConteudoAdmin() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data, error } = await supabase.from("site_settings").select("*");
    if (!error && data) {
      const formattedSettings: SiteSettings = {};
      data.forEach((item) => {
        formattedSettings[item.key] = item.value;
      });
      setSettings(formattedSettings);
    }
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const updates = Object.keys(settings).map((key) => ({
        key,
        value: settings[key],
      }));

      // Supabase Upsert for all keys
      const { error } = await supabase.from("site_settings").upsert(updates);

      if (error) throw error;
      setMessage({ text: "Conteúdo salvo com sucesso!", type: "success" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Erro ao salvar as configurações.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Carregando formulário...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Textos do Site</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          <Save size={18} /> {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>

      {message && (
        <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px', backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#166534' : '#ef4444' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'grid', gap: '32px' }}>
        {/* Seção Home - Hero */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Página Inicial - Banner Principal</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Título Principal (Aceita HTML como &lt;span&gt; ou &lt;br/&gt;)</label>
              <input type="text" value={settings.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Subtítulo Principal</label>
              <textarea rows={2} value={settings.hero_subtitle || ''} onChange={(e) => handleChange('hero_subtitle', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>
        </div>

        {/* Seção Home - Sobre */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Página Inicial - Sobre Nós</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Título da Seção Sobre</label>
              <input type="text" value={settings.about_title || ''} onChange={(e) => handleChange('about_title', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Subtítulo da Seção Sobre</label>
              <input type="text" value={settings.about_subtitle || ''} onChange={(e) => handleChange('about_subtitle', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Parágrafo 1</label>
              <textarea rows={3} value={settings.about_text_1 || ''} onChange={(e) => handleChange('about_text_1', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Parágrafo 2</label>
              <textarea rows={3} value={settings.about_text_2 || ''} onChange={(e) => handleChange('about_text_2', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Parágrafo 3</label>
              <textarea rows={3} value={settings.about_text_3 || ''} onChange={(e) => handleChange('about_text_3', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>
        </div>

        {/* Contato & Rodapé */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Contato & Rodapé</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Telefone Oficial</label>
                <input type="text" value={settings.contact_phone || ''} onChange={(e) => handleChange('contact_phone', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>E-mail Oficial</label>
                <input type="email" value={settings.contact_email || ''} onChange={(e) => handleChange('contact_email', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Endereço Completo</label>
              <textarea rows={2} value={settings.contact_address || ''} onChange={(e) => handleChange('contact_address', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: '#334155' }}>Horário de Funcionamento</label>
              <input type="text" value={settings.contact_hours || ''} onChange={(e) => handleChange('contact_hours', e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
