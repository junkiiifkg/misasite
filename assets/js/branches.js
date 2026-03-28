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
      <div data-branch="${key}" role="button" tabindex="0" aria-label="View ${b.name} branch details" class="branch-card group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 ${branchKeys.indexOf(key) === 0 ? 'md:col-span-2 md:row-span-2' : ''}">
        <div class="relative h-full min-h-[280px] ${branchKeys.indexOf(key) === 0 ? 'md:min-h-[500px]' : 'md:min-h-[320px]'}">
          <img class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60" src="${b.image}" alt="${b.name}"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent"></div>
          <div class="absolute inset-0 border border-outline-variant/20 group-hover:border-primary/40 rounded-xl transition-colors duration-500"></div>
          <div class="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">${b.icon}</span>
              <span class="text-primary font-headline font-bold text-xs tracking-widest uppercase">${b.shortName}</span>
            </div>
            <div>
              <h2 class="text-3xl ${branchKeys.indexOf(key) === 0 ? 'md:text-5xl' : 'md:text-2xl'} font-headline font-black tracking-tighter text-on-surface uppercase mb-2 group-hover:text-primary transition-colors">${b.name}</h2>
              <p class="text-on-surface-variant text-sm mb-4">${b.tagline}</p>
              <div class="flex items-center gap-2 text-primary font-label font-bold text-xs tracking-widest uppercase">
                <span>VIEW DETAILS</span>
                <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
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

    detailPanel.classList.remove('hidden');
    detailPanel.innerHTML = `
      <div class="bg-surface-container-lowest rounded-xl p-6 md:p-12 border border-outline-variant/10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">${b.icon}</span>
              <span class="text-primary font-headline font-bold text-xs tracking-widest uppercase">${b.shortName}</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary uppercase">${b.name}</h2>
            <p class="text-on-surface-variant uppercase tracking-widest text-xs mt-2">${b.tagline}</p>
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
              <p class="font-label text-xs text-primary tracking-widest uppercase mb-1">${nextMatch.tournament}</p>
              <p class="font-headline text-xl font-bold">${formatDate(nextMatch.date)}</p>
            </div>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
                  <span class="font-headline font-black text-primary">MISA</span>
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
                <div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
                  <span class="font-headline font-bold text-on-surface-variant text-[10px] text-center leading-tight px-1">${nextMatch.opponent}</span>
                </div>
                <span class="mt-2 font-headline font-bold text-on-surface-variant uppercase opacity-60 text-xs">${nextMatch.opponent}</span>
              </div>
            </div>
            <a href="fixtures.html" class="text-primary font-label font-bold tracking-widest uppercase text-xs border-b border-primary/30 pb-1 hover:border-primary transition-all">ALL FIXTURES</a>
          </div>
        </div>
        ` : ''}

        <!-- Standings -->
        <div>
          <h3 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight mb-8">STANDINGS — ${b.standings.leagueName}</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-outline-variant/20">
                  <th class="text-left py-3 px-4 font-label font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">#</th>
                  <th class="text-left py-3 px-4 font-label font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Team</th>
                  <th class="text-center py-3 px-4 font-label font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">W</th>
                  <th class="text-center py-3 px-4 font-label font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">L</th>
                </tr>
              </thead>
              <tbody>
                ${b.standings.table.map(row => `
                  <tr class="${row.isMisa ? 'bg-primary/10 border-l-4 border-primary' : 'border-l-4 border-transparent'} hover:bg-surface-container-low transition-colors">
                    <td class="py-3 px-4 font-headline font-bold text-sm ${row.isMisa ? 'text-primary' : 'text-on-surface-variant'}">${row.pos}</td>
                    <td class="py-3 px-4 font-headline font-bold text-sm uppercase ${row.isMisa ? 'text-primary' : 'text-on-surface'}">${row.team}</td>
                    <td class="py-3 px-4 text-center font-headline font-bold text-sm text-primary">${row.w}</td>
                    <td class="py-3 px-4 text-center font-headline font-bold text-sm text-on-surface-variant">${row.l}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}); });
