<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData } from './$types.js';
	let { form }: { form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold mb-4">{t('signup_title')}</h1>
{#if form?.error}<p class="mb-2 text-red-700">{t(form.error)}</p>{/if}
<form method="POST" class="flex flex-col gap-2 max-w-sm">
	<input name="name" required placeholder={t('signup_name')} class="border p-2" />
	<input name="email" type="email" required placeholder={t('login_email')} class="border p-2" />
	<input name="password" type="password" required minlength="8" placeholder={t('login_password')} class="border p-2" />
	<button type="submit" class="border p-2">{t('signup_submit')}</button>
	<a href="/auth/login" class="text-sm underline">{t('signup_have_account')}</a>
</form>
