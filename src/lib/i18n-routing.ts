// Single source of truth for URL-locale routing (hooks, hrefs, sitemap, hreflang).
// Default locale is served un-prefixed; every other at /<locale>/*.
import type { LocaleRoutingConfig } from '@nomideusz/svelte-i18n';

export const i18nRouting: LocaleRoutingConfig = {
	defaultLocale: 'en',
	supportedLocales: ['en', 'pl', 'de', 'uk', 'es'],
};
