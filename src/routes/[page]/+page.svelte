<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  
	import type { PageData } from './$types'
  export let data: PageData
</script>

<Content content={data.page.fields.content} />

<style lang="scss">
</style>
