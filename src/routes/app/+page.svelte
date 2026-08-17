<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold mb-4">{t('account_title')}</h1>

{#if !data.emailVerified}
	<div class="border p-3 mb-4 max-w-md">
		<p>{t('verify_pending')}</p>
		{#if form?.sent}
			<p class="text-sm mt-1">{t('verify_sent')}</p>
		{:else}
			<form method="POST" action="?/resend"><button type="submit" class="underline text-sm mt-1">{t('verify_resend')}</button></form>
		{/if}
	</div>
{/if}

<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 max-w-md">
	<dt class="text-sm opacity-70">{t('account_name')}</dt><dd>{data.user?.name}</dd>
	<dt class="text-sm opacity-70">{t('account_email')}</dt><dd>{data.user?.email}</dd>
	<dt class="text-sm opacity-70">{t('account_role')}</dt><dd>{data.user?.role}</dd>
</dl>

<form method="POST" action="/auth/logout" class="mt-6"><button type="submit" class="border p-2">{t('nav_logout')}</button></form>
