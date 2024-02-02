<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types';
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<ol>
  {#each projects.items as project}
  <li>
    <a href="/projects/{project.fields.id}">
      <h2>{project.fields.title}</h2>

      <aside>
        {#each project.fields.artists as artist}
        {artist.fields.service.fields.title} {artist.fields.name}<br>
        {/each}
      </aside>

      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}
    </a>
  </li>
  {/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    // gap: $base;

    li {
      width: 50%;
      padding: $base;
    }
  }
</style>