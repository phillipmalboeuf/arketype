<script lang="ts">
  import type { Entry } from 'contentful'
  import { isTypeLink, type TypeNavigationSkeleton } from '$lib/clients/content_types'
	
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { color, dark } from '$lib/stores'

  import ColorToggle from './ColorToggle.svelte'

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

  <ColorToggle />

  <button aria-label={$dark ? 'Light' : 'Dark'} on:click={() => dark.set(!$dark)}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z" stroke="currentColor" fill="none" />
      <path d="M6.93701 0.800781L6.93701 13.3945L11.0762 12.0937L13.3491 8.99414V6.91211L12.8408 3.58398L11.0762 1.80664L8.21289 0.806641L6.93701 0.800781Z" fill="currentColor"/>
    </svg>
  </button>
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
    align-items: center;
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
