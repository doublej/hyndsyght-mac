<script lang="ts">
  import Screenshot from '$lib/components/Screenshot.svelte'
  import { download, pythonSite, tour } from '$lib/content'

  const versions = ['Mac app', 'Python version']
  const comparison = [
    { aspect: 'Install', cells: ['Download a notarized app', 'Clone the repo, then just setup'] },
    { aspect: 'Dashboard', cells: ['A native window', 'In your browser, on this computer only'] },
    { aspect: 'Menu bar', cells: ['Native, with a running timer', 'A tray icon'] },
    { aspect: 'Command line', cells: ['Included', 'Included'] },
    { aspect: 'Assistants over MCP', cells: ['Read-only summaries', 'Read-only summaries'] },
    { aspect: 'Your data', cells: ['The same store: switch any time', 'The same store: switch any time'] },
    { aspect: 'Source', cells: ['Closed', 'Open on GitHub'] },
  ]
</script>

<svelte:head>
  <title>Features — hyndsyght for Mac</title>
</svelte:head>

<main>
  <section class="page-head plate" aria-labelledby="page-title">
    <div class="container head-grid">
      <h1 id="page-title">What <span class="name">hyndsyght</span> does</h1>
      <p class="subtitle">Seven screens, a menu bar that shows what is being tracked, and nothing that leaves your Mac. Every screenshot uses made-up demo data.</p>
    </div>
  </section>

  <section class="timer" aria-labelledby="timer-title">
    <div class="container feature-grid">
      <div>
        <h2 id="timer-title">Timers when you want them</h2>
        <p>Most of your day is recorded on its own. For client work you can also start a timer from the menu bar. It shows its time next to the clock, and one click continues something you worked on before. You can also log a finished block, like "1h30m for a client", and see which time range it will cover before you save it.</p>
      </div>
      <Screenshot screen="timelog" alt="The Time log screen on demo data with entries for made-up clients." />
    </div>
  </section>

  {#each tour.filter((s) => s.screen !== 'timelog') as feature, i}
    <section class="feature" aria-labelledby="feature-{i}">
      <div class="container feature-grid">
        <div>
          <h2 id="feature-{i}">{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
        <Screenshot screen={feature.screen} alt={feature.alt} />
      </div>
    </section>
  {/each}

  <section class="feature" aria-labelledby="setup-title">
    <div class="container feature-grid">
      <div>
        <h2 id="setup-title">Set up in one window</h2>
        <p>The first launch opens a checklist: the Screen Recording permission for window titles, Claude Code hooks, starting at login and the command line. Each item says what it changes before it does.</p>
      </div>
      <Screenshot screen="setup" alt="The Setup checklist in Settings." width={720} height={872} />
    </div>
  </section>

  <section class="compare" aria-labelledby="compare-title">
    <div class="container">
      <h2 id="compare-title">The Mac app or the Python version</h2>
      <p class="compare-lead">Both record the same things into the same place, so you can switch or even keep both installed; only one records at a time. <a href={pythonSite}>Read about the Python version</a> or <a href={download}>download the Mac app</a>.</p>
      <div class="table-scroll">
        <table class="compare-table">
          <thead>
            <tr>
              <td></td>
              {#each versions as name, i}<th scope="col" class:ours={i === 0}>{name}</th>{/each}
            </tr>
          </thead>
          <tbody>
            {#each comparison as row}
              <tr>
                <th scope="row">{row.aspect}</th>
                {#each row.cells as cell, i}<td class:ours={i === 0}>{cell}</td>{/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </section>
</main>

<style>
  section { padding: var(--section-padding) 0; }

  .page-head { padding: clamp(48px, 8vw, 96px) 0; }

  h1 {
    font-size: clamp(2.25rem, 6vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    max-width: 16ch;
  }

  .name { white-space: nowrap; }

  .head-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px var(--grid-gap);
    align-items: end;
  }

  .subtitle { font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 500; max-width: 36ch; line-height: 1.35; }

  .feature { padding-top: 0; }

  .feature-grid {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: var(--grid-gap);
    align-items: start;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }

  .feature-grid p { color: var(--ink-soft); max-width: 40ch; }

  .compare { padding-top: 0; }
  .compare h2 { border-top: 2px solid var(--ink); padding-top: clamp(32px, 5vw, 56px); }
  .compare-lead { color: var(--ink-soft); max-width: 60ch; margin-bottom: 28px; }

  .table-scroll { overflow-x: auto; }
  .table-scroll .compare-table { min-width: 520px; }

  @media (max-width: 860px) {
    .feature-grid, .head-grid { grid-template-columns: minmax(0, 1fr); }
  }
</style>
