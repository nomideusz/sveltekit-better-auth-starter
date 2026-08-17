// Universal reroute: /pl/* → the un-prefixed route tree.
import { createReroute } from '@nomideusz/svelte-i18n';
import { i18nRouting } from '#lib/i18n-routing';

export const reroute = createReroute(i18nRouting);
