import type { TypeArtistSkeleton, TypeProjectSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [artist] = await Promise.all([
    content.getEntries<TypeArtistSkeleton>({ content_type: "artist", include: 2, "fields.id": params.id, limit: 1 }),
  ])

  const projects = await content.getEntries<TypeProjectSkeleton>({ content_type: "project", include: 1, order: ["-fields.date"],  limit: 12, links_to_entry: artist.items[0].sys.id })

  return {
    artist: artist.items[0],
    projects,
  }
})