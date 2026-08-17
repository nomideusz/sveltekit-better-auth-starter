<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData } from './$types.js';
	let { form }: { form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold mb-4">{t('forgot_title')}</h1>
{#if form?.sent}
	<p>{t('forgot_sent')}</p>
{:else}
	<form method="POST" class="flex flex-col gap-2 max-w-sm">
		<input name="email" type="email" required placeholder={t('login_email')} class="border p-2" />
		<button type="submit" class="border p-2">{t('forgot_submit')}</button>
	</form>
{/if}
