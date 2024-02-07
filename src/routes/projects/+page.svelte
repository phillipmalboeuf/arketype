<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Table from '$lib/components/Table.svelte'

  import type { PageData } from './$types'
  export let data: PageData
  export let noContent = false
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
    <a href="/projects?format=images{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format === null || data.format === 'images'}>Images</a>
    <a href="/projects?format=list{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format && data.format === 'list'}>List</a>
  </nav>

  {#if !noContent && data.page && data.format === null}
  <section class="content col col--12of12">
    <Content content={data.page.fields.content} />
  </section>
  {/if}

  <section class="projects col col--12of12">
    {#if data.format === 'list'}
    <Table projects={data.projects} />
    {:else}
    <Projects projects={data.projects} />
    {/if}
  </section>
</main>

<style lang="scss">
  nav {
    position: -webkit-sticky;
    position: sticky;
    top: $base * 3.25;
    z-index: 2;
    background-color: var(--back-color);
    transition: background-color 333ms;

    padding: $base;
    display: flex;
    gap: $base;
    border-top: 1px solid;

    margin: 10vh 0;

    a {
      &.active {
        &:before {
          content: "● ";
        }
      }
    }

    &:last-of-type {
      justify-content: flex-end;
    }
  }

  .content {
    position: -webkit-sticky;
    position: sticky;
    top: $base * 3.333;
    margin-top: -15vh;
  }

  .projects {
    position: relative;
    z-index: 1;
    background-color: var(--back-color);
    transition: background-color 333ms;
  }
</style>