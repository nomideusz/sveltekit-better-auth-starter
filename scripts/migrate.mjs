import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}

console.log('Running migrations...');

const client = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(client);

await migrate(db, { migrationsFolder: './drizzle' });

console.log('Migrations complete.');
await client.end();
process.exit(0);
