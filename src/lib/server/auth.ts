// Better Auth — the same shape as yoga's and thebest's auth.ts.
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins/admin';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { building } from '$app/env';
import { env } from '#lib/server/env';
import { getDb } from './db/index.js';
import { user, session, account, verification } from './db/schema.js';
import { sendPasswordReset, sendEmailVerification } from './email.js';

export const MIN_PASSWORD_LENGTH = 8;
const ORIGIN = env.ORIGIN || 'http://localhost:5173';
/** Public self-service sign-up. Off by default: accounts are created by an admin. */
export const ALLOW_SIGNUP = env.ALLOW_SIGNUP === 'true';

function buildAuth() {
	return betterAuth({
		// Build-time route analysis has no env; the placeholder never serves a
		// request — at runtime a missing BETTER_AUTH_SECRET still throws.
		secret: env.BETTER_AUTH_SECRET || (building ? 'build-time-placeholder' : undefined),
		baseURL: ORIGIN,
		database: drizzleAdapter(getDb(), { provider: 'pg', schema: { user, session, account, verification } }),
		advanced: { database: { generateId: () => crypto.randomUUID() } },
		emailAndPassword: {
			enabled: true,
			disableSignUp: !ALLOW_SIGNUP,
			// New sign-ups get a verification email; the app works unverified but
			// shows a banner (see /app) until the link is used.
			minPasswordLength: MIN_PASSWORD_LENGTH,
			sendResetPassword: async ({ user, token }) => {
				await sendPasswordReset(user.email, `${ORIGIN}/auth/reset-password?token=${token}`);
			},
			revokeSessionsOnPasswordReset: true,
		},
		emailVerification: {
			sendOnSignUp: true,
			sendVerificationEmail: async ({ user, url }) => {
				await sendEmailVerification(user.email, url);
			},
		},
		plugins: [admin(), sveltekitCookies(getRequestEvent)], // sveltekitCookies must be last
		session: { expiresIn: 60 * 60 * 24 * 30, cookieCache: { enabled: true, maxAge: 60 * 5 }, freshAge: 0 },
		trustedOrigins: [ORIGIN],
	});
}

let _auth: ReturnType<typeof buildAuth> | undefined;
export function getAuth() {
	if (!_auth) _auth = buildAuth();
	return _auth;
}
