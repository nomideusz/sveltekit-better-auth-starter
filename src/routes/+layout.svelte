<script lang="ts">
	import '../app.css';
	import { untrack } from 'svelte';
	import { page } from '$app/state';
	import { extractLocale, LocaleSwitcher } from '@nomideusz/svelte-i18n';
	import { i18n, i18nRouting, lhref } from '#lib/i18n';
	import type { LayoutData } from './$types.js';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// /app and /auth carry no locale prefix — the server-resolved preference
	// applies there; public pages derive the locale from the URL.
	const isApp = $derived(/^\/(app|auth)(\/|$)/.test(page.url.pathname));
	const activeLocale = $derived(isApp ? data.locale : extractLocale(page.url.pathname, i18nRouting).locale);

	// SSR + first paint: synchronous (see #lib/i18n). Client navigations track below.
	i18n.setLocale(untrack(() => activeLocale));
	$effect(() => {
		i18n.setLocale(activeLocale);
	});
	const t = $derived(i18n.t);
</script>

<header class="flex items-center gap-4 p-4 border-b">
	<a href={lhref('/')} class="font-bold">{t('app_name')}</a>
	<nav class="flex gap-4 ml-auto text-sm">
		{#if data.user}
			<a href="/app">{t('nav_app')}</a>
			<form method="POST" action="/auth/logout"><button type="submit">{t('nav_logout')}</button></form>
		{:else}
			<a href="/auth/login">{t('nav_login')}</a>
			{#if data.allowSignup}<a href="/auth/signup">{t('nav_signup')}</a>{/if}
		{/if}
		<LocaleSwitcher {i18n} routing={i18nRouting} unprefixed={['/app', '/auth']} />
	</nav>
</header>
<main class="p-4">
	{@render children()}
</main>
