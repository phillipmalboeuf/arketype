<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { page } from '$app/stores'

  import ColorToggle from './ColorToggle.svelte'

  export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let visible = false
</script>

<header class:visible>
  <a href="/">Arketype</a>
  <button on:click={() => visible = !visible}>{#if visible}Close{:else}Menu{/if}</button>

  <nav>

    {#each header.fields.links as link}
    <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
      on:click={() => visible = false}
      class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
    {/each}

    <a href="/fr" class="locale">FR</a>

    <ColorToggle />
  </nav>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    padding: $base;
    z-index: 88;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    background-color: var(--back-color);
    transition: background-color 333ms;

    display: flex;
    align-items: center;
    gap: $base;

    > a,
    > button {
      flex: 1;
      text-transform: uppercase;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    > button {
      justify-content: flex-end;

      @media (min-width: $mobile) {
        display: none;
      }
    }

    nav {
      flex: 7;
      display: flex;
      align-items: center;
      gap: $base * 2;

      @media (max-width: $mobile) {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 50vh;
        background-color: var(--back-color);
        transition: background-color 333ms;

        flex-direction: column;
        gap: $mobile_base * 2;
        padding-top: $mobile_base * 6;

        transform: translateY(-100%);
        transition: transform 666ms;

        :global(aside) {
          width: 100%;
          padding: $mobile_base * 0.5;
          border-top: 1px solid $grey;
          justify-content: flex-end;
        }
      }

      a {

        @media (max-width: $mobile) {
          display: block;
          width: 100%;
          padding: $mobile_base * 0.5;
          border-top: 1px solid $grey;

          &:not(.active) {
            &:before {
              display: none;
            }
          }
        }
      
        &.locale {
          margin-left: auto;
        }

        &:not(.locale) {
          &:before {
            content: "● ";
            opacity: 0;
            transition: opacity 333ms;
          }
        }

        &.active,
        &:hover,
        &:focus {
          text-decoration: none;
          &:before {
            opacity: 1 !important;
          }
        }
      }
    }

    @media (max-width: $mobile) {
      &.visible {
        nav {
          transform: translateY(0);
        }
      }
    }
  }
</style>
