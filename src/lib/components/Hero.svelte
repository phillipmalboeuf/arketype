<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'

  export let item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header id={item.fields.id} class={``} class:media={false}>
  <h1>{item.fields.title}</h1>
  <!-- {#if item.fields.media}
  <figure>
    <Media media={item.fields.media} />
  </figure>
  {/if} -->

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