<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  // export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<footer>
  <a href="/">Arketype</a>
</footer>

<style lang="scss">
  footer {
    // background-color: var(--back-color);
    padding: $base;

    display: flex;
    gap: $base;

    a {
      &:first-child {
        text-transform: uppercase;
      }

      &.active {
        &:before {
          content: "● ";
        }
      }
    }
  }
</style>
