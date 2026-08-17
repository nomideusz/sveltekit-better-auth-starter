<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<div class="card mx-auto max-w-sm">
	<h1 class="mb-4 text-2xl font-semibold">{t('login_title')}</h1>
	{#if data.reset}<p class="notice mb-4 text-sm">{t('login_reset_done')}</p>{/if}
	{#if form?.error}<p class="error mb-3 text-sm">{t(form.error)}</p>{/if}
	<form method="POST" class="flex flex-col gap-3">
		<input name="email" type="email" required autocomplete="email" placeholder={t('login_email')} class="input" />
		<input name="password" type="password" required autocomplete="current-password" placeholder={t('login_password')} class="input" />
		<button type="submit" class="btn btn-primary">{t('login_submit')}</button>
	</form>
	<p class="mt-4 text-sm"><a href="/auth/forgot-password" class="link">{t('login_forgot')}</a></p>
	{#if data.allowSignup}
		<p class="muted mt-1 text-sm">{t('login_no_account')} <a href="/auth/signup" class="link">{t('nav_signup')}</a></p>
	{/if}
</div>
