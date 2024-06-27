import type { TypePageSkeleton, TypeProjectSkeleton, TypeProjectsSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const filter = url.searchParams.get("service")
  const format = url.searchParams.get("format")

  const all = await content.getEntries<TypeProjectSkeleton>({ content_type: "project", include: 2, select: ["fields.artists"], order: ["-fields.date"], limit: 200 })

  let services: {[id: string]: {
    id: string,
    sys: string,
    titre: string,
    count: number
  }} = {}

  all.items.forEach(projet => {
    projet.fields.artists?.forEach(artist => {
      if (services[artist.fields.service.fields.id]) {
        services[artist.fields.service.fields.id].count += 1
      } else {
        services[artist.fields.service.fields.id] = {
          id: artist.fields.service.fields.id,
          sys: artist.fields.service.sys.id,
          titre:artist.fields.service.fields.title,
          count: 1
        }
      }
    })
  })

  const [list, projects, pages] = await Promise.all([
    content.getEntries<TypeProjectsSkeleton>({ content_type: "projects", include: 3, limit: 1 }),
    content.getEntries<TypeProjectSkeleton>({ content_type: "project", include: 2, order: ["-fields.date"],  limit: 20, ...filter ? { links_to_entry: services[filter].sys } : {} }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "projects" }),
  ])

  return {
    service: filter && services[filter],
    format,
    projects: filter ? projects : list.items?.length ? { items: list.items[0].fields.projects } : projects,
    // services: Object.values(services).sort((a, b) => b.count - a.count),
    services: Object.values(services).sort((a, b) => b.titre < a.titre ? 1 : -1),
    page: pages.items[0]
  }
})