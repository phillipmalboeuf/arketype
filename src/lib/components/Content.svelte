<script lang="ts">
  import { isTypeHero, isTypeList, isTypeText, type TypeArtistSkeleton, type TypeHeroSkeleton, type TypeListSkeleton, type TypeProjectSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Hero from './Hero.svelte'
  import List from './List.svelte'

  export let content: Entry<TypeHeroSkeleton | TypeListSkeleton | TypeTextSkeleton | TypeArtistSkeleton | TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each content as item, i}
<section>
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    padding: $base;
  }
</style>