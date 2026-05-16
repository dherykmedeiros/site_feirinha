const { Client } = require('pg');
const fs = require('fs');

async function setup() {
  const connectionString = "postgres://postgres.cgrkouzirvxxveuigsgt:L73ns9MsPvAbqP8D@aws-1-sa-east-1.pooler.supabase.com:5432/postgres";
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados Postgres!');

    const sql = fs.readFileSync('./admin-schema.sql', 'utf8');
    await client.query(sql);
    
    console.log('Tabelas de Admin criadas com sucesso via script!');
  } catch (err) {
    console.error('Erro ao executar o schema:', err);
  } finally {
    await client.end();
  }
}

setup();
