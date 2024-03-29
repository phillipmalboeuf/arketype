<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Shapes from '$lib/components/Shapes.svelte'
  import Table from '$lib/components/Table.svelte'

  import type { PageData } from './$types'
  export let data: PageData
  export let noContent = false
  export let noShapes = false
</script>

{#if !noShapes}
<Shapes type="work" />
{/if}

<main class="flex">
  {#if !noContent && data.page && data.format === null && data.service === null}
  <section class="content col col--12of12">
    <Content content={data.page.fields.content} />
  </section>
  {/if}

  <nav class="col col--6of12 col--mobile--12of12">
    <div class="flex">
      {#if data.service}
      <a class="col col--3of12 col--mobile--4of12" href="/projects{data.format ? `?format=${data.format}` : ''}">All Works</a>
      {:else}
      <strong class="col col--3of12 col--mobile--4of12">Filters</strong>
      {/if}
      {#each data.services as service}
      <a class="col col--2of12 col--mobile--4of12" href="/projects?service={service.id}{data.format ? `&format=${data.format}` : ''}" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
      {/each}
    </div>
  </nav>

  <nav class="col col--6of12 col--mobile--12of12">
    <div class="flex">
      <span class="col col--2of12 col--mobile--4of12"><strong>Work</strong></span>
      <a class="col col--2of12 col--mobile--4of12" href="/projects?format=images{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format === null || data.format === 'images'}>Images</a>
      <a class="col col--2of12 col--mobile--4of12" href="/projects?format=list{data.service ? `&service=${data.service.id}` : ''}" class:active={data.format && data.format === 'list'}>List</a>
    </div>
  </nav>

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
    transition: transform 333ms, background-color 333ms;

    // transform: translateY(calc(-100% - ($base * 3.25)));
    // will-change: transform;

    // :global(.up) & {
    //   transform: translateY(0%);
    // }

    padding: $base;
    // gap: $base * 2;
    border-top: 1px solid;

    margin: 6vw 0;

    @media (max-width: $mobile) {
      position: static;
    }

    strong {
      opacity: 0.3;
    }

    a {
      &:not(:first-child):before {
        content: "● ";
        opacity: 0;
        transition: opacity 333ms;
      }

      &.active,
      &:hover,
      &:focus {
        text-decoration: none;
        
        &:before {
          opacity: 1;
        }
      }
    }

    &:first-of-type {
      @media (max-width: $mobile) {
        > div { justify-content: flex-end; row-gap: $mobile_base * 0.5; }
      }
    }

    &:last-of-type {
      > div { justify-content: flex-end; }

      @media (min-width: $mobile) {
        span {
          font-size: 0;
        }
      }

      @media (max-width: $mobile) {
        order: -1;
        justify-content: flex-start;
      }
    }
  }

  .content {
    order: -2;
    margin: 6vw 0 0;

    :global(.text) {
      max-width: $base * 33;
      @media (min-width: $mobile) { margin-left: 20vw; }
    }
  }

  .projects {
    position: relative;
    z-index: 1;
    background-color: var(--back-color);
    transition: background-color 333ms;
  }
</style>