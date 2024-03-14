// import { error } from '@sveltejs/kit'

// import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'
import { load as projectsLoad } from './projects/+page.server'

export const load = (async (r) => {
  const [page] = await Promise.all([
    {
      fields: {
        id: 'home',
        title: 'Arketype',
        description: 'Arketype is a post-production boutique that lives and breathes the craft of our artists. We fuse creativity and technique to amplify the extraordinary in your story.'
      }
    }
    // content.getEntry<TypePageSkeleton>('2AOPCu0AzgqwVGax55V4a4', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    // contentful.getEntry<Page>('1mriyecFg4Yu8vtPwuNnCh', { include: 3, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    // contentful.getEntries<Film>({ content_type: 'film', 'fields.director[exists]': true, 'fields.tags': 'recent', order: ['-fields.publishedDate'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  const projects = await projectsLoad({
    ...r,
    route: {
      ...r.route,
      id: '/projects'
    }
  })

  return {
    page,
    projects
  }
})