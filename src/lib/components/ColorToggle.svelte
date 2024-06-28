<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  import { color, dark } from '$lib/stores'

  let hover = false

  onMount(async () => {
		if (browser) {
      if ($dark === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark.set(true)
      }
    }
  })

  const colors = [
    '#A67FEF',
    '#FB508D',
    '#FC7A06',
    '#FFE200',
    '#30CB54',
    '#1C7AF8'
  ]

  let value = ((colors.length / 2) * 100) - 50

  function convert(col1: string, col2: string, p: number) {
    const rgb1 = parseInt(col1, 16);
    const rgb2 = parseInt(col2, 16);

    const [r1, g1, b1] = toArray(rgb1);
    const [r2, g2, b2] = toArray(rgb2);

    const q = 1-p;
    const rr = Math.round(r1 * p + r2 * q);
    const rg = Math.round(g1 * p + g2 * q);
    const rb = Math.round(b1 * p + b2 * q);

    return  Number((rr << 16) + (rg << 8) + rb).toString(16);
  }

  function toArray(rgb: number) {
    const r = rgb >> 16;
    const g = (rgb >> 8) % 256;
    const b = rgb % 256;

    return [r, g, b];
  }
</script>

<aside>
  <form class:hover on:submit|preventDefault style="--gradient: {colors.join(', ')}" on:pointerenter={() => hover = true} on:pointerleave={() => hover = false}>
    <input type="range" name="color" min="0" max="{100 * (colors.length - 1)}" bind:value on:input={e => {
      const step = Math.floor(value / 100)
      
      if (step === colors.length - 1) {
        color.set(colors[step])
      } else {
        color.set('#'+convert(colors[step + 1].replace('#', ''), colors[step].replace('#', ''), (value % 100) / 100))
      }
    }}>

    <button></button>
  </form>

  <button aria-label={$dark ? 'Light' : 'Dark'} on:click={() => dark.set(!$dark)}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z" stroke="currentColor" fill="none" />
      <path d="M6.93701 0.800781L6.93701 13.3945L11.0762 12.0937L13.3491 8.99414V6.91211L12.8408 3.58398L11.0762 1.80664L8.21289 0.806641L6.93701 0.800781Z" fill="currentColor"/>
    </svg>
  </button>
</aside>


<style lang="scss">
  aside {
    display: flex;
    gap: $base * 0.666;
  }

  form {
    position: relative;
    display: flex;
    align-items: center;

    input {
      opacity: 0;
      transition: opacity 333ms;

      width: $base * 5;
      // cursor: col-resize;
      // vertical-align: text-bottom;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 0.88em;
      border-radius: $radius;
      background: linear-gradient(0.25turn, var(--gradient));

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 1.1em;
        width: 1.1em;
        background-color: $back-color;
        border-radius: 50%;
        border: 0.5px solid;
      }

      @media (max-width: $mobile) {
        opacity: 1 !important;
        width: $base * 10;
      }
    }

    button {
      position: absolute;
      top: 50%;
      right: 0;
      
      transform: translateY(-50%);
      opacity: 1;
      transition: opacity 333ms;
      
      width: 0.88em;
      height: 0.88em;
      border-radius: $radius;
      background: linear-gradient(0.25turn, var(--gradient));

      @media (max-width: $mobile) {
        opacity: 0 !important;
      }
    }

    &.hover {
      button {
        pointer-events: none;
        opacity: 0;
      }

      input {
        opacity: 1;
      }
    }
  }
  
</style>