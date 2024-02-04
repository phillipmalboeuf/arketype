<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Video from '$lib/components/Video.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<header>
  <figure>
    <Video half />
  </figure>
  <h1 class="h1--huge">{#each data.project.fields.title.split(' ') as t}<span>{t}</span>{/each}</h1>
</header>

<main>
  <div>
    {#if data.project.fields.client}
    <h3>Client {data.project.fields.client}</h3>
    {/if}
  </div>
  <div>
    {#each data.project.fields.artists as artist}
    <h3><a href="/artists/{artist.fields.id}">{artist.fields.service.fields.artist || artist.fields.service.fields.title} {artist.fields.name}</a></h3>
    {/each}
  </div>

  <div>
    {year(data.project.fields.date)}
    <Document body={data.project.fields.description} />
  </div>
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

  header {
    h1 {
      text-transform: uppercase;
      // text-align: center;
      line-height: 1;
      
      display: flex;
      flex-direction: column;
      align-items: center;

      > span:nth-child(2n) {
        align-self: flex-start;
      }
    }
  }
</style>