<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const t = $derived(i18n.t);
</script>

<div class="card mx-auto max-w-sm">
	<p class={data.success ? 'notice text-sm' : 'error text-sm'}>{data.success ? t('verify_ok') : t('verify_bad')}</p>
	<p class="mt-4 text-sm"><a href="/app" class="link">{t('nav_app')}</a></p>
</div>
