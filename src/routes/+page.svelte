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
  import Shapes from '$lib/components/Shapes.svelte'

	import type { PageData } from './$types'
  import Vimeo from '$lib/components/Vimeo.svelte';
  export let data: PageData

	let href: string
	let hidden = false
	let innerHeight: number

	const projects = async () => {
		if (href) return

		href = '/projects'
		replaceState(href, {})
		// data = await preloadData(href)
	}
</script>

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

<Shapes type="work" />

{#if !hidden && data.vimeo}
<Vimeo item={data.vimeo} />
{/if}

<Header header={$page.data.header} />

{#if data?.projects}
<ProjectsPage data={{
	...data,
	...data.projects
}} noShapes />
{/if}


<style lang="scss">
	
</style>
