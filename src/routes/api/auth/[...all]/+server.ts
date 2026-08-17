// Better Auth's HTTP surface: the emailed verify-email link, sign-out, session,
// admin endpoints. The app's own forms call getAuth().api.* directly.
import { toSvelteKitHandler } from 'better-auth/svelte-kit';
import { getAuth } from '#lib/server/auth';
import type { RequestHandler } from './$types.js';

const handler: RequestHandler = (event) => toSvelteKitHandler(getAuth())(event);
export const GET = handler;
export const POST = handler;
