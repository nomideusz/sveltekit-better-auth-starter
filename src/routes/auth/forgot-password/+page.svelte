<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData } from './$types.js';
	let { form }: { form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<div class="card mx-auto max-w-sm">
	<h1 class="mb-4 text-2xl font-semibold">{t('forgot_title')}</h1>
	{#if form?.sent}
		<p class="notice text-sm">{t('forgot_sent')}</p>
	{:else}
		<form method="POST" class="flex flex-col gap-3">
			<input name="email" type="email" required autocomplete="email" placeholder={t('login_email')} class="input" />
			<button type="submit" class="btn btn-primary">{t('forgot_submit')}</button>
		</form>
	{/if}
	<p class="mt-4 text-sm"><a href="/auth/login" class="link">{t('login_title')}</a></p>
</div>
