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

<footer>
  <figure>
    <Logotype />
  </figure>

  <a id="contact" />
  <nav class="contact">
  {#each contact.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{@html link.fields.label.replaceAll('\\n', '\n')}</a>
  {/each}
  </nav>

  <nav class="social">
  {#each social.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
  {/each}
  </nav>
  
  <nav class="footer">
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

    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
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
      // @media (min-width: $mobile) {
      //   font-size: $base * $scale;
      // }
      transition: opacity 333ms;
      
      &:hover,
      &:focus {
        text-decoration: none;
        
        ~ a {
          opacity: 0.333;
        }
      }

      &:has(~ a:hover),
      &:has(~ a:focus) {
        opacity: 0.333;
      }
    }

    .social,
    .contact {
      display: flex;
      flex-direction: column;
      gap: $base * 0.25;
      margin-bottom: $base;
      width: 33.3%;

      @media (max-width: $mobile) {
        width: auto;
      }
    }

    .contact {
      a:last-child {
        margin-top: $base;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @media (max-width: $mobile) {
        font-size: $mobile_base * $mobile_scale * 0.75;
      }
    }
  }
</style>
