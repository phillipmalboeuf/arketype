<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types';
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'
  import { year } from '$lib/formatters'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
  export let tight = false
</script>

<ol class="flex flex--gapped" class:tight>
  {#each projects.items as project}
  <li class="col col--6of12 col--mobile--12of12">
    <a style={!tight && project.fields.color && `--hover: ${project.fields.color}`} href="/projects/{project.fields.id}">
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}

      <aside>
        {#if tight}
        <h5>{project.fields.title}</h5>
        {:else}
        <h2>{project.fields.title}</h2>
        {/if}

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

    figure {
      isolation: isolate;
    }

    aside {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: $base 0;

      > h5,
      > h2 {
        width: 50%;
      }
      
      > ul {
        width: 30%;
      }
    }

    a {
      text-decoration: none;
      transition: color 333ms;
      color: var(--hover);

      :global(img),
      :global(video) {
        transition: filter 333ms;
        will-change: filter;
      }

      &:hover,
      &:focus {
        color: currentColor;

        :global(img),
        :global(video) {
          filter: saturate(0);
        }
      }

      h2 {
        line-height: 1;
      }
    }

    li {
      // transition: opacity 333ms;

      // &:has(a:hover),
      // &:has(a:focus) {
      //   ~ li {
      //     opacity: 0.5;
      //   }
      // }

      // &:has(~ li > a:hover),
      // &:has(~ li > a:focus) {
      //   opacity: 0.5;
      // }
    }
  }
</style>