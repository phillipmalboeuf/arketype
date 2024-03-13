<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Video from '$lib/components/Video.svelte'
  import Shapes from '$lib/components/Shapes.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'
  import { onDestroy } from 'svelte'

  import type { PageData } from './$types' 
  import { color } from '$lib/stores'
  export let data: PageData

  $: data.project.fields.color && color.set(data.project.fields.color)

  onDestroy(() => {
    color.set(undefined)
  })
</script>

<svelte:head>
	<title>{data.project.fields.title} – Arketype</title>
	<meta name="description" content="Arketype pour {data.project.fields.client}" />
</svelte:head>

<Shapes type="work" />

<header>
  <figure>
    {#if data.project.fields.vimeo}
    <Video half link={data.project.fields.vimeo} />
    {/if}
  </figure>
  <h1 class="h1--huge">{#each data.project.fields.title.split(' ') as t}<span>{t}</span>{/each}</h1>
</header>

<main class="flex flex--gapped">
  <div class="col col--6of12 col--mobile--12of12 flex flex--gapped">
    <div class="col col--3of12">Credits</div>
    {#if data.project.fields.client}
    <h3 class="col col--9of12">{data.project.fields.client}</h3>
    {/if}
  </div>
  <div class="col col--6of12 col--mobile--12of12 artists">
    {#each data.project.fields.artists as artist}
    <h3>{artist.fields.name} <small>{artist.fields.service.fields.artist || artist.fields.service.fields.title}</small></h3>
    {/each}
  </div>

  <div class="col col--6of12 flex flex--gapped description">
    <!-- <div class="col col--3of12">{year(data.project.fields.date)}</div> -->
    {#if data.project.fields.description?.content}
    <div class="col col--9of12 col--mobile--12of12"><Document body={data.project.fields.description} /></div>
    {/if}
  </div>

  {#if data.project.fields.media}
  {#each data.project.fields.media as media, i}
  <div class="col col--6of12 media media--{i}">
    <Media {media} small />
  </div>
  {/each}
  {/if}
</main>

{#if data.project.fields.related?.length}
<footer>
  <nav>
    <h3>From the same artist</h3>
    <a href="/projects">See more works</a>
  </nav>
  <Projects tight projects={{ total: data.project.fields.related.length, items: data.project.fields.related, skip: 0, limit: data.project.fields.related.length }} />
</footer>
{/if}



<style lang="scss">
  header,
  main{
    padding: $base;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }
  }

  header {
    figure {
      background-color: black;
    }

    h1 {
      text-transform: uppercase;
      // text-align: center;
      // line-height: 1;
      
      display: flex;
      flex-direction: column;
      align-items: center;

      > span:nth-child(2n) {
        align-self: flex-start;
      }
    }
  }

  main {

    > div {
      border-top: 1px solid;
      padding: ($base * 0.5) 0 ($base * 4);

      &:not(.flex) {
        display: flex;
        flex-direction: column;
      }
      

      &.artists {
        a {
          transition: opacity 333ms;

          &:hover,
          &:focus {
            text-decoration: none;
            
            ~ a {
              opacity: 0.333;
            }
          }

          &:has(~ a:hover),
          &:has(~ a:focus) {
            opacity: 0.333;
          }
        }

        small {
          font-size: $base;
          display: inline-block;
          margin-top: $base * 0.5;
          vertical-align: top;
        }
      }

      &.description {
        gap: $base;

        @media (max-width: $mobile) {
          width: 100%;
        }
      }

      &.media {
        border-top: none;
        padding-top: 0;
        padding-bottom: $base * 0.5;

        &.media--1 {
          width: 100%;
        }
      }
    }
  }

  footer {
    margin-top: 10vw;

    nav {
      padding: ($base * 0.5) $base ($base);
      border-top: 1px solid;

      display: flex;
      justify-content: space-between;
    }

    @media (max-width: $mobile) {
      :global(ol) {
        padding: $base 0;
      }
    }
  }
</style>