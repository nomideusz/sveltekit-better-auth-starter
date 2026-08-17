import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

// Everything under /app requires a session.
export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');
	return {};
};
