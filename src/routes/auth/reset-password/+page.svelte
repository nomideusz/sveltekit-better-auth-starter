<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold mb-4">{t('reset_title')}</h1>
{#if !data.valid}
	<p>{t('reset_invalid')}</p>
{:else}
	{#if form?.error}<p class="mb-2 text-red-700">{t(form.error)}</p>{/if}
	<form method="POST" class="flex flex-col gap-2 max-w-sm">
		<input name="password" type="password" required placeholder={t('reset_password')} class="border p-2" />
		<input name="confirm" type="password" required placeholder={t('reset_confirm')} class="border p-2" />
		<button type="submit" class="border p-2">{t('reset_submit')}</button>
	</form>
{/if}
