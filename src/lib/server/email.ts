import { createNotifier } from '@nomideusz/svelte-notify';
import { createMailer } from '@nomideusz/svelte-notify/transport';
import { env } from '#lib/server/env';

// Railway (and most PaaS) set optional variables to '' rather than leaving them
// unset, so every optional read here treats '' as absent.
const BRAND = env.SMTP_FROM_NAME || 'App';

/** The app's identity, bound once; every email renders through it. */
export const notify = createNotifier({ brand: BRAND, language: 'en', theme: { accent: '#1a7f4b' } });

// Two transports, one `send`:
// - RESEND_API_KEY set → Resend's HTTP API. Railway's Hobby plan blocks
//   outbound SMTP ports (25/465/587), so an HTTP mail API is the path that
//   works there without a paid plan.
// - else SMTP via nodemailer; with SMTP unset (local dev) messages are
//   logged, not sent.
const mailer = createMailer({
	host: env.SMTP_HOST || undefined,
	user: env.SMTP_USER || undefined,
	pass: env.SMTP_PASSWORD || undefined,
	port: Number(env.SMTP_PORT) || 465,
	from: env.SMTP_FROM || 'noreply@example.com',
	fromName: BRAND,
	onUnconfigured: (msg) => console.info('[email] not sent (SMTP unconfigured):', msg.to, msg.subject),
});
type Message = { to: string; subject: string; html: string; text?: string };

async function sendResend(msg: Message): Promise<boolean> {
	// Resend accepts only a verified domain sender, or onboarding@resend.dev
	// (which can mail the account owner only) — that is the fallback for tests.
	const from = `${BRAND} <${env.SMTP_FROM || 'onboarding@resend.dev'}>`;
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text }),
	});
	if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
	return true;
}

export const send: (msg: Message) => Promise<boolean> = env.RESEND_API_KEY ? sendResend : mailer.send;

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
