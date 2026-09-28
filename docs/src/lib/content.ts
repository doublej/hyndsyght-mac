// Facts both pages share: where to get the app, and the screens it shows.

export const download = 'https://github.com/doublej/hyndsyght-mac/releases/latest/download/Hyndsyght.dmg'
export const releases = 'https://github.com/doublej/hyndsyght-mac/releases'
export const pythonSite = 'https://doublej.github.io/hyndsyght/'
export const requirements = 'For macOS 26 or later, Apple silicon and Intel, notarized by Apple'

export type Screen = { screen: string; title: string; description: string; alt: string }

export const tour: Screen[] = [
  {
    screen: 'today',
    title: 'Today',
    description: 'Your day in one sentence, then a ribbon of five-minute blocks coloured by category, with your agents in their own lane. Click a block, an app or a category to see what is behind it.',
    alt: 'The Today screen on demo data: a headline with hours at the computer, a day ribbon coloured by category with an agent lane, four readings, top apps and minutes per hour.',
  },
  {
    screen: 'timelog',
    title: 'Time log',
    description: 'Timers and logged blocks per client, day by day. Edit a note, move a start time or delete an entry.',
    alt: 'The Time log screen on demo data: manual entries for made-up clients with durations and notes.',
  },
  {
    screen: 'timeline',
    title: 'Timeline',
    description: 'Every window, break and agent turn that was recorded, newest first. Filter by source, category, app or session, and fix a category in place.',
    alt: 'The Timeline screen on demo data: a list of recorded windows with their app, category and duration.',
  },
  {
    screen: 'stats',
    title: 'Stats',
    description: 'Weeks at a glance: active time per day against your average, a weekday by hour heatmap, and how this period compares with the one before.',
    alt: 'The Stats screen on demo data: six readings, daily bars with an average line and a weekday by hour heatmap.',
  },
  {
    screen: 'categories',
    title: 'Categories',
    description: 'Where the time went, in the same colours everywhere, and the rules that decide it. Edit a rule and the past follows.',
    alt: 'The Categories screen on demo data: coloured bars per category, category cards and the rules editor.',
  },
  {
    screen: 'ledger',
    title: 'Agents',
    description: 'Your time and your AI agent\'s time side by side: how long it ran, how much of that was alongside you, and how much while you were away.',
    alt: 'The Ledger screen on demo data: human time, agent time, overlap and ratio, with 14 days of bars.',
  },
  {
    screen: 'status',
    title: 'Status',
    description: 'Is it recording or is another recorder holding the lock, are the Claude Code hooks in, can it read window titles, and when did each source last report.',
    alt: 'The Status screen on demo data: checks for the recorder, permissions and each source.',
  },
]

type Tone = 'cmd' | 'hi' | 'dim' | 'ok' | 'err'
export type Line = string | { text: string; tone: Tone }

// Real output of the bundled CLI against the demo data.
export const cli: Line[] = [
  { text: 'hyndsyght timer stop', tone: 'cmd' },
  { text: 'Timer stopped after 1h 39m for acme.web: homepage copy.', tone: 'ok' },
  { text: 'hyndsyght log 45m initech.brand logo review', tone: 'cmd' },
  { text: 'Logged 45m for initech.brand: logo review.', tone: 'ok' },
  { text: 'hyndsyght export --since 2026-09-28 --csv', tone: 'cmd' },
  { text: 'date,client,hours', tone: 'dim' },
  '2026-09-28,acme.web,7.25',
  '2026-09-28,globex.app,0.25',
  '2026-09-28,initech.brand,0.75',
]
