<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types'
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'
  import { year } from '$lib/formatters'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<table>
  <!-- <tr>
    <th>Project</th>
    <th>Services</th>
    <th>Client</th>
    <th>Year</th>
  </tr> -->
  {#each projects.items as project}
  <a href="/projects/{project.fields.id}" style={project.fields.color && `--hover: ${project.fields.color}`}>
    <td>
      <h2>{project.fields.title}</h2>
    </td>

    <td class="artists">
      {#each project.fields.artists as artist}
      <div><span>{artist.fields.service.fields.title}</span> <span>{artist.fields.name}</span></div>
      {/each}
    </td>

    <td class="client">
      {project.fields.client}
    </td>
    
    <!-- <td>
      {year(project.fields.date)}
    </td> -->

    <td>
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small ar={10/16} />
      </figure>
      {/if}
    </td>
  </a>
  {/each}
</table>

<style lang="scss">
  table {
    width: 100%;
    padding: $base;

    @media (max-width: $mobile) {
      padding: $mobile_base 0;

      th {
        display: none;
      }
    }

    figure {
      width: 10vw;
      opacity: 0;
      transition: opacity 333ms;
    }

    a {
      display: table-row;
      vertical-align: top;
      text-decoration: none;
      transition: color 333ms, opacity 333ms;

      &:hover,
      &:focus {
        color: var(--hover);

        figure {
          opacity: 1;
        }

        ~ a {
          opacity: 0.5;
        }
      }

      &:has(~ a:hover),
      &:has(~ a:focus) {
        opacity: 0.5;
      }

      @media (min-width: $mobile) {
        h2 {
          margin-top: $base * -0.5;
        }
        
        &:first-child {
          td {
            border-top: 1px solid;
          }
        }

        .artists {
          width: 20%;

          > div {
            display: flex;

            span {
              &:first-child {
                width: 25%;
              }
            }
          }
        }

        .client {
          width: 20%;
        }
      }

      @media (max-width: $mobile) {
        display: flex;
        flex-wrap: wrap;
        padding: 0 ($mobile_base * 0.5) ($mobile_base * 0.5);

        position: relative;

        &:after {
          content: "+";
          position: absolute;
          bottom: $mobile_base;
          right: $mobile_base * 0.5;
          font-size: $mobile_base * $mobile_scale;
        }

        color: var(--hover);

        td {

          &:first-child {
            width: 100%;
            height: 15vh;
            order: -2;
            border-bottom: none;
          }

          &:not(:first-child) {
            border-top: none;
            flex: 2;
          }

          &:nth-last-child(3) {
            flex: 1;
            order: -1;
          }

          &:nth-last-child(2) {
            flex: 1;
          }

          &:nth-last-child(1) {
            display: none;
          }
        }
      }
    }
  }
</style>