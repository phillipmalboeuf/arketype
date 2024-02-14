<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Shapes from '$lib/components/Shapes.svelte'
  
	import type { PageData } from './$types'
  export let data: PageData
</script>

<Shapes type="page" />

<Content content={data.page.fields.content} />


