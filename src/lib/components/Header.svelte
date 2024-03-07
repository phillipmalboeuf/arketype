<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { page } from '$app/stores'

  import ColorToggle from './ColorToggle.svelte'

  export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let visible = false
</script>

<header class="mobile">
  <a class="logo" href="/">Arketype</a>
  <button on:click={() => visible = !visible}>{#if visible}Close{:else}Menu{/if}</button>
</header>

<header class:visible class="flex">
  <div class="col col--6of12 col--mobile--12of12">
    <nav class="flex main">
      <a class="col col--2of12 logo" href="/">Arketype</a>

      {#each header.fields.links as link}
      <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
        on:click={() => visible = false}
        class="col col--2of12"
        class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
      {/each}
    </nav>
  </div>

  <div class="col col--6of12 col--mobile--12of12">
    <nav class="flex flex--end secondary">
      <a class="col col--2of12 col--mobile--6of12 locale" href="/fr">FR</a>

      <div class="col col--2of12 col--mobile--6of12">
        <ColorToggle />
      </div>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    // padding: $base;
    z-index: 88;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    background-color: var(--back-color);
    transition: transform 333ms, background-color 333ms;

    // transform: translateY(-100%);
    // will-change: transform;

    // :global(.up) & {
    //   transform: translateY(0%);
    // }

    > button {
      justify-content: flex-end;

      @media (min-width: $mobile) {
        display: none;
      }
    }

    .logo {
      text-transform: uppercase;
    }

    .flex {
      align-items: center;
    }

    > div {
      padding: $base;
    }

    nav {

      a {

        &:not(.logo) {
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
  }

  header.mobile {
    display: flex;
    justify-content: space-between;
    padding: $mobile_base;

    @media (min-width: $mobile) {
      display: none;
    }

    @media (max-width: $mobile) {
      + header {
        position: fixed;
        z-index: 86;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 50vh;
        background-color: var(--back-color);
        transition: background-color 333ms;

        padding: ($mobile_base * 6) 0 ($mobile_base * 0.5);

        transform: translateY(-100%);
        transition: transform 666ms;

        > div {
          padding: 0;
        }

        .main {
          flex-direction: column;
          gap: $mobile_base * 2;

          a {
            display: block;
            width: 100%;
            padding: $mobile_base;
            border-top: 1px solid $grey;

            &:not(.active) {
              &:before {
                display: none;
              }
            }
          }
        }

        .secondary {
          margin-top: $mobile_base * 6;
          padding: ($mobile_base * 0.5);
          border-top: 1px solid $grey;
        }

        // :global(aside) {
        //   width: 100%;
        //   padding: $mobile_base * 0.5;
        //   border-top: 1px solid $grey;
        //   justify-content: flex-end;
        // }

        &.visible {
          transform: translateY(0);
        }
      }
    }
  }
</style>
