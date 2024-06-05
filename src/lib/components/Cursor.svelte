<script lang="ts">
  import { page } from '$app/stores'
  let hovering = false
  let hidden = false

  let x: number
  let y: number

  function isTouchDevice() {
    // @ts-ignore
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }
</script>

<svelte:document on:mousemove={(e) => {
  if (isTouchDevice()) return

  // @ts-ignore
  if (!hovering && ['BUTTON', 'A', 'VIDEO'].includes(e.target.nodeName)) {
    hovering = true

    // @ts-ignore
    if (e.target.id === "video") {
      hidden = true
    }

  // @ts-ignore
  } else if (hovering && !['BUTTON', 'A', 'VIDEO'].includes(e.target.nodeName)) {
    hovering = false
    hidden = false
  }

  x = e.clientX
  y = e.clientY
}} />

{#if x}
<figure style:left={`${x}px`} style:top={`${y}px`} class:hovering class:hidden />
{/if}


<style lang="scss">
  figure {
    position: fixed;
    z-index: 6666;
    width: $base * $scale; 
    height: $base * $scale;
    border-radius: 50%;
    background-color: black;
    transform: translate(-50%, -50%);
    transition: transform 666ms, border-radius 666ms, opacity 666ms;
    pointer-events: none;

    @supports (mix-blend-mode: exclusion) {
      background-color: white;
      mix-blend-mode: difference;
    }

    &.hovering {
      transform: translate(-50%, -50%) scale(0.88);
      // border-radius: 25%;
    }

    &.hidden {
      opacity: 0;
    }
  }
</style>