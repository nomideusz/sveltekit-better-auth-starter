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
	const LABELS = { en: 'English', pl: 'Polski', de: 'Deutsch', uk: 'Українська', es: 'Español' };
</script>

<header class="border-b" style="border-color: var(--app-border); background: var(--app-surface)">
	<div class="container-app flex h-14 items-center gap-6">
		<a href={lhref('/')} class="font-semibold tracking-tight">{t('app_name')}</a>
		<nav class="flex items-center gap-4 text-sm">
			{#if data.user}
				<a href="/app" class="hover:underline">{t('nav_app')}</a>
			{:else}
				<a href="/auth/login" class="hover:underline">{t('nav_login')}</a>
				{#if data.allowSignup}<a href="/auth/signup" class="hover:underline">{t('nav_signup')}</a>{/if}
			{/if}
		</nav>
		<div class="ml-auto flex items-center gap-3">
			{#if data.user}
				<form method="POST" action="/auth/logout"><button type="submit" class="btn btn-sm">{t('nav_logout')}</button></form>
			{/if}
			<LocaleSwitcher {i18n} labels={LABELS} routing={i18nRouting} unprefixed={['/app', '/auth']} class="h-8 text-sm" />
		</div>
	</div>
</header>
<main class="container-app py-10">
	{@render children()}
</main>
