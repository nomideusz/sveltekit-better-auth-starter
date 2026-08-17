import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals }) => ({
	locale: locals.locale,
	user: locals.user && { id: locals.user.id, name: locals.user.name, email: locals.user.email, role: locals.user.role },
});
