/* MISA Esports - Fixtures Page Logic */

document.addEventListener('DOMContentLoaded', () => { whenDataReady(() => {
  const activeFilters = new Set(['lol', 'cs2', 'valorant']);

  // Render filter buttons
  const filterContainer = document.getElementById('game-filters');
  if (filterContainer) {
    const games = [
      { key: 'lol', label: 'LoL', icon: 'sports_esports' },
      { key: 'cs2', label: 'CS2', icon: 'military_tech' },
      { key: 'valorant', label: 'Valorant', icon: 'shield' }
    ];

    filterContainer.innerHTML = games.map(g => `
      <button data-game="${g.key}" role="switch" aria-checked="true" aria-label="Toggle ${g.label} matches" class="game-filter-btn active flex items-center gap-2 px-5 py-2.5 rounded-full font-label font-bold text-xs tracking-widest uppercase transition-all duration-300">
        <span class="material-symbols-outlined text-sm">${g.icon}</span>
        ${g.label}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.game-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const game = btn.dataset.game;
        if (activeFilters.has(game)) {
          activeFilters.delete(game);
          btn.classList.remove('active');
          btn.setAttribute('aria-checked', 'false');
        } else {
          activeFilters.add(game);
          btn.classList.add('active');
          btn.setAttribute('aria-checked', 'true');
        }
        updateButtonStyles();
        filterMatches();
      });
    });
  }

  function updateButtonStyles() {
    document.querySelectorAll('.game-filter-btn').forEach(btn => {
      if (btn.classList.contains('active')) {
        btn.style.background = 'linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)';
        btn.style.color = '#3c2f00';
        btn.style.border = 'none';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#d0c5af';
        btn.style.border = '1px solid #4d4635';
      }
    });
  }

  function filterMatches() {
    document.querySelectorAll('[data-match-game]').forEach(el => {
      if (activeFilters.has(el.dataset.matchGame)) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // Render upcoming matches
  const upcomingContainer = document.getElementById('upcoming-matches');
  if (upcomingContainer) {
    const sorted = [...MISA_DATA.matches.upcoming].sort((a, b) => new Date(a.date) - new Date(b.date));
    upcomingContainer.innerHTML = sorted.map(m => {
      const branch = getBranch(m.game);
      return `
        <div data-match-game="${m.game}" class="group flex flex-col lg:flex-row items-stretch bg-surface-container rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.01]">
          <div class="lg:w-1/4 p-5 md:p-6 bg-surface-container-low flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-surface/50">
            <p class="font-label text-xs text-primary tracking-widest uppercase mb-1">${branch.name}</p>
            <h4 class="font-headline text-lg md:text-xl font-bold">${formatDate(m.date)}</h4>
            ${formatTime(m.date) ? `<p class="font-body text-sm text-primary font-semibold">${formatTime(m.date)}</p>` : ''}
            <p class="font-body text-sm text-on-surface-variant">${[branch.standings?.leagueName, m.tournament].filter(Boolean).join(' · ')}</p>
          </div>
          <div class="flex-1 flex items-center justify-between p-5 md:p-8 gap-4 md:gap-12">
            <div class="flex items-center gap-3 md:gap-6 flex-1 justify-end">
              <span class="font-headline text-lg md:text-2xl font-black tracking-tighter uppercase hidden sm:block">MISA</span>
              <div class="w-12 h-12 md:w-16 md:h-16 bg-surface-container-high rounded-xl flex items-center justify-center overflow-hidden p-1">
                <img src="${branch.teamLogo || 'favicon.svg'}" alt="MISA" class="w-full h-full object-contain" onerror="this.src='favicon.svg'"/>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center bg-surface">
                <span class="font-label text-primary font-bold text-xs md:text-sm">VS</span>
              </div>
              <p class="text-[10px] font-bold tracking-widest text-outline uppercase mt-2">${m.format}</p>
            </div>
            <div class="flex items-center gap-3 md:gap-6 flex-1">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-surface-container-high rounded-full flex items-center justify-center overflow-hidden p-1">
                ${m.opponentLogo
                  ? `<img src="${m.opponentLogo}" alt="${m.opponent}" class="w-10 h-10 md:w-14 md:h-14 object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display=''">`
                  : ''}
                <span class="font-headline font-bold text-on-surface-variant text-[10px] md:text-xs text-center leading-tight px-1" ${m.opponentLogo ? 'style="display:none"' : ''}>${m.opponent.split(' ').slice(0, 2).join(' ')}</span>
              </div>
              <span class="font-headline text-lg md:text-2xl font-black tracking-tighter uppercase hidden sm:block text-on-surface-variant">${m.opponent}</span>
            </div>
          </div>
          <div class="lg:w-48 xl:w-64 p-4 md:p-6 bg-surface-container-highest flex flex-col justify-center items-center gap-2">
            <span class="material-symbols-outlined text-primary text-2xl">${branch.icon}</span>
            <p class="font-label text-[10px] text-outline uppercase tracking-widest">${branch.shortName}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render recent results
  const recentContainer = document.getElementById('recent-results');
  if (recentContainer) {
    recentContainer.innerHTML = MISA_DATA.matches.recent.map(m => {
      const branch = getBranch(m.game);
      const isWin = m.result.win;
      return `
        <div data-match-game="${m.game}" class="flex items-center bg-surface-container-low p-3 md:p-4 rounded-lg border-l-4 ${isWin ? 'border-primary' : 'border-secondary-container'}">
          <div class="w-12 md:w-16 flex flex-col items-center border-r border-outline-variant/20 pr-3 md:pr-4">
            <span class="font-headline font-black text-lg md:text-xl ${isWin ? 'text-primary' : 'text-secondary-container'}">${isWin ? 'W' : 'L'}</span>
            <span class="text-[9px] font-bold text-on-surface-variant uppercase">${branch.shortName}</span>
          </div>
          <div class="flex-1 grid grid-cols-3 items-center px-4 md:px-8">
            <div class="flex items-center gap-2 md:gap-3">
              <span class="font-headline text-xs md:text-sm font-bold uppercase ${isWin ? '' : 'text-on-surface-variant'}">MISA</span>
            </div>
            <div class="flex justify-center items-center gap-2 md:gap-4">
              <span class="font-headline text-xl md:text-2xl font-black ${isWin ? 'text-primary' : 'text-on-surface-variant'}">${m.result.misa}</span>
              <span class="text-outline-variant">-</span>
              <span class="font-headline text-xl md:text-2xl font-black ${isWin ? 'text-on-surface-variant' : 'text-primary'}">${m.result.opponent}</span>
            </div>
            <div class="flex items-center gap-2 md:gap-3 justify-end">
              <span class="font-headline text-xs md:text-sm font-bold uppercase text-on-surface-variant">${m.opponent}</span>
            </div>
          </div>
          <div class="hidden md:block text-right pl-4 border-l border-outline-variant/20">
            <p class="text-[10px] text-outline uppercase tracking-widest">${[branch.standings?.leagueName, m.tournament].filter(Boolean).join(' · ')}</p>
            <p class="text-[10px] text-on-surface-variant uppercase font-medium">${formatDate(m.date)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Initial styling
  updateButtonStyles();
}); });
