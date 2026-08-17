import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getDb } from '#lib/server/db/index.js';
import { sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		const db = getDb();
		await db.execute(sql`SELECT 1`);
		return json({ ok: true, db: true });
	} catch {
		return json({ ok: false, db: false }, { status: 503 });
	}
};
