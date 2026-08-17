import { pgTable, uuid, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';

const now = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
const updated = () =>
	timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date());

// ─── Better Auth (user model + admin plugin fields). Add domain columns to
// `user` freely; keep the core ones. ────────────────────────────────────────

export const user = pgTable('user', {
	id: uuid('id').primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	emailVerified: boolean('email_verified').notNull().default(false),
	image: text('image'),
	role: text('role', { enum: ['user', 'admin'] }).notNull().default('user'),
	banned: boolean('banned').default(false),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires', { withTimezone: true }),
	createdAt: now(),
	updatedAt: updated(),
});

export const session = pgTable(
	'session',
	{
		id: uuid('id').primaryKey(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		token: text('token').notNull().unique(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
		impersonatedBy: text('impersonated_by'),
		createdAt: now(),
		updatedAt: updated(),
	},
	(t) => [index('session_user_id_idx').on(t.userId)],
);

export const account = pgTable(
	'account',
	{
		id: uuid('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
		scope: text('scope'),
		password: text('password'),
		createdAt: now(),
		updatedAt: updated(),
	},
	(t) => [index('account_user_id_idx').on(t.userId)],
);

export const verification = pgTable(
	'verification',
	{
		id: uuid('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		createdAt: now(),
		updatedAt: updated(),
	},
	(t) => [index('verification_identifier_idx').on(t.identifier)],
);

export type User = typeof user.$inferSelect;
