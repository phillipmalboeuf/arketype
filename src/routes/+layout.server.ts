import { PUBLIC_VITE_LOCALE } from '$env/static/public'
import type { TypeNavigationSkeleton } from '$lib/clients/content_types.js'
import { content } from '$lib/clients/contentful'

export const load = async () => {
  const [header] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "header", locale: { 'fr': 'fr-CA' }[PUBLIC_VITE_LOCALE] || 'en-CA' }),
    // content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "footer", locale: { 'en': 'en-US' }[PUBLIC_VITE_LOCALE] || 'fr-CA' }),
  ])

  return {
    header: header.items[0],
    // footer: footer.items[0],
  }
}