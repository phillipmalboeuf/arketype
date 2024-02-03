<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<header>
  <h1 class="h2">{data.project.fields.title}</h1>
</header>

<main>
  
</main>

{#if data.project.fields.related?.length}
<footer>
  <h3>Related projects</h3>
  <Projects projects={{ total: data.project.fields.related.length, items: data.project.fields.related, skip: 0, limit: data.project.fields.related.length }} />
</footer>
{/if}



<style lang="scss">
  header,
  main,
  footer {
    padding: $base;
  }
</style>