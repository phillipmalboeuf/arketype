<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types';
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<ol class="flex flex--gapped">
  {#each projects.items as project}
  <li class="col col--6of12">
    <a href="/projects/{project.fields.id}">
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}

      <h2>{project.fields.title}</h2>

      <aside>
        {#each project.fields.artists as artist}
        {artist.fields.service.fields.title} {artist.fields.name}<br>
        {/each}
      </aside>
    </a>
  </li>
  {/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    padding: $base;
  }
</style>