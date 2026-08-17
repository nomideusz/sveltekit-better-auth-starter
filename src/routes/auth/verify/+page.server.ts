import type { PageServerLoad } from './$types.js';

// Landing after /api/auth/verify-email (?error=… on a bad token).
export const load: PageServerLoad = async ({ url }) => ({ success: !url.searchParams.get('error') });
