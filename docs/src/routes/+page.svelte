<script lang="ts">
  import { base } from '$app/paths'
  import { obliterate } from 'orphan-obliterator'
  import { onMount } from 'svelte'
  import Terminal from '$lib/components/Terminal.svelte'
  import Screenshot from '$lib/components/Screenshot.svelte'
  import { cli, download, pythonSite, requirements, tour } from '$lib/content'

  const wordmark = 'hyndsyght'
  let step = $state(0)

  const features = [
    { title: 'A timer in the menu bar', description: 'Start a timer for a client and the elapsed time sits next to the clock. Continue yesterday\'s work in one click.' },
    { title: 'No timers needed either', description: 'It records the front app and window from login onwards, and picks up again after sleep or a crash.' },
    { title: 'Away time, removed honestly', description: 'After five minutes without input you count as away, dated back to your last keystroke.' },
    { title: "Your agent's work next to yours", description: 'Every Claude Code turn is recorded with its project and intent: your time, the agent\'s, and the overlap.' },
    { title: 'Private by default', description: 'Everything stays on your Mac. No account, no cloud, no telemetry. Password manager titles are never stored.' },
    { title: 'Rules that re-label the past', description: 'Categories and clients live in one plain-text rules file. Edit a rule and all past activity follows.' },
  ]

  onMount(() => {
    const instance = obliterate({
      selectors: ['p', '.tagline', '.description', '.feature-list dd'],
      rules: { minLastLineWords: 3, maxProtectedChars: 40 },
    })
    return () => instance.destroy()
  })
</script>

