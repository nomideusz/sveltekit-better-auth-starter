<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData } from './$types.js';
	let { form }: { form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<div class="card mx-auto max-w-sm">
	<h1 class="mb-4 text-2xl font-semibold">{t('signup_title')}</h1>
	{#if form?.error}<p class="error mb-3 text-sm">{t(form.error)}</p>{/if}
	<form method="POST" class="flex flex-col gap-3">
		<input name="name" required autocomplete="name" placeholder={t('signup_name')} class="input" />
		<input name="email" type="email" required autocomplete="email" placeholder={t('login_email')} class="input" />
		<input name="password" type="password" required minlength="8" autocomplete="new-password" placeholder={t('login_password')} class="input" />
		<button type="submit" class="btn btn-primary">{t('signup_submit')}</button>
	</form>
	<p class="muted mt-4 text-sm">{t('signup_have_account')} <a href="/auth/login" class="link">{t('login_submit')}</a></p>
</div>
