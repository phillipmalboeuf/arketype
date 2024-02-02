<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>


<section>
  <header>
    <h1 class="h2">{data.project.fields.title}</h1>
  </header>
</section>



<style lang="scss">
  section {
   padding: $base;
  }
</style>