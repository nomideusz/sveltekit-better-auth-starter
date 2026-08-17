import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '#lib/server/env';
import * as schema from './schema.js';

// Lazy: throws at first use if DATABASE_URL is unset, not at module load
// (which would break the build).
let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
	if (!_db) {
		const url = env.DATABASE_URL;
		if (!url) throw new Error('DATABASE_URL is not set');
		_db = drizzle(postgres(url, { prepare: false, max: 10, idle_timeout: 30, connect_timeout: 10 }), { schema });
	}
	return _db;
}

export type Database = ReturnType<typeof getDb>;
