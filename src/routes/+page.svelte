<script lang="ts">
  import { browser } from '$app/environment'
  import Logo from '$lib/components/Logo.svelte'
  // import type Player from 'vimeo__player'
  import { onMount } from 'svelte'
  import MobileLogo from '$lib/components/MobileLogo.svelte'
  import { locale } from '$lib/stores'

	let player: HTMLVideoElement
	let muted = true

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			import('vimeo-video-element')
			// const Vimeo = (await import('@vimeo/player')).default 
			
			// player = new Vimeo('video') as Player
			// player.play()
		}
	})
	
</script>

<svelte:head>
	<title>Arketype</title>
	<meta name="description" content="Arketype post-production" />
</svelte:head>

<section>
	<figure>
		<Logo />
		<MobileLogo />
	</figure>
	
	{#if browser}
	<vimeo-video bind:this={player} autoplay loop muted background playsinline src="https://vimeo.com/858724565?h=0b37ea3820"></vimeo-video>
	{/if}
	<!-- <iframe src="https://player.vimeo.com/video/858724565?h=0b37ea3820&autoplay=1&loop=1&portrait=0&muted=1&background=1&playsinline=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen id="video"></iframe> -->
	<!-- <video src="https://videos.ctfassets.net/2g43ft9kwm8s/1F2EeNAGL4lVvXYvuwrv8B/ea954a2787d5a9714928a219134fad4f/The_O_Pears_-_Lady_Winter__Official_Music_Video_.mp4" muted autoplay playsinline loop preload="auto"></video> -->

	<footer>
		<nav>
			{#if player}
			<button on:click={() => {
				muted = !muted
				player.muted = muted
			}}>Sound {#if muted}On{:else}Off{/if}</button>
			{/if}
		</nav>

		<main class="{$locale}">
			<h1>Arketype</h1>
			<p>
				{#if $locale === 'fr-CA'}
				Vivez une expérience personnalisée où talents et performances haut de gamme s’unissent dans une atmosphère boutique, orchestrée par une équipe d’experts, au sein d’une maison de post-production dédiée à la satisfaction de ses clients.
				{:else}
				Experience a personalized journey, where inclusive talent meets high-end results in an intimate boutique atmosphere, enhanced by world-wide post-production.
				{/if}
				<a href="mailto:info@arketypeworld.com" rel="external" target="_blank">info@arketypeworld.com</a>
			</p>
		</main>
		
		<nav>
			<!-- <a href="https://instagram.com/arketypeworld" rel="external" target="_blank">Instagram</a> -->
			{#if $locale === 'fr-CA'}
			<a href="https://arketypeworld.com">English</a>
			{:else}
			<a href="https://fr.arketypeworld.com">Français</a>
			{/if}
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

	iframe,
	vimeo-video {
		position: absolute;
		top: 50vh;
		left: 50vw;
		z-index: 0;
		background-color: black;
		min-width: 100vw;
		min-height: 100vh;
		aspect-ratio: 1.77777;
		transform: translate(-50%, -50%) scale(1.33);

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
		// mix-blend-mode: exclusion;

		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: $base;

		> nav {
			flex: 1;
			
			&:last-child {
				display: flex;
				justify-content: end;
				gap: $base * 1.5;

				@media (max-width: $phone) {
					gap: $base * 0.66;
				}
			}
		}

		> main {
			text-align: center;
			max-width: $base * 45;

			&.fr-CA {
				max-width: $base * 69;
			}

			display: flex;
			flex-direction: column-reverse;
			gap: $base;

			p {
				a {
					display: block;
				}
			}
		}

		@media (max-width: $phone) {
			position: relative;
			padding: $base * 0.5;
			// align-items: flex-start;

			> main {
				flex-direction: column;

				p {
					position: absolute;
					top: 100%;
					left: 0;
					width: 100vw;
					padding: $base;
					min-height: calc(33vh - ($base * 2));
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					a {
						margin-top: $base;
					}
				}
			}
		}
	}
</style>
