import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
