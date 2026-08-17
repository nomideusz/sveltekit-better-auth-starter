<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<div class="card mx-auto max-w-sm">
	<h1 class="mb-4 text-2xl font-semibold">{t('reset_title')}</h1>
	{#if !data.valid}
		<p class="error text-sm">{t('reset_invalid')}</p>
		<p class="mt-4 text-sm"><a href="/auth/forgot-password" class="link">{t('forgot_title')}</a></p>
	{:else}
		{#if form?.error}<p class="error mb-3 text-sm">{t(form.error)}</p>{/if}
		<form method="POST" class="flex flex-col gap-3">
			<input name="password" type="password" required minlength="8" autocomplete="new-password" placeholder={t('reset_password')} class="input" />
			<input name="confirm" type="password" required autocomplete="new-password" placeholder={t('reset_confirm')} class="input" />
			<button type="submit" class="btn btn-primary">{t('reset_submit')}</button>
		</form>
	{/if}
</div>
