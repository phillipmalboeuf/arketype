<script lang="ts">
	import '../styles/styles.scss'

	import { dark, color } from '$lib/stores'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	import type { LayoutData } from './$types'
	export let data: LayoutData
</script>


<div style={!!$color && `--color: ${$color}`} class:dark={$dark} class:light={$dark !== undefined && !$dark}>
	<Header header={data.header} />

	<main>
		<slot />
	</main>

	<Footer />
</div>

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
