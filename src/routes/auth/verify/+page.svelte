<script lang="ts">
	import { i18n } from '#lib/i18n';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
	const t = $derived(i18n.t);
</script>

<p>{data.success ? t('verify_ok') : t('verify_bad')}</p>
