<script lang="ts">
	import '../styles/styles.scss'

	import { dark, color } from '$lib/stores'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Cursor from '$lib/components/Cursor.svelte'

	import { page } from '$app/stores'

	import type { LayoutData } from './$types'
	export let data: LayoutData

	let up = true
	let currentScroll = 0
	let scrollY = 0
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.title}</title>
	<meta name="description" content={$page.data.page.fields.description} />
	{/if}
</svelte:head>

<svelte:window bind:scrollY on:scroll={e => {
  if (up && scrollY > 0 && currentScroll < scrollY) {
		up = false
	} else if (!up && currentScroll > scrollY) {
		up = true
	}
	
	currentScroll = scrollY
}} />

<div class:up style={!!$color && `--color: ${$color}`} class:dark={$dark} class:light={$dark !== undefined && !$dark}>
	{#if !$page.data.page || $page.data.page?.fields.id !== 'home'}<Header header={data.header} />{/if}

	<main>
		<slot />
	</main>

	<Footer footer={data.footer} social={data.social} contact={data.contact} />
</div>

<Cursor />

<style lang="scss">
	div {
		transition: color 333ms, background-color 333ms;
		color: var(--front-color);
		background-color: var(--back-color);

		@media (prefers-color-scheme: dark) {
			--front-color: var(--color, #{$back-color});
			--back-color: #{$front-color};

			&.light {
				--front-color: #{$front-color};
				--back-color: var(--color, #{$back-color});
			}
		}

		&.dark {
			--front-color: var(--color, #{$back-color});
			--back-color: #{$front-color};
		}
	}
	
	main {
		min-height: 100vh;
	}
</style>
