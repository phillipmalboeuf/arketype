<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'
  import Shapes from '$lib/components/Shapes.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<Shapes type="artists" />

<main>
  {#if data.page && data.service === null}
  <section class="content">
    <Content content={data.page.fields.content} />
  </section>
  {/if}

  <nav>
    {#if data.service}
    <a href="/artists">Tous</a>
    {:else}
    <strong>Filters</strong>
    {/if}
    {#each data.services as service}
    <a href="/artists?service={service.id}" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
    {/each}
  </nav>
  <ol>
    {#each data.artists.items as artist}
    <li>
      <a href="/artists/{artist.fields.id}">
        <h2 class="h1">{artist.fields.name}</h2>

        {#if artist.fields.thumbnail}
        <figure>
          <Media media={artist.fields.thumbnail} small ar={0.666} />
        </figure>
        {/if}

        <aside>
          {artist.fields.service.fields.artist || artist.fields.service.fields.title}
        </aside>
      </a>
    </li>
    {/each}
  </ol>
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
    gap: $base * 2;
    border-top: 1px solid;
    margin: 6vw 0;

    @media (max-width: $mobile) {
      position: static;
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

    @media (min-width: $mobile) {
      &:first-of-type {
        
        > a:first-child,
        > strong:first-child {
          width: 11.25%;
        }
      }
    }
  }

  .content {
    margin: 6vw 0 0;

    :global(.text) {
      max-width: $base * 33;
      @media (min-width: $mobile) { margin-left: 20vw; }
    }
  }

  ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    // gap: $base;

    li {
      a {
        display: flex;
        gap: 0;
        transition: gap 333ms;
        will-change: gap;

        &:hover,
        &:focus {
          text-decoration: none;
        }

        @media (min-width: $mobile) {
          h2 {
            text-transform: uppercase;
            font-size: 7vw;
          }

          figure {
            width: 0vw;
            transition: width 333ms;
            will-change: width;

            :global(img),
            :global(video) {
              aspect-ratio: none;
              height: 100%;
            }
          }

          &:hover,
          &:focus {
            gap: $base * 0.5;

            figure {
              width: 9vw;
            }
          }
        }
      }

      &:nth-child(2n - 1) {
        a {
          figure {
            order: -1;
          }
        }
      }

      transition: opacity 333ms;

      &:has(a:hover),
      &:has(a:focus) {
        ~ li {
          opacity: 0.333;
        }
      }

      &:has(~ li > a:hover),
      &:has(~ li > a:focus) {
        opacity: 0.333;
      }

      @media (max-width: $mobile) {
        figure {
          display: none;
        }

        a {
          flex-direction: column;
          gap: $mobile_base * 4;
          padding: ($mobile_base * 0.5) 0;
          border-top: 1px solid;
        }
      }
    }
  }
</style>