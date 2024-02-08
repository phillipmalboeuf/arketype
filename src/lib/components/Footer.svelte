<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  
  import Logotype from './Logotype.svelte'

  export let footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<footer>
  <figure>
    <Logotype />
  </figure>
  
  {#each footer.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
  {/each}

  <span></span>
</footer>

<style lang="scss">
  footer {
    // background-color: var(--back-color);
    padding: $base;
    margin-top: 30vh;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $base;

    figure {
      width: 100%;

      :global(svg) {
        width: 100%;
        height: 16vw;
        object-position: bottom;
      }
    }

    a {
      &:first-child {
        // text-transform: uppercase;
      }

      &.active {
        &:before {
          content: "● ";
        }
      }
    }
  }
</style>
