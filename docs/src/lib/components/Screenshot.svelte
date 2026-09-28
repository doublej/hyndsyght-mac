<script lang="ts">
  import { base } from '$app/paths'

  // A window of the app, captured with its own title bar on demo data. `screen` is the
  // file name under static/screens/. The shadow follows the window's rounded corners.
  let { screen, alt, width = 1180, height = 860 }: { screen: string; alt: string; width?: number; height?: number } = $props()
</script>

<figure class="screenshot">
  <img src="{base}/screens/{screen}.webp" {alt} {width} {height} loading="lazy" decoding="async" />
</figure>

<style>
  .screenshot { margin: 0; }

  img {
    display: block;
    width: 100%;
    height: auto;
    filter:
      drop-shadow(0 0 0.5px color-mix(in oklch, var(--ink) 45%, transparent))
      drop-shadow(0 22px 34px color-mix(in oklch, var(--ink) 28%, transparent));
  }
</style>
