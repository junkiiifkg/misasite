# MISA Esports Fan Site

An unofficial fan site for MISA Esports supporters. Follow matches, explore branches, play mini-games, and stay connected with the community.

## Pages

- **Home** — Hero section, next match countdown, latest YouTube video, news grid
- **Branches** — All 5 game branches (LoL, CS2, Valorant, EA FC 26, MLBB) with rosters, standings, and upcoming matches
- **Fixtures** — Collective fixture list with per-game toggle filters and recent results
- **MiniGames** — Misadle (daily word game), Reaction Clicker, leaderboard

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no build step)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- Google Fonts (Space Grotesk, Work Sans, Material Symbols)
- localStorage for game state and leaderboard

## Setup

1. Clone this repository
2. Open `index.html` in a browser, or serve with any static file server:
   ```bash
   python -m http.server 3000
   ```
3. Visit `http://localhost:3000`

## Updating Content

- **Match data & rosters**: Edit `assets/js/data.js`
- **Featured YouTube video**: Update `MISA_DATA.team.latestVideoId` in `assets/js/data.js` with the video ID from the YouTube URL
- **News articles**: Update the `news` array in `assets/js/data.js`

## Deployment

This site is designed for GitHub Pages. Push to a GitHub repository and enable Pages from the repository settings (deploy from the `main` branch root).

## Disclaimer

This is an unofficial fan site. Not affiliated with MISA Esports management.
