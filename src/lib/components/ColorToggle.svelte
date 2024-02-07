<script lang="ts">
  import { color, dark } from '$lib/stores'

  let hover = false

  const colors = [
    '#A67FEF',
    '#FB508D',
    '#FC7A06',
    '#FFE200',
    '#30CB54',
    '#1C7AF8'
  ]

  let value = 50

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

<form class:hover style="--gradient: {colors.join(', ')}" on:pointerenter={() => hover = true} on:pointerleave={() => hover = false}>
  <input type="range" name="color" min="0" max="{100 * (colors.length - 1)}" bind:value on:input={e => {
    const step = Math.floor(value / 100)

    console.log(step, value % 100, value)
    
    if (step === colors.length - 1) {
      color.set(colors[step])
    } else {
      color.set('#'+convert(colors[step + 1].replace('#', ''), colors[step].replace('#', ''), (value % 100) / 100))
    }
  }}>

  <button></button>
</form>


<style lang="scss">
  form {
    position: relative;
    display: flex;

    input {
      opacity: 0;
      transition: opacity 333ms;

      width: $base * 5;
      cursor: col-resize;
      vertical-align: text-bottom;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 0.88em;
      border-radius: $radius;
      background: linear-gradient(0.25turn, var(--gradient));
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
      background: linear-gradient(0.5turn, var(--gradient));
    }

    &.hover {
      button {
        opacity: 0;
      }

      input {
        opacity: 1;
      }
    }
  }
  
</style>