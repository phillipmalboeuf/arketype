<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { color, dark } from '$lib/stores'

  export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  onMount(async () => {
		if (browser) {
      if ($dark === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark.set(true)
      }
    }
  })
</script>

<header>
  <a href="/">Arketype</a>

  {#each header.fields.links as link}
  <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}
    class:active={$page.url.pathname !== '/' && $page.url.pathname.startsWith(link.fields.path)}>{link.fields.label}</a>
  {/each}

  <a href="/fr" class="locale">FR</a>
  <button on:click={() => dark.set(!$dark)}>{#if $dark}Light{:else}Dark{/if}</button>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    background-color: var(--back-color);
    padding: $base;
    z-index: 88;

    transition: background-color 333ms;

    display: flex;
    gap: $base;

    a {
      &:first-child {
        text-transform: uppercase;
      }

      &.locale {
        margin-left: auto;
      }

      &:not(:first-child):not(.locale) {
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
</style>
