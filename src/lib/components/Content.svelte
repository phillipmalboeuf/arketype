<script lang="ts">
  import { isTypeHero, isTypeList, isTypeText, isTypeVimeo, type TypeArtistSkeleton, type TypeHeroSkeleton, type TypeListSkeleton, type TypeProjectSkeleton, type TypeTextSkeleton, type TypeVimeoSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Hero from './Hero.svelte'
  import List from './List.svelte'
  import Vimeo from './Vimeo.svelte'

  export let content: Entry<TypeHeroSkeleton | TypeListSkeleton | TypeTextSkeleton | TypeArtistSkeleton | TypeProjectSkeleton | TypeVimeoSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each content as item, i}
<section>
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List {item} />
  {:else if isTypeVimeo(item)}
  <Vimeo {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    padding: $base;
  }
</style>