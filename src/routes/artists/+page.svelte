<script lang="ts">
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main>
  <nav>
    {#if data.service}
    <a href="/artists" class="button">Tous</a>
    {/if}
    {#each data.services as service}
    <a href="/artists?service={service.id}" class="button" class:active={data.service && data.service.id === service.id}>{service.titre}</a>
    {/each}
  </nav>
  <ol>
    {#each data.artists.items as artist}
    <li>
      <a href="/artists/{artist.fields.id}">
        <h2>{artist.fields.name}</h2>

        <aside>
          {artist.fields.service.fields.artist || artist.fields.service.fields.title}
        </aside>

        {#if artist.fields.thumbnail}
        <figure>
          <Media media={artist.fields.thumbnail} small ar={1} />
        </figure>
        {/if}
      </a>
    </li>
    {/each}
  </ol>
</main>

<style lang="scss">
  nav {
    padding: $base;
    display: flex;
    gap: $base;

    a {
      &.active {
        &:before {
          content: "● ";
        }
      }
    }
  }

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