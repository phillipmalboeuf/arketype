<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  
  export let data: PageData
</script>


<section>
  <header>
    <h1 class="h2">{data.artist.fields.name}</h1>
  </header>
</section>

{#if data.projects}
<Projects projects={data.projects} />
{/if}



<style lang="scss">
  section {
    padding: $base;
  }
</style>