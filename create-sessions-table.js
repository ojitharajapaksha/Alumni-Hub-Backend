const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_XnYf7FxZ0zsp@ep-noisy-smoke-a4cozwez-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const createSessionsTable = async () => {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to Neon database...');

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.strapi_sessions (
        id SERIAL PRIMARY KEY,
        document_id VARCHAR(255),
        session_id VARCHAR(255) NOT NULL UNIQUE,
        user_id INTEGER,
        device_id VARCHAR(255),
        type VARCHAR(50),
        status VARCHAR(50),
        origin VARCHAR(255),
        expires_at TIMESTAMP WITH TIME ZONE,
        absolute_expires_at TIMESTAMP WITH TIME ZONE,
        child_id VARCHAR(255),
        published_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTableSQL);
    console.log('✅ strapi_sessions table created successfully!');

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_strapi_sessions_session_id ON public.strapi_sessions(session_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_strapi_sessions_user_id ON public.strapi_sessions(user_id)');
    console.log('✅ Indexes created successfully!');

  } catch (error) {
    console.error('Error creating sessions table:', error.message);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
};

createSessionsTable();
