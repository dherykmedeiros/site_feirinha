require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncBoxes() {
  // 1. Limpar os boxes atuais (aqueles de teste do SQL)
  const { error: deleteError } = await supabase
    .from('boxes')
    .delete()
    .neq('numero', '0'); // Gambiarra para deletar todos, já que nenhum tem numero='0'

  if (deleteError) {
    console.error('Erro ao limpar a tabela:', deleteError);
  } else {
    console.log('Tabela limpa com sucesso.');
  }

  // 2. Inserir os 4 boxes com os dados OFICIAIS capturados do site
  const boxesToInsert = [
    {
      numero: 'BOX 000',
      nome: 'LOLI',
      descricao: 'Acessórios & Bijuterias',
      categoria: 'Acessórios',
      imagem_url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=800',
      instagram: '@loliacessorios',
      ativo: true
    },
    {
      numero: 'BOX 103',
      nome: 'ADORA BIJOUX',
      descricao: 'Bijuterias e acessórios.',
      categoria: 'Acessórios',
      imagem_url: 'https://images.unsplash.com/photo-1599643478514-4a11011d19d1?auto=format&fit=crop&q=80&w=800',
      instagram: '@adorabijoux',
      ativo: true
    },
    {
      numero: 'BOX 701',
      nome: 'RENDA DONNA',
      descricao: 'Blusas, Vestidos em Renda Filet e Bilro, saídas de praia, conjunto em Filet, crochê. Moda Infantil e Adulto.',
      categoria: 'Roupas',
      imagem_url: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
      instagram: '@rendadonna',
      ativo: true
    },
    {
      numero: 'BOX 704',
      nome: 'BS COUROS',
      descricao: 'Eles são duráveis, confortáveis e estilosos. Conheça as vantagens de ter um sapato de couro.',
      categoria: 'Couro',
      imagem_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      instagram: null,
      ativo: true
    }
  ];

  const { data, error } = await supabase
    .from('boxes')
    .insert(boxesToInsert)
    .select();

  if (error) {
    console.error('Erro ao inserir:', error);
  } else {
    console.log('Sucesso! Novos boxes do site antigo inseridos:', data.length);
  }
}

syncBoxes();
