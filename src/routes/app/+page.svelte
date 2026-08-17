<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { ActionData, PageData } from './$types.js';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="mb-6 text-3xl font-semibold tracking-tight">{t('account_title')}</h1>

{#if !data.emailVerified}
	<div class="notice mb-6 max-w-md text-sm">
		<p>{t('verify_pending')}</p>
		{#if form?.sent}
			<p class="muted mt-1">{t('verify_sent')}</p>
		{:else}
			<form method="POST" action="?/resend" class="mt-1"><button type="submit" class="link">{t('verify_resend')}</button></form>
		{/if}
	</div>
{/if}

<div class="card max-w-md">
	<dl class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2">
		<dt class="muted text-sm">{t('account_name')}</dt><dd>{data.user?.name}</dd>
		<dt class="muted text-sm">{t('account_email')}</dt><dd>{data.user?.email}</dd>
		<dt class="muted text-sm">{t('account_role')}</dt><dd>{data.user?.role}</dd>
	</dl>
</div>
