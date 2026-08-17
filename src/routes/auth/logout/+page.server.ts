import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { getAuth } from '#lib/server/auth';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (locals.user) await getAuth().api.signOut({ headers: request.headers }).catch(() => {});
		redirect(302, '/');
	},
};
