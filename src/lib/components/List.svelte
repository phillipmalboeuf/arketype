<script lang="ts">
  import { isTypeService, isTypeText, type TypeListSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  
  import Media from './Media.svelte'
  import Text from './Text.svelte'
  import Document from './document/index.svelte'
  // import Slider from './Slider.svelte';

  export let item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main id={item.fields.id}>
  {#if item.fields.title}
  <h2>{item.fields.title}</h2>
  {/if}

  <ol>
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
    display: flex;
    gap: $base;

    ol {
      list-style: none;
      padding-left: 0;
    }
  }
</style>