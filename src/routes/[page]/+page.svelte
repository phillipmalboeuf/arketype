<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Letters from '$lib/components/Letters.svelte'
  
	import type { PageData } from './$types'
  export let data: PageData
</script>

{#if data.page.fields.id === "about"}
<figure>
  <Letters />
</figure>
{/if}

<Content content={data.page.fields.content} />

<style lang="scss">
  figure {
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: ($base * 1);
    pointer-events: none;

    @supports (mix-blend-mode: exclusion) {
			color: white;
			mix-blend-mode: exclusion;
		}

    :global(svg) {
      width: 100%;
      height: auto;
    }
  }
</style>
