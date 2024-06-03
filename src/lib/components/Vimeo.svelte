<script lang="ts">
  import type Player from '@vimeo/player'
  import Video from './Video.svelte'
  import type { Entry } from 'contentful'
  import type { TypeVimeoSkeleton } from '$lib/clients/content_types'

  export let item: Entry<TypeVimeoSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let home: boolean = false

  let innerHeight: number

	let muted = true
  let paused = false
	let player: Player
</script>

<svelte:window bind:innerHeight />

<header class:home>
  {#if home}
	<button class="scroll" on:click={() => {
		window.scrollTo({ top: innerHeight, behavior: 'smooth' })
	}}>
		<!-- <Logotype /> -->
	</button>
  {/if}
	<Video background bind:player={player} link={item.fields.vimeoLink} />

  <nav class="flex" class:home>
    {#if home}
		<a class="col col--3of12 col--mobile--4of12" href="/">Arketype</a>
    {:else}
    <button class="col col--4of12 col--mobile--6of12" on:click={() => {
			paused ? player.play() : player.pause()
      paused = !paused
		}}>{#if paused}Play{:else}Pause{/if}</button>
    {/if}
		<button class="col col--4of12 col--mobile--6of12" on:click={() => {
			muted = !muted
			player.setMuted(muted)
		}}>Sound {#if muted}On{:else}Off{/if}</button>

		<!-- <ColorToggle /> -->
	</nav>
</header>

<style lang="scss">
  header {
		// cursor: pointer;
		position: relative;
		z-index: 99;
		// margin-top: $base * -4;
		margin-bottom: 0;
		height: 100vh;
		background-color: $front-color;
		transition: background-color 333ms;

    &:not(.home) {
      padding: $base;
    }

		// &:not(.data) {
		// 	margin-bottom: 100vh;
		// }

		nav {
      position: absolute;
      z-index: 40;

      left: 0;
      bottom: 0;

      &.home {
        bottom: auto;
        top: 0;
        z-index: 40;
      }

      &:not(.home) {
        @media (min-width: $mobile) {
          font-size: $base * $scale * 2;
        }
      }
			
			// display: flex;
			align-items: center;
			// gap: $base;
			padding: $base;
			width: 50%;
			color: $back-color;

			@media (max-width: $mobile) {
				width: 100%;
			}

			> :global(figure) {
				background-color: $front-color;
			}

			> a {
				text-transform: uppercase;
				// flex: 1;
			}

			> button {
				display: inline;
				text-align: left;
				// flex: 7;
				
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