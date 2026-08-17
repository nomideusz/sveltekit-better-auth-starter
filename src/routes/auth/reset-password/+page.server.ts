import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types.js';
import { getAuth, MIN_PASSWORD_LENGTH } from '#lib/server/auth';

// /auth/reset-password?token=… — the token is checked when used (no peek API).
export const load: PageServerLoad = async ({ url }) => ({ valid: !!url.searchParams.get('token') });

export const actions: Actions = {
	default: async ({ url, request }) => {
		const token = url.searchParams.get('token') ?? '';
		const data = await request.formData();
		const password = String(data.get('password') ?? '');
		if (password.length < MIN_PASSWORD_LENGTH) return fail(400, { error: 'reset_short' });
		if (password !== String(data.get('confirm') ?? '')) return fail(400, { error: 'reset_mismatch' });
		try {
			await getAuth().api.resetPassword({ body: { token, newPassword: password }, headers: request.headers });
		} catch (e) {
			if (e instanceof APIError) return fail(400, { error: 'reset_invalid' });
			throw e;
		}
		redirect(302, '/auth/login?reset=1');
	},
};
