<script lang="ts">
  import type { TypeProjectSkeleton } from '$lib/clients/content_types'
  import type { ContentfulCollection, Entry } from 'contentful'
  import Media from './Media.svelte'
  import { year } from '$lib/formatters'

  export let projects: ContentfulCollection<Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>>
</script>

<table>
  <tr>
    <th>Project</th>
    <th>Services</th>
    <th>Client</th>
    <th>Year</th>
  </tr>
  {#each projects.items as project}
  <a href="/projects/{project.fields.id}" style={project.fields.color && `--hover: ${project.fields.color}`}>
    <td>
        <h2>{project.fields.title}</h2>
    </td>

    <td>
      {#each project.fields.artists as artist}
      {artist.fields.service.fields.title} {artist.fields.name}<br>
      {/each}
    </td>

    <td>
      {project.fields.client}
    </td>
    
    <td>
      {year(project.fields.date)}
    </td>

    <!-- <td>
      {#if project.fields.thumbnail}
      <figure>
        <Media media={project.fields.thumbnail} small />
      </figure>
      {/if}
    </td> -->
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
      display: none;
    }

    a {
      display: table-row;
      vertical-align: top;
      text-decoration: none;
      transition: color 333ms, opacity 333ms;

      &:hover,
      &:focus {
        color: var(--hover);

        ~ a {
          opacity: 0.5;
        }
      }

      &:has(~ a:hover),
      &:has(~ a:focus) {
        opacity: 0.5;
      }

      @media (max-width: $mobile) {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: $mobile_base;

        td {

          &:first-child {
            width: 100%;
            order: -2;
          }

          &:not(:first-child) {
            border-top: none;
            flex: 2;
          }

          &:nth-last-child(2) {
            flex: 1;
            order: -1;
          }

          &:nth-last-child(1) {
            flex: 1;
          }
        }
      }
    }
  }
</style>