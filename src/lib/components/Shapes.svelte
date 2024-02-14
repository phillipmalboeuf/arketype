<script lang="ts">
  import { onMount } from 'svelte';

  export let type: "work" | "artists" | "page"

  let scrollY: number = 0
  let scrollHeight: number

  onMount(() => {
    scrollHeight = document.documentElement.getBoundingClientRect().height - (window.innerHeight * 1.333)
  })
</script>

<svelte:window bind:scrollY />


{#if type === "work"}
<figure class="work">
  <svg viewBox="0 0 1582 758" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (0)};" d="M1.52588e-05 464.758H69.653L69.653 313.001H1.52588e-05L1.52588e-05 464.758Z" />
  <g style="opacity: {(scrollY / (scrollHeight / 3)) - (1)};">
  <path d="M1441.23 693.159V757.877C1478.25 756.876 1513.48 741.724 1539.66 715.538C1565.85 689.352 1581 654.124 1582 617.105H1517.24C1516.27 636.956 1507.95 655.736 1493.9 669.793C1479.85 683.851 1461.08 692.179 1441.23 693.159Z" />
  <path d="M1517.28 609.262H1582C1581 572.243 1565.84 537.016 1539.66 510.83C1513.47 484.644 1478.25 469.491 1441.23 468.49V533.254C1461.08 534.222 1479.86 542.54 1493.91 556.588C1507.97 570.637 1516.3 589.413 1517.28 609.262Z" />
  </g>
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (2)};" d="M220.753 -0.000183105L151.616 -0.000183105C152.685 39.5463 168.873 77.1786 196.846 105.152C224.82 133.126 262.453 149.313 301.999 150.383V81.1968C280.793 80.1625 260.73 71.2768 245.713 56.2684C230.696 41.26 221.799 21.2021 220.753 -0.00318909" />
  </svg>
</figure>
{:else if type === "artists"}
<figure class="artists">
  <svg width="1401" height="1006" viewBox="0 0 1401 1006" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (1)};" d="M0 -0.000656128L0 69.6523L151.757 69.6523V-0.000656128L0 -0.000656128Z"/>
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (0)};" d="M1401 927.214V860.467C1362.82 861.498 1326.49 877.126 1299.48 904.134C1272.47 931.142 1256.84 967.475 1255.81 1005.66H1322.61C1323.61 985.183 1332.19 965.813 1346.68 951.315C1361.17 936.817 1380.53 928.227 1401 927.216"/>
  </svg>
</figure>
{:else if type === "page"}
<figure class="page">
  <svg width="1640" height="996" viewBox="0 0 1640 996" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g style="opacity: {(scrollY / (scrollHeight / 3)) - (2)};">
  <path d="M1023.66 224.671V289.389C1060.68 288.388 1095.9 273.236 1122.09 247.05C1148.27 220.863 1163.43 185.636 1164.43 148.617H1099.66C1098.7 168.467 1090.38 187.248 1076.33 201.305C1062.28 215.362 1043.51 223.691 1023.66 224.671Z"/>
  <path d="M1099.71 140.772H1164.43C1163.42 103.753 1148.27 68.5259 1122.09 42.3399C1095.9 16.1539 1060.67 1.0012 1023.65 0V64.764C1043.5 65.7321 1062.28 74.0495 1076.34 88.0982C1090.4 102.147 1098.73 120.922 1099.71 140.772Z"/>
  </g>
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (1)};" d="M7.62939e-05 995.879H69.6531L69.6531 844.122H7.62939e-05L7.62939e-05 995.879Z"/>
  <path style="opacity: {(scrollY / (scrollHeight / 3)) - (0)};" d="M1568.39 530.814V685.184C1587.8 683.626 1605.9 674.819 1619.11 660.517C1632.31 646.215 1639.65 627.465 1639.65 607.999C1639.65 588.534 1632.31 569.784 1619.11 555.482C1605.9 541.179 1587.8 532.373 1568.39 530.814Z"/>
  </svg>
</figure>
{/if}


<style lang="scss">
  figure {
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: ($base * 1);
    pointer-events: none;

    &.work {
      width: 80%;
    }

    &.page {
      width: 90%;
    }

    &.artists {
      width: 76%;
      top: 5%;
      right: 10%;
    }

    @supports (mix-blend-mode: exclusion) {
			color: white;
			mix-blend-mode: exclusion;
		}

    svg {
      width: 100%;
      height: auto;

      > path,
      > g {
        opacity: 0;
      }
    }
  }
</style>