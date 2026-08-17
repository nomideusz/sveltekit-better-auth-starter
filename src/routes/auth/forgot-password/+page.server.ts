import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { getAuth } from '#lib/server/auth';

export const actions: Actions = {
	default: async ({ request }) => {
		const email = String((await request.formData()).get('email') ?? '').trim().toLowerCase();
		if (!email.includes('@')) return fail(400, { error: 'login_email' });
		// Non-enumerating: "sent" either way; only real addresses get mail.
		await getAuth().api.requestPasswordReset({ body: { email }, headers: request.headers }).catch(() => {});
		return { sent: true };
	},
};