<main>
  <section class="hero plate" aria-labelledby="hero-title">
    <div class="container">
      <h1 id="hero-title" class="hero-wordmark" style:--chars={wordmark.length}>{wordmark}</h1>
      <div class="hero-grid">
        <p class="tagline">A native Mac app that tracks your time on its own, with a timer in your menu bar and your AI agent's work next to yours.</p>
        <div class="hero-install">
          <a class="download" href={download}>Download for Mac</a>
          <p class="requirements">{requirements}</p>
          <a href={pythonSite} class="source-link">Prefer the terminal? Try the Python version</a>
        </div>
      </div>
    </div>
  </section>

  <section class="tour" aria-labelledby="tour-title">
    <div class="container">
      <div class="tour-head">
        <h2 id="tour-title">Your day, looked back on</h2>
        <ol class="step-list">
          {#each tour as s, i}
            <li>
              <button aria-pressed={step === i} onclick={() => (step = i)}>
                <span class="step-num">{i + 1}</span>{s.title}
              </button>
            </li>
          {/each}
        </ol>
      </div>
      <p class="description" aria-live="polite">{tour[step].description}</p>
      {#key step}
        <div class="tour-shot">
          <Screenshot screen={tour[step].screen} alt={tour[step].alt} />
        </div>
      {/key}
    </div>
  </section>

  <section class="menubar" aria-labelledby="menubar-title">
    <div class="container split">
      <div>
        <h2 id="menubar-title">Tracking at a glance</h2>
        <p>The menu bar shows what is happening: a waveform while it records, a pause sign while paused, and a running timer with its time. Open it for today's total, the timer, and the last things you worked on.</p>
      </div>
      <img class="menubar-shot" src="{base}/screens/menubar.webp" alt="The menu bar item showing a running timer at 0:44." width="67" height="24" />
    </div>
  </section>

  <section class="features" aria-labelledby="features-title">
    <div class="container">
      <div class="features-grid">
        <div class="features-head">
          <h2 id="features-title">What it does</h2>
          <a href="{base}/features">All features</a>
        </div>
        <dl class="feature-list">
          {#each features as feature}
            <div>
              <dt>{feature.title}</dt>
              <dd>{feature.description}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
  </section>

  <section class="cli" aria-labelledby="cli-title">
    <div class="container split">
      <div>
        <h2 id="cli-title">A command line comes with it</h2>
        <p>The app carries a <code>hyndsyght</code> command for scripts and timesheets. Setup links it for you; it reads the same data as the app.</p>
      </div>
      <Terminal title="~">
        {#each cli as line}
          {#if typeof line === 'string'}
            <div>{line || ' '}</div>
          {:else if line.tone === 'cmd'}
            <div><span class="t-prompt"></span>{line.text}</div>
          {:else}
            <div class="t-{line.tone}">{line.text}</div>
          {/if}
        {/each}
      </Terminal>
    </div>
  </section>

  <section class="cta plate" aria-labelledby="cta-title">
    <div class="container cta-inner">
      <h2 id="cta-title">Get {wordmark} for Mac</h2>
      <div class="cta-action">
        <a class="download" href={download}>Download for Mac</a>
        <p>{requirements}. Would you rather work in the terminal? The <a href={pythonSite}>Python version</a> keeps the same data.</p>
      </div>
    </div>
  </section>
</main>

<style>
  section { padding: var(--section-padding) 0; }

  .hero { padding: clamp(40px, 7vw, 88px) 0 clamp(48px, 8vw, 104px); }
  .hero .container { container-type: inline-size; }

  .hero-wordmark {
    font-family: var(--font-mono);
    font-stretch: 112.5%;
    font-weight: 800;
    font-size: clamp(2.25rem, calc(100cqi / (var(--chars) * 0.74)), 12rem);
    line-height: 0.95;
    letter-spacing: -0.045em;
    margin: 0 0 clamp(28px, 5vw, 56px) -0.04em;
    overflow-wrap: anywhere;
  }

  .hero-grid, .split {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
    gap: var(--grid-gap);
    align-items: end;
  }

  .tagline {
    font-size: clamp(1.3rem, 2.4vw, 1.75rem);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    max-width: 28ch;
  }

  .hero-install { display: grid; gap: 12px; justify-items: start; }

  .download {
    display: inline-block;
    background: var(--ink);
    color: var(--paper);
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    padding: 14px 26px;
    border-radius: 6px;
    transition: transform 0.15s;
  }

  .download:hover { transform: translateY(-1px); }
  .download:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

  .requirements { font-size: 0.95rem; color: var(--ink-soft); }
  .source-link { font-weight: 500; }

  h2 {
    font-size: clamp(1.75rem, 3.4vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .tour-head {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
    gap: var(--grid-gap);
    align-items: start;
  }

  .step-list { list-style: none; display: flex; flex-wrap: wrap; gap: 6px 18px; }

  .step-list button {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    background: none;
    color: var(--ink-faint);
    font: inherit;
    font-size: 1.05rem;
    font-weight: 500;
    padding: 6px 0;
    cursor: pointer;
    transition: color 0.15s;
  }

  .step-list button:hover, .step-list button[aria-pressed='true'] { color: var(--ink); }

  .step-num {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border: 1.5px solid currentColor;
    border-radius: 3px;
    font-size: 0.8rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .step-list button[aria-pressed='true'] .step-num { background: var(--plate); border-color: var(--ink); }

  .description { color: var(--ink-soft); max-width: 62ch; min-height: 3.1em; margin: 8px 0 28px; }

  .tour-shot { animation: rise 0.35s ease-out; }

  @keyframes rise {
    from { opacity: 0; transform: translateY(8px); }
  }

  .menubar { padding-top: 0; }
  .split p { color: var(--ink-soft); max-width: 44ch; }
  .split { align-items: center; }

  .menubar-shot {
    justify-self: start;
    width: 100px;
    height: auto;
    border-radius: 6px;
    background: var(--term-bg);
    padding: 10px 14px;
    box-sizing: content-box;
  }

  .features { padding-top: 0; }

  .features-grid {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
    gap: var(--grid-gap);
    border-top: 2px solid var(--ink);
    padding-top: clamp(32px, 5vw, 56px);
  }

  .features-head a { font-weight: 500; }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 4vw, 44px) var(--grid-gap);
  }

  .feature-list dt {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }

  .feature-list dt::before {
    content: '';
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    background: var(--plate);
    box-shadow: inset 0 0 0 1.5px var(--ink);
  }

  .feature-list dd { color: var(--ink-soft); padding-left: 20px; }

  .cli { padding-top: 0; }
  .cli :global(.terminal-body) { min-height: 12em; }

  .cta-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px var(--grid-gap);
    align-items: end;
  }

  .cta-action { display: grid; gap: 14px; justify-items: start; }

  .cta h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .tour-shot { animation: none; }
  }

  @media (max-width: 860px) {
    .hero-grid, .split, .tour-head, .features-grid, .cta-inner { grid-template-columns: minmax(0, 1fr); }
    .hero-grid { gap: 28px; }
    .description { min-height: 0; }
  }

  @media (max-width: 560px) {
    .feature-list { grid-template-columns: minmax(0, 1fr); }
  }
</style>
