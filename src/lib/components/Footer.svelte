<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  
  import Logotype from './Logotype.svelte'

  export let footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let social: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let contact: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<footer class="flex">
  <figure>
    <Logotype />
  </figure>

  <a id="contact" />
  <nav class="contact col col--4of12 col--mobile--7of12 flex flex--column">
  {#each contact.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{@html link.fields.label.replaceAll('\\n', '\n')}</a>
  {/each}
  </nav>

  <nav class="social col col--4of12 col--mobile--5of12 flex flex--column">
  {#each social.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
  {/each}
  </nav>
  
  <nav class="footer col col--12of12 flex">
  {#each footer.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
  {/each}
  </nav>
</footer>

<style lang="scss">
  footer {
    position: relative;
    z-index: 87;
    background-color: var(--back-color);
    transition: background-color 333ms;

    padding: $base;
    margin-top: 30vh;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    figure {
      width: 100%;

      :global(svg) {
        width: 100%;
        height: 16vw;
        object-position: bottom;
      }
    }

    a {
      // @media (min-width: $mobile) {
      //   font-size: $base * $scale;
      // }
      transition: opacity 333ms;
      
      &:hover,
      &:focus {
        text-decoration: none;
        
        ~ a {
          @media (min-width: $mobile) { opacity: 0.333; }
        }
      }

      &:has(~ a:hover),
      &:has(~ a:focus) {
        @media (min-width: $mobile) { opacity: 0.333; }
      }
    }

    .social,
    .contact {
      // display: flex;
      // flex-direction: column;
      gap: $base * 0.25;
      margin-bottom: $base;
      margin: $base 0 $gap;

      // @media (max-width: $mobile) {
      //   width: auto;
      // }
    }

    .contact {
      a:last-child {
        margin-top: $base;
      }
    }

    .footer {
      width: 100%;
      justify-content: space-between;

      @media (max-width: $mobile) {
        font-size: $mobile_base * $mobile_scale * 0.75;
      }
    }
  }
</style>
