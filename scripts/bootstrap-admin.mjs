// First-run admin. Runs after migrations (pre-deploy / container start):
// if ADMIN_EMAIL + ADMIN_PASSWORD are set and no user with that email exists,
// creates an admin. Existing users are never touched, so a rotated
// ADMIN_PASSWORD does nothing once the account exists (reset via the app).
//
// Also the local dev entry: ADMIN_EMAIL=… ADMIN_PASSWORD=… pnpm admin:create
//
// Plain node + SQL on purpose: no tsx/drizzle schema import at runtime.
// Better Auth layout: identity in `user`, password on a `credential` row in
// `account` (hashPassword = Better Auth's own scrypt).
import postgres from 'postgres';
import { hashPassword } from 'better-auth/crypto';

const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
	console.log('bootstrap-admin: ADMIN_EMAIL/ADMIN_PASSWORD not set, skipping');
	process.exit(0);
}
if (!DATABASE_URL) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}
const email = ADMIN_EMAIL.trim().toLowerCase();
const sql = postgres(DATABASE_URL, { max: 1, prepare: false });
try {
	const [existing] = await sql`select id from "user" where email = ${email}`;
	if (existing) {
		console.log(`bootstrap-admin: ${email} exists, nothing to do`);
	} else {
		const id = crypto.randomUUID();
		const password = await hashPassword(ADMIN_PASSWORD);
		await sql.begin(async (tx) => {
			await tx`insert into "user" (id, email, name, email_verified, role)
				values (${id}, ${email}, ${ADMIN_NAME?.trim() || 'Admin'}, true, 'admin')`;
			await tx`insert into account (id, account_id, provider_id, user_id, password)
				values (${crypto.randomUUID()}, ${id}, 'credential', ${id}, ${password})`;
		});
		console.log(`bootstrap-admin: created admin ${email}`);
	}
} finally {
	await sql.end();
}
