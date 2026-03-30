/* MISA Esports - Shared Navigation & Footer */

// --- Utility: HTML escape to prevent XSS ---
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// --- Utility: image tag with lazy loading and fallback ---
function imgTag(src, alt, extraClass = '') {
  const escaped = escapeHtml(alt);
  return `<img src="${src}" alt="${escaped}" loading="lazy" decoding="async" class="${extraClass}" onerror="this.style.display='none'"/>`;
}

// --- Utility: wait for live data to finish loading ---
function whenDataReady(fn) {
  if (window.__misaDataReady) {
    window.__misaDataReady.then(fn).catch(() => fn());
  } else {
    fn();
  }
}

function getActivePage() {
  const path = window.location.pathname;
  if (path.includes('minigames')) return 'minigames';
  if (path.includes('wallpapers')) return 'wallpapers';
  if (path.includes('fixtures')) return 'fixtures';
  if (path.includes('branches')) return 'branches';
  return 'home';
}

function navLinkClass(page) {
  const active = getActivePage();
  const base = "font-['Space_Grotesk'] font-bold uppercase tracking-[0.05em] text-sm transition-colors duration-300";
  if (active === page) {
    return `${base} text-[#f2ca50] border-b-2 border-[#f2ca50] pb-1`;
  }
  return `${base} text-[#d0c5af] hover:text-[#f2ca50]`;
}

