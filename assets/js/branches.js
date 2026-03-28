/* MISA Esports - Branches Page Logic */

document.addEventListener('DOMContentLoaded', () => { whenDataReady(() => {
  const grid = document.getElementById('branches-grid');
  const detailPanel = document.getElementById('branch-detail');
  let activeBranch = null;

  if (!grid) return;

  const branchKeys = Object.keys(MISA_DATA.branches);

  // Render branch cards
  grid.innerHTML = branchKeys.map(key => {
    const b = MISA_DATA.branches[key];
    return `
      <div data-branch="${key}" role="button" tabindex="0" aria-label="View ${b.name} branch details" class="branch-card group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 bg-surface-container-high ${branchKeys.indexOf(key) === 0 ? 'md:col-span-2 md:row-span-2' : ''}">
        <div class="relative h-full min-h-[280px] ${branchKeys.indexOf(key) === 0 ? 'md:min-h-[500px]' : 'md:min-h-[320px]'} flex flex-col">
          <!-- Game logo fills the entire card -->
          <div class="absolute inset-0 flex items-center justify-center p-8 md:p-12">
            <img src="${b.gameLogo || ''}" alt="${b.name}"
              class="w-full h-full object-contain opacity-55 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105 drop-shadow-2xl"/>
          </div>
          <!-- Bottom fade so text is readable -->
          <div class="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-surface-container-high to-transparent"></div>
          <!-- Border ring -->
          <div class="absolute inset-0 border border-outline-variant/20 group-hover:border-primary/40 rounded-xl transition-colors duration-500"></div>
          <!-- Content overlay -->
          <div class="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">${b.icon}</span>
              <span class="text-primary font-headline font-bold text-xs tracking-widest uppercase">${b.shortName}</span>
            </div>
            <div class="flex items-center gap-2 text-primary font-label font-bold text-xs tracking-widest uppercase">
              <span>VIEW DETAILS</span>
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Click and keyboard handler for branch cards
  grid.querySelectorAll('.branch-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    card.addEventListener('click', () => {
      const key = card.dataset.branch;
      if (activeBranch === key) {
        // Close
        activeBranch = null;
        detailPanel.classList.add('hidden');
        detailPanel.innerHTML = '';
        // Remove active states
        grid.querySelectorAll('.branch-card').forEach(c => c.classList.remove('ring-2', 'ring-primary'));
      } else {
        activeBranch = key;
        renderDetail(key);
        // Highlight active card
        grid.querySelectorAll('.branch-card').forEach(c => c.classList.remove('ring-2', 'ring-primary'));
        card.classList.add('ring-2', 'ring-primary');
        // Scroll to detail
        setTimeout(() => detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    });
  });

  function renderDetail(key) {
    const b = MISA_DATA.branches[key];
    const nextMatch = MISA_DATA.matches.upcoming.find(m => m.game === key);
    const lastMatch = MISA_DATA.matches.recent.find(m => m.game === key);

    detailPanel.classList.remove('hidden');
    detailPanel.innerHTML = `
      <div class="bg-surface-container-lowest rounded-xl p-6 md:p-12 border border-outline-variant/10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div class="flex items-center gap-6">
            ${b.teamLogo ? `<img src="${b.teamLogo}" alt="${b.name} logo" class="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg" loading="lazy" onerror="this.style.display='none'"/>` : ''}
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">${b.icon}</span>
                <span class="text-primary font-headline font-bold text-xs tracking-widest uppercase">${b.shortName}</span>
              </div>
              <h2 class="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary uppercase">${b.name}</h2>
              <p class="text-on-surface-variant uppercase tracking-widest text-xs mt-2">${b.tagline}</p>
            </div>
          </div>
          <button onclick="document.getElementById('branch-detail').classList.add('hidden'); document.querySelectorAll('.branch-card').forEach(c => c.classList.remove('ring-2', 'ring-primary'));" class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label font-bold text-xs tracking-widest uppercase">
            <span class="material-symbols-outlined text-sm">close</span> CLOSE
          </button>
        </div>

        <!-- Roster -->
        <div class="mb-16">
          <h3 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight mb-8">ROSTER</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            ${b.roster.map((p, i) => `
              <div class="group/player relative bg-surface-container-high rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
                <div class="aspect-[3/4] relative overflow-hidden">
                  <img class="w-full h-full object-cover grayscale group-hover/player:grayscale-0 transition-all duration-700" src="${p.image}" alt="${p.tag}"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                  <div class="absolute top-3 right-3 text-3xl font-headline font-black text-on-surface/10 select-none">${String(i + 1).padStart(2, '0')}</div>
                </div>
                <div class="p-4">
                  <h4 class="font-headline text-xl font-black tracking-tighter text-on-surface uppercase group-hover/player:text-primary transition-colors">${p.tag}</h4>
                  <p class="text-primary text-[10px] font-headline font-bold uppercase tracking-widest mt-1">${p.role}</p>
                  <p class="text-on-surface-variant text-xs mt-1">${p.name}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Next Match -->
        ${nextMatch ? `
        <div class="mb-16">
          <h3 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight mb-8">NEXT MATCH</h3>
          <div class="bg-surface-container rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="text-center md:text-left">
              <p class="font-label text-xs text-primary tracking-widest uppercase mb-1">${[b.standings?.leagueName, nextMatch.tournament].filter(Boolean).join(' · ')}</p>
              <p class="font-headline text-xl font-bold">${formatDate(nextMatch.date)}</p>
            </div>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center overflow-hidden p-1">
                  <img src="${b.teamLogo || 'favicon.svg'}" alt="MISA" class="w-full h-full object-contain" onerror="this.src='favicon.svg'"/>
                </div>
                <span class="mt-2 font-headline font-bold text-primary uppercase text-xs">MISA</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-surface">
                  <span class="font-label text-primary font-bold text-xs">VS</span>
                </div>
                <span class="mt-1 text-[10px] font-bold tracking-widest text-outline uppercase">${nextMatch.format}</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center">
                  <span class="font-headline font-bold text-on-surface-variant text-[10px] text-center leading-tight px-1">${nextMatch.opponent}</span>
                </div>
                <span class="mt-2 font-headline font-bold text-on-surface-variant uppercase opacity-60 text-xs">${nextMatch.opponent}</span>
              </div>
            </div>
            <a href="fixtures.html" class="text-primary font-label font-bold tracking-widest uppercase text-xs border-b border-primary/30 pb-1 hover:border-primary transition-all">ALL FIXTURES</a>
          </div>
        </div>
        ` : ''}

        <!-- Last Match -->
        ${lastMatch ? `
        <div>
          <h3 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight mb-8">LAST MATCH</h3>
          <div class="bg-surface-container rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="text-center md:text-left">
              <p class="font-label text-xs text-primary tracking-widest uppercase mb-1">${[b.standings?.leagueName, lastMatch.tournament].filter(Boolean).join(' · ')}</p>
              <p class="font-headline text-xl font-bold">${formatDate(lastMatch.date)}</p>
            </div>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center overflow-hidden p-1">
                  <img src="${b.teamLogo || 'favicon.svg'}" alt="MISA" class="w-full h-full object-contain" onerror="this.src='favicon.svg'"/>
                </div>
                <span class="mt-2 font-headline font-bold text-primary uppercase text-xs">MISA</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="flex items-center gap-3">
                  <span class="font-headline text-3xl font-black ${lastMatch.result.win ? 'text-primary' : 'text-on-surface-variant'}">${lastMatch.result.misa}</span>
                  <span class="text-outline-variant font-headline text-xl">-</span>
                  <span class="font-headline text-3xl font-black ${lastMatch.result.win ? 'text-on-surface-variant' : 'text-primary'}">${lastMatch.result.opponent}</span>
                </div>
                <span class="font-headline font-black text-xs tracking-widest uppercase px-3 py-1 rounded-full ${lastMatch.result.win ? 'bg-primary/20 text-primary' : 'bg-secondary-container/20 text-secondary-container'}">${lastMatch.result.win ? 'WIN' : 'LOSS'}</span>
                <span class="text-[10px] font-bold tracking-widest text-outline uppercase">${lastMatch.format}</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
                  <span class="font-headline font-bold text-on-surface-variant text-[10px] text-center leading-tight px-1">${lastMatch.opponent}</span>
                </div>
                <span class="mt-2 font-headline font-bold text-on-surface-variant uppercase opacity-60 text-xs">${lastMatch.opponent}</span>
              </div>
            </div>
            <a href="fixtures.html" class="text-primary font-label font-bold tracking-widest uppercase text-xs border-b border-primary/30 pb-1 hover:border-primary transition-all">ALL RESULTS</a>
          </div>
        </div>
        ` : ''}
      </div>
    `;
  }
}); });
