import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types.js';
import { getAuth, ALLOW_SIGNUP } from '#lib/server/auth';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) redirect(302, '/app');
	return { reset: url.searchParams.get('reset') === '1', allowSignup: ALLOW_SIGNUP };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');
		if (!email || !password) return fail(400, { error: 'login_error' });
		try {
			await getAuth().api.signInEmail({ body: { email, password }, headers: request.headers });
		} catch (e) {
			if (e instanceof APIError) return fail(400, { error: 'login_error' });
			throw e;
		}
		redirect(302, '/app');
	},
};
