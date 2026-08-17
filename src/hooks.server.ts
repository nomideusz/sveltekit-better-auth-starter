import type { Handle } from '@sveltejs/kit/hooks';
import { sequence } from '@sveltejs/kit/hooks';
import { createLocaleHandle } from '@nomideusz/svelte-i18n';
import { i18nRouting } from '#lib/i18n-routing';
import { getAuth } from '#lib/server/auth';
import { getDb } from '#lib/server/db';
import { user } from '#lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Locale: bare-root redirect, locals.locale, cookie sync, %lang%. The app
// area and auth pages carry no locale prefix — locale is a preference there.
const localeHandle: Handle = createLocaleHandle(i18nRouting, { unprefixed: ['/app', '/auth'] });

// Session → locals.user (full row; the app reads role etc. off it). Better
// Auth's cookie cache means this is usually no DB hit for the session itself.
const sessionHandle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	try {
		const session = await getAuth().api.getSession({ headers: event.request.headers });
		if (session) {
			const [row] = await getDb().select().from(user).where(eq(user.id, session.user.id)).limit(1);
			event.locals.user = row ?? null;
		}
	} catch {
		// treat as logged out for this request
	}
	const response = await resolve(event);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	if (process.env.NODE_ENV === 'production') {
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	}
	return response;
};

export const handle = sequence(localeHandle, sessionHandle);
