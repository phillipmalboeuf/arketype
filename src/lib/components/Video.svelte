<script lang="ts">
  import { browser } from '$app/environment'
  import type Player from 'vimeo__player'
	// import Vimeo from 'vimeo__player'
  import { onMount } from 'svelte'
	
	export let link: string
  export let half = false
  export let background = false

  export let player: Player = undefined
	let paused = true
	let muted = true
	let ready = false
	let hover = false

	let top: number
	let left: number

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			// import('vimeo-video-element')
			const Vimeo = (await import('@vimeo/player')).default 
			
			player = new Vimeo('video') as Player

			function loaded () {
				background ? player.play() : player.pause()
				ready = true
			}

			player.on("loaded", loaded)
		}
	})

	function format(url: string) {
		if (url.includes('player.vimeo.com')) return url;
		const split = url.replace('?share=copy', '').replace('https://vimeo.com/arketype/review', 'https://player.vimeo.com/video').replace('https://vimeo.com', 'https://player.vimeo.com/video').split('/')
		return split.filter((s, i) => i < 5).join('/') + `?h=${split[5]}`
	}
</script>

<figure class:half class:ready>
  {#if browser}
  <iframe title="Video" src="{format(link)}&loop=1&background=1{background ? '&portrait=0&muted=1&playsinline=1&autoplay=1' : '&muted=0'}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen id="video"></iframe>
  {/if}

	{#if !background && player}
	<!-- <button on:click|stopPropagation={() => {
		muted = !muted
		player.setMuted(muted)
	}}>Sound {#if muted}On{:else}Off{/if}</button> -->
	<button id="video" class:hover on:pointerenter={() => hover = true} on:pointerleave={() => hover = false} on:pointermove={e => {
		top = e.offsetY
		left = e.offsetX
	}} on:click|stopPropagation={() => {
		if (paused) {
			paused = false
			player.play()
		} else {
			paused = true
			player.pause()
		}
	}}><span style="top: {top}px; left: {left}px">{#if paused}● Play{:else}◼︎ Pause{/if}</span></button>
  {/if}
</figure>

<style lang="scss">

	figure {
		display: block;
		position: relative;
    // width: 100%;
    height: 100vh;
		opacity: 0;
		// will-change: opacity;
		transition: opacity 3333ms;

		&:before {
			content: "";
			
		}

		&.ready {
			opacity: 1;
		}

    &.half {
			// height: 56.25vw;
			height: 66vh;

			iframe {
      	// height: 56.25vw;
				height: 66vh;
			}
    }

		@media (max-width: $mobile) {
			margin-bottom: $gap;

			&.half {
			// height: 56.25vw;
				height: 50vh;

				iframe {
					// height: 56.25vw;
					height: 50vh;
				}
			}
		}
	}

	iframe {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
	}

	button {
		// cursor: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		opacity: 0;
		transition: opacity 333ms;

		&.hover {
			opacity: 1;
		}
		
		@supports (mix-blend-mode: exclusion) {
			color: white;
			mix-blend-mode: difference;
		}

		span {
			pointer-events: none;
			position: absolute;
			transform: translate(-50%, -50%);
		}

		@media (max-width: $mobile) {
			// bottom: 0;
			// right: 0;
			// left: auto;
			// top: auto;
			// height: auto;
			// width: auto;
			opacity: 1;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;

			span {
				pointer-events: auto;
				position: static;
				transform: none;
				padding: $mobile_base;
			}
		}
	}
</style>
