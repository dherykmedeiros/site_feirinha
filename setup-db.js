const { Client } = require('pg');
const fs = require('fs');

async function setup() {
  const connectionString = "postgres://postgres.cgrkouzirvxxveuigsgt:L73ns9MsPvAbqP8D@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x";
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const sql = fs.readFileSync('./schema.sql', 'utf8');
    await client.query(sql);
    
    console.log('Schema created successfully');
  } catch (err) {
    console.error('Error executing schema', err);
  } finally {
    await client.end();
  }
}

setup();
