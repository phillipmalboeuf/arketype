<script lang="ts">
  import { browser } from '$app/environment'
  import type Player from 'vimeo__player'
	// import Vimeo from 'vimeo__player'
  import { onMount } from 'svelte'
	let player: Player
	let muted = true

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			// import('vimeo-video-element')
			const Vimeo = (await import('@vimeo/player')).default 
			
			player = new Vimeo('video') as Player
			player.play()
		}
	})
</script>

<figure>
  {#if browser}
  <iframe title="Video" src="https://player.vimeo.com/video/858724565?h=0b37ea3820&autoplay=1&loop=1&portrait=0&muted=1&background=1&playsinline=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen id="video"></iframe>
  {/if}

	<footer>
		<nav>
			{#if player}
			<button on:click|stopPropagation={() => {
				muted = !muted
				player.setMuted(muted)
			}}>Sound {#if muted}On{:else}Off{/if}</button>
			{/if}
		</nav>

	</footer>
</figure>

<style lang="scss">

	figure {
		position: relative;
    width: 100vw;
    height: 100vh;

		// &:before,
		// &:after {
		// 	position: absolute;
		// 	top: 50%;
		// 	left: 50%;
		// 	transform: translate(-50%, -50%);
		// 	content: "";
		// 	display: block;
		// 	height: calc(100% - 2px);
		// 	aspect-ratio: 1.58823529;
		// 	outline: 10000px solid black;

		// 	@media (max-width: $phone) {
		// 		aspect-ratio: 0.83443709;
		// 	}
		// }

		// &:after {
		// 	height: auto;
		// 	width: calc(100% - 2px);
		// }
	}

	iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
	}
</style>
