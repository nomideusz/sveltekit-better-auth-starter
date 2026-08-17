import { error, fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types.js';
import { getAuth, ALLOW_SIGNUP, MIN_PASSWORD_LENGTH } from '#lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!ALLOW_SIGNUP) error(404, 'Not found');
	if (locals.user) redirect(302, '/app');
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		if (!ALLOW_SIGNUP) error(404, 'Not found');
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');
		if (!name || !email.includes('@')) return fail(400, { error: 'signup_error' });
		if (password.length < MIN_PASSWORD_LENGTH) return fail(400, { error: 'signup_short' });
		try {
			// Signs the new user in (autoSignIn) and sends the verification email.
			await getAuth().api.signUpEmail({ body: { name, email, password }, headers: request.headers });
		} catch (e) {
			if (e instanceof APIError) return fail(400, { error: 'signup_error' });
			throw e;
		}
		redirect(302, '/app');
	},
};
