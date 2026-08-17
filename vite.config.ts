import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// kit 3: no svelte.config.js — SvelteKit and compiler options live here.
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			inlineStyleThreshold: 10240,
			compilerOptions: { experimental: { async: true } },
		}),
	],
});
