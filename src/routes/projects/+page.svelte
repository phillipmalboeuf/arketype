<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Table from '$lib/components/Table.svelte';

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main class="flex">
  <nav class="col col--6of12">
    {#if data.service}
    <a href="/projects{data.format ? `?format=${data.format}` : ''}">Tous</a>
    {/if}
    {#each data.services as service}
    <a href="/projects?service={service.id}{data.format ? `&format=${data.format}` : ''}" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
    {/each}
  </nav>

  <nav class="col col--6of12">
    <a href="/projects?format=images{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format && data.format === 'images'}>Images</a>
    <a href="/projects?format=list{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format && data.format === 'list'}>List</a>
  </nav>

  {#if data.format === 'list'}
  <Table projects={data.projects} />
  {:else}
  <Projects projects={data.projects} />
  {/if}
</main>

<style lang="scss">
  nav {
    padding: $base;
    display: flex;
    gap: $base;

    a {
      &.active {
        &:before {
          content: "● ";
        }
      }
    }
  }
</style>