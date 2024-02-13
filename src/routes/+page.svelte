<script lang="ts">
	import type Player from '@vimeo/player'

  import { goto, preloadData, pushState, replaceState } from '$app/navigation'
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'

  import Logo from '$lib/components/Logo.svelte'
	import Logotype from '$lib/components/Logotype.svelte'
  import Video from '$lib/components/Video.svelte'

	import ProjectsPage from './projects/+page.svelte'
  import ColorToggle from '$lib/components/ColorToggle.svelte'
  import Header from '$lib/components/Header.svelte'

	let data
	let href: string
	let hidden = false
	let innerHeight: number

	let muted = true
	let player: Player

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

<svelte:window bind:innerHeight on:scroll={(e) => {
	if (e.currentTarget.scrollY > 100) {
		projects()
	} else if (href) {
		replaceState('/', {})
		href = undefined
	}

	// if (!hidden && e.currentTarget.scrollY >= innerHeight) {
	// 	hidden = true
	// 	window.scrollTo({ top: 0, behavior: 'smooth' })
	// }
}} />

{#if !hidden}
<header class:data>
	<nav>
		<a href="/">Arketype</a>
		<button on:click={() => {
			muted = !muted
			player.setMuted(muted)
		}}>Sound {#if muted}On{:else}Off{/if}</button>

		<ColorToggle />
	</nav>

	<button class="scroll" on:click={() => {
		window.scrollTo({ top: innerHeight, behavior: 'smooth' })
	}}>
		<!-- <Logotype /> -->
	</button>

	<Video background bind:player={player} />
</header>
{/if}

<Header header={$page.data.header} />

{#if data?.status === 200}
<main transition:fade={{ duration: 333 }}>
	<ProjectsPage data={data.data} />
</main>
{/if}


<style lang="scss">
	header {
		cursor: pointer;
		position: relative;
		z-index: 99;
		// margin-top: $base * -4;
		margin-bottom: 0;
		height: 100vh;
		background-color: var(--back-color);
		transition: background-color 333ms;

		// &:not(.data) {
		// 	margin-bottom: 100vh;
		// }

		nav {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 40;
			
			display: flex;
			align-items: center;
			gap: $base;
			padding: $base;
			width: 100%;

			> a {
				text-transform: uppercase;
				flex: 1;
			}

			> button {
				display: inline;
				text-align: left;
				flex: 6;
				
				&:before {
					content: "● ";
					opacity: 0;
					transition: opacity 333ms;
				}

				&:hover,
				&:focus {
					&:before {
						opacity: 1;
					}
				}
			}

			:global(form) {
				margin-left: auto;
			}
		}

		.scroll {
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
