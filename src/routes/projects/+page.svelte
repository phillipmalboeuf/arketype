<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main>
  <nav>
    {#if data.service}
    <a href="/projects" class="button">Tous</a>
    {/if}
    {#each data.services as service}
    <a href="/projects?service={service.id}" class="button" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
    {/each}
  </nav>

  <Projects projects={data.projects} />
</main>

<style lang="scss">
  nav {
    padding: $base;
    display: flex;
    gap: $base;
  }
</style>