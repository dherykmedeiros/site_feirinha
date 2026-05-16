require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Chave secreta de serviço que tem poder de admin
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createUser() {
  const email = 'admin@feirinha.com';
  const password = 'FeirinhaAdmin2026';

  console.log(`Criando usuário admin: ${email}...`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true // Já confirma o email automaticamente
  });

  if (error) {
    console.error('Erro ao criar usuário:', error.message);
  } else {
    console.log('Usuário criado com sucesso!');
    console.log('--- CREDENCIAIS ---');
    console.log('Email:', email);
    console.log('Senha:', password);
  }
}

createUser();
