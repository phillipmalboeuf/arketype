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

  <div class="description flex flex--gapped">
    <h3 class="col col--3of12 col--mobile--6of12">{data.artist.fields.service.fields.artist || data.artist.fields.service.fields.title}</h3>
    
    <aside class="col col--3of12 col--mobile--12of12">
      <Document body={data.artist.fields.description} />
    </aside>
    <figure class="col col--4of12">
      <Media media={data.artist.fields.signature} />
    </figure>

    <nav class="col col--2of12 col--mobile--6of12">
      {#if data.artist.fields.links}
      {#each data.artist.fields.links as link}
      <a href={link.fields.path} {...link.fields.external && { rel: "external", target: "_blank" }}>{link.fields.label}</a>
      {/each}
      {/if}
    </nav>
  </div>

  <div class="works">
    <nav>
      <h3>Works</h3>
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

    :global(ol) {
      padding: $base 0 !important;
    }

    header {
      margin-top: 8vw;
    }

    h1 {
      text-transform: uppercase;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      column-gap: 1vw;
      row-gap: $base * 0.5;

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

      @media (max-width: $mobile) {
        // display: block;
        font-size: $mobile_base * $mobile_scale * 3;
        font-weight: bold;
        row-gap: $base * 0.25;

        figure {
          display: block;
          width: 100%;
          height: auto;
          margin: $mobile_base 0;

          :global(img),
          :global(video) {
            width: 100%;
            height: auto;
          }

          &:not(:first-of-type) {
            display: none;
          }

          &:first-of-type {
            // margin-bottom: $mobile_base * -2;
          }
        }
      }
    }

    div {
      margin-top: 8vw;
      padding: ($base * 0.5) 0 ($base);
      border-top: 1px solid;

      &.description {
        // display: flex;
        // gap: $base;

        // h3,
        // nav {
        //   flex: 1;
        // }

        // aside,
        // figure {
        //   flex: 2;
        // }

        figure {
          :global(.dark) & {
            filter: invert(1);
          }

          :global(img) {
            width: auto;

            @media (min-width: $mobile) {
              max-width: 16vw;
            }
          }
        }

        nav {
          display: flex;
          flex-wrap: wrap;
          gap: $base;
        }

        @media (max-width: $mobile) {
          position: relative;
          // flex-wrap: wrap;
          margin-top: 50vw;
          // gap: $mobile_base * 2;

          // h3,
          // aside,
          // figure,
          // nav {
          //   flex: none;
          // }

          h3 {
            order: -2;
          }

          nav {
            // flex: 1;
            justify-content: flex-end;
            order: -1;
          }

          aside {
            // width: 100%;
            margin-top: $mobile_gap * 2;
          }

          figure {
            position: absolute;
            bottom: calc(100% + 15vw);
            width: 50vw;
            right: 0;

            :global(img) {
              width: 100%;
            }
          }
        }
      }

      &.works {
        border-top: 1px solid $grey;

        h3 {
          color: $grey;
        }
      }
    }
  }
</style>