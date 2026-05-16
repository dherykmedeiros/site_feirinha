import { createClient } from '@supabase/supabase-js';

// Usamos variáveis de ambiente para a URL e KEY, mas com fallback vazio caso ainda não existam.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipo base para os boxes
export type Box = {
  id: string;
  numero: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem_url: string;
  instagram?: string;
  telefone?: string;
  ativo: boolean;
};

// Mock data para desenvolvimento inicial
export const mockBoxes: Box[] = [
  {
    id: '1',
    numero: 'BOX 103',
    nome: 'Adora Bijoux',
    descricao: 'As melhores bijuterias com design exclusivo.',
    categoria: 'Acessórios',
    imagem_url: 'https://images.unsplash.com/photo-1599643478514-4a11011d19d1?auto=format&fit=crop&q=80&w=800',
    instagram: '@adorabijoux',
    ativo: true
  },
  {
    id: '2',
    numero: 'BOX 701',
    nome: 'Renda Donna',
    descricao: 'Rendas cearenses feitas à mão com muito carinho.',
    categoria: 'Roupas',
    imagem_url: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
    instagram: '@rendadonna',
    ativo: true
  },
  {
    id: '3',
    numero: 'BOX 704',
    nome: 'BS Couros',
    descricao: 'Arte em couro, bolsas, cintos e sandálias.',
    categoria: 'Couro',
    imagem_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    ativo: true
  }
];
