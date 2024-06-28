<script lang="ts">
  import { browser } from '$app/environment'
  import { DateTime } from 'luxon'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let time: DateTime = DateTime.fromSeconds(666666).set({ hour: 0, minute: 0 }).setZone('UTC-4').setLocale('en-US')

  onMount(() => {
		if (browser) {
      const interval = setInterval(() => {
        time = DateTime.now().setZone('UTC-4').setLocale('en-US')
      }, 1000)

      return () => clearInterval(interval)
    }
  })
</script>

<aside>
  {#if time}
  <time datetime="{time.toISO()}">{@html time.toFormat('hh:mm a z').split(' ').join('&nbsp;')}</time>
  {/if}
</aside>


<style lang="scss">
  aside {
    display: flex;

    time {
      line-height: 0.8;
    }
  }
</style>