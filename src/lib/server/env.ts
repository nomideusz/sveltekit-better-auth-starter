// kit 3 exposes declared env vars as named exports of `$app/env/private` /
// `$app/env/public`; one namespace keeps `env.FOO` call sites simple.
import * as privateEnv from '$app/env/private';
import * as publicEnv from '$app/env/public';

export const env = { ...privateEnv, ...publicEnv };
