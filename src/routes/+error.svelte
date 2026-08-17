<script lang="ts">
	import { page } from '$app/state';
</script>

<h1 class="text-2xl font-bold">{page.status}</h1>
<p>{page.error?.message}</p>
