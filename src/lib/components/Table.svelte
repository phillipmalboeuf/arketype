<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types'
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'
  import { year } from '$lib/formatters'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<table>
  {#each projects.items as project}
  <tr>
    <td>
      <a href="/projects/{project.fields.id}">
        <h2>{project.fields.title}</h2>
      </a>
    </td>

    <td>
      {#each project.fields.artists as artist}
      {artist.fields.service.fields.title} {artist.fields.name}<br>
      {/each}
    </td>

    <td>
      {project.fields.client}
    </td>
    
    <td>
      {year(project.fields.date)}
    </td>

    <td>
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}
    </td>
  </tr>
  {/each}
</table>

<style lang="scss">
  table {
    width: 100%;
    padding: $base;

    figure {
      display: none;
    }
  }
</style>