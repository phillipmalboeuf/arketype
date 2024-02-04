<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types';
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'
  import { year } from '$lib/formatters'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<ol class="flex flex--gapped">
  {#each projects.items as project}
  <li class="col col--6of12">
    <a style={project.fields.color && `--hover: ${project.fields.color}`} href="/projects/{project.fields.id}">
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}

      <aside>
        <h2>{project.fields.title}</h2>

        <ul class="list--nostyle">
          {#each project.fields.artists as artist}
          <li>{artist.fields.service.fields.title} {artist.fields.name}</li>
          {/each}
        </ul>

        <date>{year(project.fields.date)}</date>
      </aside>
    </a>
  </li>
  {/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    padding: $base;

    aside {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    a {
      text-decoration: none;
      transition: color 333ms;

      &:hover,
      &:focus {
        color: var(--hover);
      }
    }

    li {
      transition: opacity 333ms;

      &:has(a:hover),
      &:has(a:focus) {
        ~ li {
          opacity: 0.5;
        }
      }

      &:has(~ li > a:hover),
      &:has(~ li > a:focus) {
        opacity: 0.5;
      }
    }
  }
</style>