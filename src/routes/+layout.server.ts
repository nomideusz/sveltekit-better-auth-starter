import type { LayoutServerLoad } from './$types.js';
import { ALLOW_SIGNUP } from '#lib/server/auth';

export const load: LayoutServerLoad = async ({ locals }) => ({
	locale: locals.locale,
	allowSignup: ALLOW_SIGNUP,
	user: locals.user && { id: locals.user.id, name: locals.user.name, email: locals.user.email, role: locals.user.role },
});
