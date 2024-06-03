<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Document from '$lib/components/document/index.svelte'
  import Media from './Media.svelte';

  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<main class="text" id={item.fields.id}>

  {#if item.fields.title}
  <h3>{item.fields.title}</h3>
  {/if}

  {#if item.fields.body}
  <section>
    <Document body={item.fields.body} />
  </section>
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: $base;

    :global(hr:not(:has(+ table))),
    :global(hr + p) {
      opacity: 0.5;
    }

    :global(hr + table) {
      margin-top: $base * -1;

      :global(td),
      :global(th) {
        border-bottom: 1px solid $grey;
      }
    }

    section {
      display: flex;
      flex-direction: column;
      gap: $base;
    }
  }
</style>