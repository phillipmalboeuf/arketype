import type { TypeArtistSkeleton, TypePageSkeleton, TypeProjectSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const filter = url.searchParams.get("service")

  const all = await content.getEntries<TypeArtistSkeleton>({ content_type: "artist", include: 1, select: ["fields.service"], limit: 200 })

  let services: {[id: string]: {
    id: string,
    sys: string,
    titre: string,
    count: number
  }} = {}

  all.items.forEach(artist => {
    if (services[artist.fields.service.fields.id]) {
      services[artist.fields.service.fields.id].count += 1
    } else {
      services[artist.fields.service.fields.id] = {
        id: artist.fields.service.fields.id,
        sys: artist.fields.service.sys.id,
        titre: artist.fields.service.fields.title,
        count: 1
      }
    }
  })

  const [artists, pages] = await Promise.all([
    content.getEntries<TypeArtistSkeleton>({ content_type: "artist", include: 2, order: ["fields.name"],  limit: 12, ...filter ? { links_to_entry: services[filter].sys } : {} }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "artists" }),
  ])

  return {
    service: filter && services[filter],
    artists,
    // services: Object.values(services).sort((a, b) => b.count - a.count),
    services: Object.values(services).sort((a, b) => b.titre < a.titre ? 1 : -1),
    page: pages.items[0]
  }
})