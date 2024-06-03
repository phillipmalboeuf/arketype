<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'

  export let item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header id={item.fields.id} class:small={item.fields.title.length > 40} class:media={false}>
  {#if !item.fields.media}
  <h1>{item.fields.title}</h1>
  {:else}
  <h1 class="gallery">
  {#each item.fields.title.split(" ") as t}
  <span>{t}</span>
  {/each}

  {#each item.fields.media as media, i}
  <figure>
    <Media {media} small />
  </figure>
  {/each}
  </h1>
  {/if}

  <!-- <footer>
    <a href="#introduction"><Icon /></a>
  </footer> -->
</header>

<style lang="scss">
  header {
    // display: flex;
    // gap: $base;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // min-height: 66vh;
    // text-align: center;

    h1 {
      font-size: 16vw;
      text-transform: uppercase;
      line-height: 1;
      text-align: justify;
      text-align-last: center;

      &.gallery {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        gap: $base * 0.5;

        font-size: 12vw;

        span {
          order: -2;
          &:nth-child(n + 3) {
            order: 1;
          }
        }

        figure {
          order: -1;
          height: 9vw;

          :global(img),
          :global(video) {
            height: 100%;
            width: auto;
          }
        }
      }
    }

    &.small {
      h1 {
        font-size: 8vw;

        &.gallery {
          figure {
            height: 7vw;
          }
        }
      }

      
    }

    // &.media {
    //   position: relative;
    //   color: $white;

    //   :global(img),
    //   :global(video) {
    //     background-color: $green-darker;
    //     position: absolute;
    //     z-index: -1;
    //     top: $base * -1;
    //     left: ($base * -2) - 1px;
    //     width: calc(100% + ($base * 4) + 2px);
    //     height: calc(100% + ($base * 2));
    //   }
    // }
  }
</style>