function renderNav() {
  const root = document.getElementById('nav-root');
  if (!root) return;

  root.innerHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 h-20 bg-[#131313]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.05)] flex justify-between items-center px-6 md:px-8 max-w-none" role="navigation" aria-label="Ana gezinti">
      <a href="index.html" class="text-2xl font-black tracking-tighter text-[#f2ca50] font-headline hover:opacity-90 transition-opacity">MISA</a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-10">
        <a class="${navLinkClass('home')}" href="index.html">ANA SAYFA</a>
        <a class="${navLinkClass('branches')}" href="branches.html">TAKIMLAR</a>
        <a class="${navLinkClass('fixtures')}" href="fixtures.html">FİKSTÜR</a>
        <a class="${navLinkClass('minigames')}" href="minigames.html">MİNİ OYUNLAR</a>
        <a class="${navLinkClass('wallpapers')}" href="wallpapers.html">DUVAR KAGITLARI</a>
      </div>

      <div class="flex items-center gap-4">
        <a href="https://misaesports.com" target="_blank" rel="noopener noreferrer" class="hidden sm:block gold-gradient px-5 py-2 rounded-md font-['Space_Grotesk'] font-bold text-[#3c2f00] text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
          RESMİ SİTE
        </a>
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden text-[#f2ca50] hover:scale-110 transition-transform" aria-label="Menüyü aç" aria-expanded="false">
          <span class="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="mobile-menu-overlay hidden fixed inset-0 z-[60] bg-[#131313]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8" role="dialog" aria-label="Mobil gezinti menüsü">
      <button id="mobile-menu-close" class="absolute top-6 right-6 text-[#f2ca50]" aria-label="Menüyü kapat">
        <span class="material-symbols-outlined text-3xl">close</span>
      </button>
      <a class="font-['Space_Grotesk'] font-bold uppercase tracking-[0.1em] text-2xl ${getActivePage() === 'home' ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}" href="index.html">ANA SAYFA</a>
      <a class="font-['Space_Grotesk'] font-bold uppercase tracking-[0.1em] text-2xl ${getActivePage() === 'branches' ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}" href="branches.html">TAKIMLAR</a>
      <a class="font-['Space_Grotesk'] font-bold uppercase tracking-[0.1em] text-2xl ${getActivePage() === 'fixtures' ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}" href="fixtures.html">FİKSTÜR</a>
      <a class="font-['Space_Grotesk'] font-bold uppercase tracking-[0.1em] text-2xl ${getActivePage() === 'minigames' ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}" href="minigames.html">MİNİ OYUNLAR</a>
      <a class="font-['Space_Grotesk'] font-bold uppercase tracking-[0.1em] text-2xl ${getActivePage() === 'wallpapers' ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}" href="wallpapers.html">DUVAR KAGITLARI</a>
      <a href="https://misaesports.com" target="_blank" rel="noopener noreferrer" class="gold-gradient px-8 py-3 rounded-md font-['Space_Grotesk'] font-bold text-[#3c2f00] text-sm tracking-widest uppercase mt-4">
        RESMİ SİTE
      </a>
    </div>
  `;

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    });
    const closeMenu = () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    };
    closeBtn.addEventListener('click', closeMenu);
    menu.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) closeMenu();
    });
  }
}

function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;

  const year = new Date().getFullYear();

  root.innerHTML = `
    <footer class="bg-[#0e0e0e] w-full py-20 px-6 md:px-12 border-t border-[#4d4635]/15" role="contentinfo">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div class="space-y-6 max-w-sm">
            <a href="index.html" class="text-[#f2ca50] font-['Space_Grotesk'] font-bold text-3xl block">MISA ESPORTS</a>
            <p class="text-[#d0c5af] text-sm leading-relaxed font-body">MISA Esports taraftarları için yapılmış bir fan sitesi. Maçları takip et, takımları keşfet, mini oyunlar oyna ve toplulukla bağlantıda kal.</p>
            <div class="flex gap-4">
              <a href="https://www.youtube.com/@MisaEsportsOfficial" target="_blank" rel="noopener noreferrer" aria-label="MISA Esports YouTube" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer transition-colors">smart_display</a>
              <a href="https://misaesports.com" target="_blank" rel="noopener noreferrer" aria-label="MISA Esports official site" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer transition-colors">language</a>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div class="space-y-4">
              <h5 class="text-[#f2ca50] font-label font-bold text-xs tracking-widest uppercase">GEZİNTİ</h5>
              <ul class="space-y-2">
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="index.html">Ana Sayfa</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="branches.html">Takımlar</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="fixtures.html">Fikstür</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="minigames.html">Mini Oyunlar</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="wallpapers.html">Duvar Kagitlari</a></li>
              </ul>
            </div>
            <div class="space-y-4">
              <h5 class="text-[#f2ca50] font-label font-bold text-xs tracking-widest uppercase">LİNKLER</h5>
              <ul class="space-y-2">
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="https://misaesports.com" target="_blank" rel="noopener noreferrer">Resmi Site</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="https://www.youtube.com/@MisaEsportsOfficial" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a class="text-[#d0c5af] hover:text-[#f2ca50] text-sm transition-colors uppercase font-label" href="privacy.html">Gizlilik Politikası</a></li>
              </ul>
            </div>
            <div class="space-y-4 col-span-2 md:col-span-1">
              <h5 class="text-[#f2ca50] font-label font-bold text-xs tracking-widest uppercase">FAN SİTESİ</h5>
              <p class="text-[#d0c5af] text-xs leading-relaxed">Bu gayri resmi bir fan sitesidir. MISA Esports yönetimiyle herhangi bir bağlantısı yoktur.</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-8 w-full border-t border-[#4d4635]/15 pt-10">
          <div class="font-['Work_Sans'] text-[10px] uppercase tracking-widest text-[#d0c5af]">
            &copy; ${year} MISA ESPORTS FAN SİTESİ. TÜM HAKLAR SAKLIDIR.
          </div>
          <div class="flex gap-8">
            <a class="font-['Work_Sans'] text-[10px] uppercase tracking-widest text-[#d0c5af] hover:text-[#f2ca50]" href="https://misaesports.com" target="_blank" rel="noopener noreferrer">misaesports.com</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Utility: format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

// Utility: format time in Turkey timezone (Europe/Istanbul)
function formatTime(dateStr) {
  if (!dateStr || !dateStr.includes('T')) return null;
  const d = new Date(dateStr);
  const time = d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
  return time + ' TSİ';
}

// Utility: get next match across all branches
function getNextMatch() {
  const now = new Date();
  const upcoming = MISA_DATA.matches.upcoming
    .filter(m => new Date(m.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return upcoming[0] || MISA_DATA.matches.upcoming[0];
}

// Utility: get branch info
function getBranch(gameKey) {
  return MISA_DATA.branches[gameKey];
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
});
