<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Projects from '$lib/components/Projects.svelte'
  import Shapes from '$lib/components/Shapes.svelte'
  import Document from '$lib/components/document/index.svelte'
  import { year } from '$lib/formatters'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<Shapes type="artists" />

<section>
  <header>
    <h1 class="h1--huge">
      {#each data.artist.fields.name.split(" ") as name}
      <span>{name}</span>
      {/each}

      {#if data.artist.fields.media}
      {#each data.artist.fields.media as media, i}
      <figure>
        <Media {media} small />
      </figure>
      {/each}
      {/if}
    </h1>
  </header>

  <div class="description">
    <h2>{data.artist.fields.service.fields.artist || data.artist.fields.service.fields.title}</h2>
    
    <aside>
      <Document body={data.artist.fields.description} />
    </aside>
    <figure>
      <Media media={data.artist.fields.signature} />
    </figure>

    <nav>
      {#if data.artist.fields.links}
      {#each data.artist.fields.links as link}
      <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}>{link.fields.label}</a>
      {/each}
      {/if}
    </nav>
  </div>

  <div>
    <nav>
      <h2 style="opacity: 0.3;">Works</h2>
      <!-- <a href="/projects">See more works</a> -->
    </nav>

    {#if data.projects}
    <Projects projects={data.projects} />
    {/if}
  </div>
</section>





<style lang="scss">
  section {
    padding: $base;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    header {
      margin-top: 8vw;
    }

    h1 {
      text-transform: uppercase;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: $base * 0.5;

      font-size: 12vw;

      span {
        &:first-child {
          order: -2;
        }
      }

      figure {
        order: -1;
        height: 9vw;

        :global(img),
        :global(video) {
          height: 100%;
          width: auto;
        }
      }
    }

    div {
      margin-top: 8vw;
      padding: ($base * 0.5) 0 ($base);
      border-top: 1px solid;

      &.description {
        display: flex;
        gap: $base;

        h2,
        aside,
        figure,
        nav {
          flex: 1;
        }

        figure {
          :global(.dark) & {
            filter: invert(1);
          }

          :global(img) {
            width: auto;
          }
        }

        nav {
          display: flex;
          flex-wrap: wrap;
          gap: $base;
        }

        @media (max-width: $mobile) {
          position: relative;
          flex-wrap: wrap;
          margin-top: 50vw;
          gap: $mobile_base * 2;

          h2,
          aside,
          figure,
          nav {
            flex: none;
          }

          h2 {
            order: -2;
          }

          nav {
            flex: 1;
            justify-content: flex-end;
            order: -1;
          }

          aside {
            width: 100%;
          }

          figure {
            position: absolute;
            bottom: calc(100% + 25vw);
            width: 50vw;
            right: 0;

            :global(img) {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>