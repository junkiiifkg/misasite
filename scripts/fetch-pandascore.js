/**
 * MISA Esports - PandaScore Data Fetcher
 * Runs via GitHub Actions to fetch live esports data.
 * Requires PANDASCORE_TOKEN environment variable.
 * Node 18+ (uses native fetch)
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://api.pandascore.co';
const TOKEN = process.env.PANDASCORE_TOKEN;

if (!TOKEN) {
  console.error('ERROR: PANDASCORE_TOKEN environment variable is not set.');
  process.exit(1);
}

// PandaScore videogame slugs mapped to our internal keys
const BRANCH_CONFIG = {
  lol:      { slug: 'league-of-legends', searchName: 'MISA' },
  cs2:      { slug: 'cs-go',             searchName: 'MISA' },
  valorant: { slug: 'valorant',          searchName: 'MISA' },
};

// --- API helpers ---

async function apiGet(path, params = {}) {
  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} for ${path}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// --- Team ID resolution ---

async function resolveTeamIds() {
  console.log('Resolving MISA team IDs from PandaScore...');
  const teamIds = {};

  // Search for teams named "MISA"
  const teams = await apiGet('/teams', {
    'search[name]': 'MISA',
    'per_page': '50'
  });

  console.log(`Found ${teams.length} teams matching "MISA"`);

  for (const team of teams) {
    const slug = team.current_videogame?.slug;
    console.log(`  - ${team.name} (ID: ${team.id}, Game: ${slug})`);

    // Map PandaScore game slug to our internal key
    for (const [key, config] of Object.entries(BRANCH_CONFIG)) {
      if (slug === config.slug && !teamIds[key]) {
        teamIds[key] = team.id;
      }
    }
  }

  // Also try searching for "MISA Esports" in case the short name misses
  if (Object.keys(teamIds).length < 5) {
    const teams2 = await apiGet('/teams', {
      'search[name]': 'MISA Esports',
      'per_page': '50'
    });
    for (const team of teams2) {
      const slug = team.current_videogame?.slug;
      for (const [key, config] of Object.entries(BRANCH_CONFIG)) {
        if (slug === config.slug && !teamIds[key]) {
          teamIds[key] = team.id;
          console.log(`  + Found via "MISA Esports": ${team.name} (ID: ${team.id}, Game: ${slug})`);
        }
      }
    }
  }

  console.log('Resolved team IDs:', teamIds);
  return teamIds;
}

// --- Data fetching per branch ---

async function fetchBranchData(key, config, teamId) {
  const result = { roster: [], teamLogo: '', standings: null };

  // Fetch upcoming matches
  // PandaScore URL slug may differ from videogame slug (e.g. league-of-legends → lol)
  const urlSlugMap = {
    'league-of-legends': 'lol',
    'cs-go': 'csgo',
    'valorant': 'valorant',
    'fifa': 'fifa',
    'mlbb': 'mlbb'
  };
  const urlSlug = urlSlugMap[config.slug] || config.slug;

  let upcoming = [];
  try {
    upcoming = await apiGet(`/${urlSlug}/matches/upcoming`, {
      'filter[opponent_id]': teamId.toString(),
      'sort': 'begin_at',
      'per_page': '10'
    });
    console.log(`  [${key}] ${upcoming.length} upcoming matches`);
  } catch (e) {
    console.warn(`  [${key}] Failed to fetch upcoming: ${e.message}`);
  }

  // Fetch recent/past matches
  let recent = [];
  try {
    recent = await apiGet(`/${urlSlug}/matches/past`, {
      'filter[opponent_id]': teamId.toString(),
      'sort': '-begin_at',
      'per_page': '10'
    });
    console.log(`  [${key}] ${recent.length} recent matches`);
  } catch (e) {
    console.warn(`  [${key}] Failed to fetch recent: ${e.message}`);
  }

  // Fetch team info (includes roster)
  try {
    const team = await apiGet(`/teams/${teamId}`);
    result.teamLogo = team.image_url || '';
    if (team.players?.length) {
      result.roster = team.players.map(p => ({
        tag: p.name || p.slug || 'Unknown',
        name: [p.first_name, p.last_name].filter(Boolean).join(' ') || p.name,
        role: p.role ? p.role.charAt(0).toUpperCase() + p.role.slice(1) : 'Player',
        image: p.image_url || ''
      }));
      console.log(`  [${key}] ${result.roster.length} players, logo: ${result.teamLogo ? 'yes' : 'no'}`);
    }
  } catch (e) {
    console.warn(`  [${key}] Failed to fetch team/roster: ${e.message}`);
  }

  // Fetch standings from the most recent tournament
  const allMatches = [...upcoming, ...recent];
  const tournamentId = allMatches[0]?.tournament?.id;
  if (tournamentId) {
    try {
      const standings = await apiGet(`/tournaments/${tournamentId}/standings`);
      if (Array.isArray(standings) && standings.length > 0) {
        result.standings = {
          leagueName: allMatches[0].league?.name + ' ' + (allMatches[0].serie?.full_name || ''),
          table: standings.map(s => ({
            pos: s.rank,
            team: s.team?.name || 'Unknown',
            w: s.wins ?? s.total?.wins ?? 0,
            l: s.losses ?? s.total?.losses ?? 0,
            isMisa: s.team?.id === teamId
          }))
        };
        console.log(`  [${key}] Standings: ${result.standings.table.length} teams`);
      }
    } catch (e) {
      console.warn(`  [${key}] Failed to fetch standings: ${e.message}`);
    }
  }

  // Transform matches
  const transformMatch = (m, isPast) => {
    // Identify MISA vs opponent
    const opponents = m.opponents || [];
    const misaOpponent = opponents.find(o => o.opponent?.id !== teamId);
    const misaTeam = opponents.find(o => o.opponent?.id === teamId);
    const opponentName = misaOpponent?.opponent?.name || m.name || 'TBD';

    const match = {
      id: m.id.toString(),
      game: key,
      opponent: opponentName,
      date: m.begin_at || m.scheduled_at || '',
      tournament: m.tournament?.name || m.league?.name || '',
      format: m.number_of_games ? `BO${m.number_of_games}` : 'BO1'
    };

    if (isPast && m.results) {
      const misaResult = m.results.find(r => r.team_id === teamId) || {};
      const oppResult = m.results.find(r => r.team_id !== teamId) || {};
      match.result = {
        misa: misaResult.score ?? 0,
        opponent: oppResult.score ?? 0,
        win: m.winner_id === teamId
      };
    }

    return match;
  };

  return {
    ...result,
    upcoming: upcoming.map(m => transformMatch(m, false)),
    recent: recent.map(m => transformMatch(m, true))
  };
}

// --- Main ---

async function main() {
  console.log('=== MISA Esports PandaScore Fetcher ===');
  console.log(`Time: ${new Date().toISOString()}`);

  const teamIds = await resolveTeamIds();
  const output = {
    _meta: {
      fetchedAt: new Date().toISOString(),
      source: 'pandascore'
    },
    branches: {},
    matches: {
      upcoming: [],
      recent: []
    }
  };

  for (const [key, config] of Object.entries(BRANCH_CONFIG)) {
    const teamId = teamIds[key];
    if (!teamId) {
      console.warn(`[${key}] No team ID found, skipping.`);
      continue;
    }

    console.log(`\nFetching ${key} (team ID: ${teamId})...`);
    try {
      const data = await fetchBranchData(key, config, teamId);

      // Store branch-specific data (roster, standings)
      output.branches[key] = {
        roster: data.roster,
        teamLogo: data.teamLogo,
        standings: data.standings
      };

      // Merge matches into combined lists
      output.matches.upcoming.push(...data.upcoming);
      output.matches.recent.push(...data.recent);
    } catch (e) {
      console.error(`[${key}] Branch fetch failed: ${e.message}`);
    }
  }

  // Sort matches
  output.matches.upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  output.matches.recent.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Write output
  const outPath = join(__dirname, '..', 'assets', 'data', 'live.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nDone! Written to ${outPath}`);
  console.log(`  Branches: ${Object.keys(output.branches).length}`);
  console.log(`  Upcoming matches: ${output.matches.upcoming.length}`);
  console.log(`  Recent matches: ${output.matches.recent.length}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
