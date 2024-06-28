<script lang="ts">
  import { browser } from '$app/environment'
  import type Player from 'vimeo__player'
	// import Vimeo from 'vimeo__player'
  import { onDestroy, onMount } from 'svelte'
	
	export let link: string
  export let half = false
	export let golden = false
  export let background = false

  export let player: Player = undefined

	let element: HTMLElement
	let paused = true
	let muted = background
	let fullscreen = false
	let ready = false
	let hover = false
	let inactive = false

	let time: number = 0
	let duration: number

	let top: number
	let left: number
	let inactiveTimeout: NodeJS.Timeout

	function togglePaused() {
    if (paused) {
			paused = false
			player.play()
		} else {
			paused = true
			player.pause()
		}
  }

	function requestToggleFullscreen() {
    if (!fullscreen) {
      element.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  function toggleFullscreen() {
    fullscreen = !fullscreen
  }

	function keydown(e) {
    if (e.key === ' ') {
      e.preventDefault()
      togglePaused()
    }
  }

	function activate() {
    clearTimeout(inactiveTimeout)
    inactiveTimeout = setTimeout(() => inactive = true, 1666)
    inactive = false
  }

	async function seek(t: number) {
		time = t

		const paused = player.getPaused()
		if (!paused) { await player.pause() }
		await player.setCurrentTime(t)
		if (!paused) { player.play() }
  }

	onMount(() => {
    document.addEventListener('fullscreenchange', toggleFullscreen, false)

    // volume = localStorage.getItem("volume") === "muted" ? 0 : 1

    return () => document.removeEventListener('fullscreenchange', toggleFullscreen)
  })

	onMount(async () => {
		if (browser) {
			//@ts-ignore
			// import('vimeo-video-element')
			const Vimeo = (await import('@vimeo/player')).default 
			
			player = new Vimeo('video') as Player

			async function loaded () {
				background ? player.play() : player.pause()
				ready = true
				duration = await player.getDuration()
			}

			player.on("loaded", loaded)
			player.on("timeupdate", (e) => {
				time = e.seconds
			})
		}
	})

	onDestroy(() => {
		if (browser && player) {
			player.destroy()
		}
	})

	function t(t: number) {
    return Math.floor(t / 60) + ":" + ("0" + (t % 60).toFixed()).slice(-2)
  }

	function format(url: string) {
		if (url.includes('player.vimeo.com')) return url;
		const split = url.replace('?share=copy', '').replace('https://vimeo.com/arketype/review', 'https://player.vimeo.com/video').replace('https://vimeo.com', 'https://player.vimeo.com/video').split('/')
		return split.filter((s, i) => i < 5).join('/') + `?h=${split[5]}`
	}
</script>

<svelte:window on:keydown={keydown} />

<figure class:half class:golden class:ready class:inactive class:fullscreen on:mousemove={activate} bind:this={element}>
  {#if browser}
  <iframe title="Video" src="{format(link)}&loop=1&background=1{background ? '&portrait=0&muted=1&playsinline=1&autoplay=1' : '&muted=0'}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen id="video"></iframe>
  {/if}

	{#if !background && player}
	<button id="video" class:hover on:pointerenter={() => hover = true} on:pointerleave={() => hover = false} on:pointermove={e => {
		top = e.offsetY
		left = e.offsetX
	}} on:click|stopPropagation={togglePaused}><span style="top: {top}px; left: {left}px">{#if paused}● Play{:else}◼︎ Pause{/if}</span></button>

	<nav class="flex flex--gapped">
		{#if duration}
		<button class="col col--2of12" on:click|stopPropagation={togglePaused} style="left: {time / duration * 100}%">{#if paused}●{:else}◼︎{/if}&nbsp;{t(time)}</button>
		<input class:hover id="time" name="time" type="range" value={time} min={0} step={0.01} max={duration}
			on:input={e => seek(Number(e.currentTarget.value))} />
		{/if}

		<button on:click|stopPropagation={() => {
			muted = !muted
			player.setMuted(muted)
		}}>Sound {#if muted}On{:else}Off{/if}</button>
		<button on:click={requestToggleFullscreen}>{#if fullscreen}Close{:else}Full Screen{/if}</button>
	</nav>
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
		margin-bottom: $gap;

		&.ready {
			opacity: 1;
		}

    &.half {
			height: 66vh;

			iframe {
				height: 66vh;
			}
    }

		&.golden {
      margin: $base 0;
			padding: 0;
			height: auto;
			aspect-ratio: 16 / 9;

			iframe {
				height: auto;
				aspect-ratio: 16 / 9;
			}
    }

		&.fullscreen {
			height: 100vh !important;

			iframe {
				height: 100vh !important;
			}
		}

		@media (max-width: $mobile) {
			margin-bottom: $gap * 2;

			&.half {
			// height: 56.25vw;
				height: 50vh;

				iframe {
					// height: 56.25vw;
					height: 50vh;
				}
			}
		}

		&.inactive {
			@media (min-width: $mobile) {
				input[type="range"],
				button#video {
					opacity: 0 !important;
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

	nav {
		position: absolute;
		top: calc(100% + ($base * 0.1));
		left: 0;
		width: 100%;
		z-index: 3;

		input[type="range"] {
			position: absolute;
			bottom: calc(100% + ($base * 1.25));
			left: $base;
			right: $base;

      width: calc(100% - ($base * 2));
      cursor: col-resize;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 2px;
      border-radius: $radius;
      background: $back-color;

			opacity: 0;
			transition: opacity 333ms;

			&.hover,
			&:hover,
			&:focus {
				opacity: 1;
			}

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: $base * 0.75;
        width: $base * 0.75;
        background-color: $back-color;
        border-radius: 50%;
        // border: 0.5px solid;
      }

			@supports (mix-blend-mode: exclusion) {
				color: white;
				mix-blend-mode: difference;
			}
    }

		button {
			&:last-child {
				margin-left: auto;
			}
		}
	}

	button#video {
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
			align-items: flex-start;
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
