// Public counterpart of `#lib/server/env` — safe to import in browser code.
import * as publicEnv from '$app/env/public';

export const env = publicEnv;
