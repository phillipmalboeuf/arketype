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
        <h3>{project.fields.title}</h3>
        {/if}

        <ul class="list--nostyle">
          {#each project.fields.artists as artist}
          <li><div><span>{artist.fields.service.fields.title}</span> <span>{artist.fields.name}</span></div></li>
          {/each}
        </ul>

        <!-- <date>{year(project.fields.date)}</date> -->
      </aside>
    </a>
  </li>
  {/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    padding: $base;

    @media (min-width: $mobile) {
      row-gap: $base * $scale * 7;
    }

    figure {
      isolation: isolate;
    }

    aside {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: $base 0;

      > h5,
      > h3 {
        width: 50%;

        @media (min-width: $mobile) {
          margin-top: -4px;
        }
      }
      
      > ul {
        width: 40%;
      }

      div {
        display: flex;

        span {
          &:first-child {
            width: 25%;
          }
        }
      }

      @media (max-width: $mobile) {
        align-items: flex-start;
        margin-top: $base * 0.25;

        > h5,
        > h3 {
          font-size: $base;
          font-weight: normal;
          line-height: $scale;
        }

        > ul {
          font-size: $base;
          width: 50%;
        }
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

      // h2 {
      //   line-height: 1;
      // }
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