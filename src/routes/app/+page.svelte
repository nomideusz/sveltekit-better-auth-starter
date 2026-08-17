<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const t = $derived(i18n.t);
</script>

<h1 class="text-2xl font-bold">{t('app_title', { email: data.user?.email ?? '' })}</h1>
