import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { getAuth } from '#lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => ({
	emailVerified: locals.user?.emailVerified ?? false,
});

export const actions: Actions = {
	// Re-send the verification link; /api/auth/verify-email lands on /auth/verify.
	resend: async ({ locals, request }) => {
		if (!locals.user) redirect(302, '/auth/login');
		await getAuth()
			.api.sendVerificationEmail({ body: { email: locals.user.email, callbackURL: '/auth/verify' }, headers: request.headers })
			.catch(() => {});
		return { sent: true };
	},
};
