// Static (synchronous) message loader: all locales are bundled so setLocale
// applies synchronously — the root layout sets the locale during the
// synchronous render pass, which SvelteKit never interleaves across requests.
// Do NOT switch to a dynamic import() loader without revisiting that.
import { createI18n, localizeHref } from '@nomideusz/svelte-i18n';
import { i18nRouting } from './i18n-routing.js';
import en from './messages/en.json';
import pl from './messages/pl.json';
import de from './messages/de.json';
import uk from './messages/uk.json';
import es from './messages/es.json';

const messages: Record<string, Record<string, string>> = { en, pl, de, uk, es };

export const i18n = createI18n({
	...i18nRouting,
	loader: (locale: string) => messages[locale] ?? messages.en,
});

export { i18nRouting };

/** Locale-prefixed href. Pass `locale` explicitly in load/server contexts. */
export function lhref(path: string, locale?: string): string {
	return localizeHref(path, locale ?? i18n.locale, i18nRouting);
}
