const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_XnYf7FxZ0zsp@ep-noisy-smoke-a4cozwez-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

async function cleanDatabase() {
  try {
    await client.connect();
    console.log('Connected to Neon database\n');

    // List all tables
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename;
    `);

    console.log('Current tables in database:');
    console.log('='.repeat(50));
    tablesResult.rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.tablename}`);
    });
    console.log('='.repeat(50));
    console.log(`Total: ${tablesResult.rows.length} tables\n`);

    // Tables to keep (Strapi core + batchmates)
    const tablesToKeep = [
      'batchmates',
      'admin_permissions',
      'admin_permissions_role_lnk',
      'admin_roles',
      'admin_users',
      'admin_users_roles_lnk',
      'files',
      'files_folder_lnk',
      'files_related_mph',
      'i18n_locale',
      'strapi_api_tokens',
      'strapi_api_token_permissions',
      'strapi_api_token_permissions_token_lnk',
      'strapi_core_store_settings',
      'strapi_database_schema',
      'strapi_migrations',
      'strapi_migrations_internal',
      'strapi_release_actions',
      'strapi_release_actions_release_lnk',
      'strapi_releases',
      'strapi_transfer_tokens',
      'strapi_transfer_token_permissions',
      'strapi_transfer_token_permissions_token_lnk',
      'strapi_webhooks',
      'strapi_workflows',
      'strapi_workflows_stages',
      'strapi_workflows_stages_permissions_lnk',
      'strapi_workflows_stages_workflow_lnk',
      'upload_folders',
      'upload_folders_parent_lnk',
      'up_permissions',
      'up_permissions_role_lnk',
      'up_roles',
      'up_users',
      'up_users_role_lnk'
    ];

    // Find tables to drop
    const tablesToDrop = tablesResult.rows
      .map(row => row.tablename)
      .filter(tablename => !tablesToKeep.includes(tablename));

    if (tablesToDrop.length === 0) {
      console.log('✅ No unnecessary tables found. Database is clean!\n');
    } else {
      console.log(`Found ${tablesToDrop.length} tables to drop:`);
      tablesToDrop.forEach(table => console.log(`  - ${table}`));
      console.log('\nDropping tables...\n');

      for (const table of tablesToDrop) {
        try {
          await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
          console.log(`✓ Dropped: ${table}`);
        } catch (err) {
          console.log(`✗ Failed to drop ${table}: ${err.message}`);
        }
      }

      console.log('\n✅ Database cleanup completed!\n');
    }

    // Show final table count
    const finalResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `);
    console.log(`Final table count: ${finalResult.rows[0].count} tables`);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

cleanDatabase();
