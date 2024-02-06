<script lang="ts">
  import { browser } from '$app/environment'
  import type Player from 'vimeo__player'
	// import Vimeo from 'vimeo__player'
  import { onMount } from 'svelte'
	
  export let half = false
  export let background = false

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

<figure class:half>
  {#if browser}
  <iframe title="Video" src="https://player.vimeo.com/video/858724565?h=0b37ea3820&autoplay=1&loop=1{background ? '&portrait=0&muted=1&background=1&playsinline=1' : ''}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen id="video"></iframe>
  {/if}

	{#if !background}
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
  {/if}
</figure>

<style lang="scss">

	figure {
		position: relative;
    width: 100vw;
    height: 100vh;

    &.half {
      height: 66vh;
    }
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
