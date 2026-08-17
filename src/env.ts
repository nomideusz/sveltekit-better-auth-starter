// kit 3 removed `$env/*` — every environment variable must be declared here and
// is then imported from `$app/env/private` / `$app/env/public`.
// ponytail: `optional` keeps every value `string | undefined`. Swap a variable
// to a real validator when the app should refuse to boot without it.
import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (value: string | undefined) => value;

export const variables = defineEnvVars({
	BETTER_AUTH_SECRET: { schema: optional },
	DATABASE_URL: { schema: optional },
	ORIGIN: { schema: optional },
	SMTP_FROM: { schema: optional },
	SMTP_FROM_NAME: { schema: optional },
	SMTP_HOST: { schema: optional },
	SMTP_PASSWORD: { schema: optional },
	SMTP_PORT: { schema: optional },
	SMTP_USER: { schema: optional },
});
