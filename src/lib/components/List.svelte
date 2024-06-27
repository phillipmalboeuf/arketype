<script lang="ts">
  import { isTypeService, isTypeText, type TypeListSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'
  import Text from './Text.svelte'
  import Document from './document/index.svelte'
  // import Slider from './Slider.svelte';

  export let item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id} class:half={item.fields.id === 'clients'}>
  <ol>
    {#if item.fields.title}
    <li><h3>{item.fields.title}</h3></li>
    {/if}

    {#each item.fields.items as i}
    <li>
      {#if isTypeText(i)}
      <Text item={i} />
      {/if}
    </li>
    {/each}
  </ol>
</main>

<style lang="scss">
  main {
    margin-top: 5vw;
    // display: flex;
    // gap: $base;

    ol {
      list-style: none;
      padding-left: 0;

      display: flex;
      gap: $base;
      width: 100%;

      @media (max-width: $mobile) {
        flex-wrap: wrap;
      }

      li {
        flex: 1;
        padding: ($base*0.5) 0;
        border-top: 1px solid;

        @media (max-width: $mobile) {
          flex: none;
          width: 100%;

          &:not(:first-child) {
            border-top: none;
          }
        }
      }
    }

    &.half {
      @media (max-width: $mobile) {
        li:not(:first-child) {
          $width: (100% / 2);
          $adjust: calc(#{$base} / #{2});
          width: calc(#{$width} - #{$base} + #{$adjust});
        }
      }
    }
  }
</style>