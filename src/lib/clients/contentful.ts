import contentful from 'contentful'

const preview = true
export const content = contentful.createClient({
  space: 'phq9gwoj46m7',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'PfgrwTgApu7JblvgfnqjVLw02Z07CcSLf86t8n73R2w' : 'V-jGi0WzFesOOZnpiEIQLZOaXVD-W44sxFkkq1Cq77k',
}).withoutUnresolvableLinks