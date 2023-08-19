<script lang="ts">
  import { browser } from '$app/environment'
  import Logo from '$lib/components/Logo.svelte'
  import type Player from 'vimeo__player'
  import { onMount } from 'svelte'
    import MobileLogo from '$lib/components/MobileLogo.svelte';

	let player: Player
	let muted = true

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			const Vimeo = (await import('@vimeo/player')).default 
			
			player = new Vimeo('video') as Player
			player.play()
		}
	})
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<figure>
		<Logo />
		<MobileLogo />
	</figure>
	
	<iframe src="https://player.vimeo.com/video/649587110?h=e34763b124&autoplay=1&loop=1&portrait=0&muted=1&background=1&playsinline=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Ma soeur" id="video"></iframe>
	<!-- <video src="https://videos.ctfassets.net/2g43ft9kwm8s/1F2EeNAGL4lVvXYvuwrv8B/ea954a2787d5a9714928a219134fad4f/The_O_Pears_-_Lady_Winter__Official_Music_Video_.mp4" muted autoplay playsinline loop preload="auto"></video> -->

	<footer>
		<nav>
			{#if player}
			<button on:click={() => {
				muted = !muted
				player.setMuted(muted)
			}}>Sound {#if muted}On{:else}Off{/if}</button>
			{/if}
		</nav>

		<main>
			<h1>Arketype</h1>
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.</p>
		</main>
		
		<nav>
			<a href="https://instagram.com/arketypeworld" rel="external" target="_blank">Instagram</a>
		</nav>
	</footer>
</section>

<style lang="scss">
	section {
		position: relative;
		text-transform: uppercase;
		min-height: 100vh;
		overflow: hidden;
	}

	figure {
		position: relative;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;

		@media (max-width: $phone) {
			height: 66vh;
		}

		&:before,
		&:after {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			content: "";
			display: block;
			height: calc(100% - 2px);
			aspect-ratio: 1.58823529;
			outline: 10000px solid black;

			@media (max-width: $phone) {
				aspect-ratio: 0.83443709;
			}
		}

		&:after {
			height: auto;
			width: calc(100% - 2px);
		}

		:global(svg) {
			width: 100%;
			height: 100%;

			&:last-of-type {
				display: none;
			}

			@media (max-width: $phone) {
				&:last-of-type {
					display: block;
				}

				&:first-of-type {
					display: none;
				}
			}
		}
	}

	iframe {
		position: absolute;
		top: 50vh;
		left: 50vw;
		z-index: 0;
		background-color: white;
		min-width: 100vw;
		min-height: 100vh;
		aspect-ratio: 1.77777;
		transform: translate(-50%, -50%);

		@media (max-width: $phone) {
			top: 33vh;
			min-height: 66vh;
		}
	}

	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		padding: $base * 2;
		mix-blend-mode: exclusion;

		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: $base;

		> nav {
			flex: 1;

			&:last-child {
				text-align: right;
			}
		}

		> main {
			text-align: center;
			max-width: $base * 66;

			display: flex;
			flex-direction: column-reverse;
			gap: $base;
		}

		@media (max-width: $phone) {
			position: relative;
			padding: $base * 0.5;

			> main {
				flex-direction: column;

				p {
					position: absolute;
					top: 100%;
					left: 0;
					width: 100vw;
					padding: $base;
					height: calc(33vh - ($base * 4));
					display: flex;
					align-items: flex-end;
				}
			}
		}
	}
</style>
