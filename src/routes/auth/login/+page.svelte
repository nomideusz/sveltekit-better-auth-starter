<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold mb-4">{t('login_title')}</h1>
{#if data.reset}<p class="mb-2">{t('login_reset_done')}</p>{/if}
{#if form?.error}<p class="mb-2 text-red-700">{t(form.error)}</p>{/if}
<form method="POST" class="flex flex-col gap-2 max-w-sm">
	<input name="email" type="email" required placeholder={t('login_email')} class="border p-2" />
	<input name="password" type="password" required placeholder={t('login_password')} class="border p-2" />
	<button type="submit" class="border p-2">{t('login_submit')}</button>
	<a href="/auth/forgot-password" class="text-sm underline">{t('login_forgot')}</a>
	{#if data.allowSignup}<a href="/auth/signup" class="text-sm underline">{t('login_no_account')} {t('nav_signup')}</a>{/if}
</form>
