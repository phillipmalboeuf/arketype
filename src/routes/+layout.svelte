<script lang="ts">
	import '../styles/styles.scss'

	import { dark } from '$lib/stores'
	import Header from '$lib/components/Header.svelte'

	import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<Header header={data.header} />

<main class:dark={$dark} class:light={$dark !== undefined && !$dark}>
	<slot />
</main>

<style>
</style>
