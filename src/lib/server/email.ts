import { createNotifier } from '@nomideusz/svelte-notify';
import { createMailer } from '@nomideusz/svelte-notify/transport';
import { env } from '#lib/server/env';

const BRAND = env.SMTP_FROM_NAME ?? 'App';

/** The app's identity, bound once; every email renders through it. */
export const notify = createNotifier({ brand: BRAND, language: 'en', theme: { accent: '#1a7f4b' } });

// SMTP unset (local dev) → messages are logged, not sent.
const mailer = createMailer({
	host: env.SMTP_HOST,
	user: env.SMTP_USER,
	pass: env.SMTP_PASSWORD,
	port: Number(env.SMTP_PORT) || 465,
	from: env.SMTP_FROM ?? 'noreply@example.com',
	fromName: BRAND,
	onUnconfigured: (msg) => console.info('[email] not sent (SMTP unconfigured):', msg.to, msg.subject),
});
export const send = mailer.send;

export async function sendPasswordReset(to: string, url: string) {
	const m = notify.actionLink({
		subject: `Reset your ${BRAND} password`,
		headingHtml: 'Reset your password',
		bodyHtml: '<p style="margin:0;">Click the button below to set a new password. The link expires in 1 hour.</p>',
		cta: { label: 'Reset password', url },
		footnotesHtml: ["If you didn't request this, you can ignore this email."],
	});
	await send({ to, ...m });
}

export async function sendEmailVerification(to: string, url: string) {
	const m = notify.actionLink({
		subject: `Verify your ${BRAND} email`,
		headingHtml: 'Verify your email',
		bodyHtml: '<p style="margin:0;">Click the button below to verify your email address.</p>',
		cta: { label: 'Verify email', url },
	});
	await send({ to, ...m });
}
