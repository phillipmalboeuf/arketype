<script lang="ts">
  import { goto, preloadData, pushState, replaceState } from '$app/navigation'
	import { fade } from 'svelte/transition'

  import Logo from '$lib/components/Logo.svelte'
	import Logotype from '$lib/components/Logotype.svelte'
  import Video from '$lib/components/Video.svelte'

	import ProjectsPage from './projects/+page.svelte'

	let data
	let href: string

	const projects = async () => {
		if (href) return

		href = '/projects'
		pushState(href, {})
		data = await preloadData(href)
	}
</script>

<svelte:head>
	<title>Arketype</title>
	<meta name="description" content="Arketype post-production" />
</svelte:head>

<svelte:window on:scroll={(e) => {
	if (e.currentTarget.scrollY > 100) {
		projects()
	} else if (href) {
		replaceState('/', {})
		href = undefined
	}
}} />

<header class:data>

	<button on:click={() => {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
		projects()
	}}>
		<Logotype />
	</button>

	<Video background />
</header>

{#if data?.status === 200}
<main transition:fade={{ duration: 333 }}>
	<ProjectsPage data={data.data} noContent />
</main>
{/if}


<style lang="scss">
	header {
		cursor: pointer;
		position: relative;
		z-index: 3;
		margin-top: $base * -4;
		margin-bottom: $base * 4;
		height: 100vh;
		background-color: var(--back-color);
		transition: background-color 333ms;

		&:not(.data) {
			margin-bottom: 100vh;
		}

		button {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 30;
			border: none;
			padding: 0 $base;

			:global(.light) & {
				color: var(--back-color);
			}
			
			transition: color 333ms;

			:global(svg) {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
