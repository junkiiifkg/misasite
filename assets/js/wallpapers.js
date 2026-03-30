/* MISA Esports - Wallpapers Page */

const WP_CATEGORIES = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'share',
    description: 'Twitter / X kapak fotografi boyutunda duvar kagitlari',
    aspect: '3/1',
    files: [
      'assets/images/wallpapers/twitter/x_1.png',
      'assets/images/wallpapers/twitter/x_2.png',
      'assets/images/wallpapers/twitter/x_3.png',
      'assets/images/wallpapers/twitter/x_4.png',
      'assets/images/wallpapers/twitter/x_5.png'
    ]
  },
  {
    id: 'mobile',
    name: 'Mobil',
    icon: 'smartphone',
    description: 'Telefon ekrani icin dikey duvar kagitlari (16:9)',
    aspect: '9/16',
    files: [
      'assets/images/wallpapers/mobile/wp_1.png',
      'assets/images/wallpapers/mobile/wp_2.png',
      'assets/images/wallpapers/mobile/wp_3.png',
      'assets/images/wallpapers/mobile/wp_4.png',
      'assets/images/wallpapers/mobile/wp_5.png'
    ]
  },
  {
    id: 'pc',
    name: 'Bilgisayar',
    icon: 'desktop_windows',
    description: '4K bilgisayar masaustu duvar kagitlari',
    aspect: '16/9',
    files: [
      'assets/images/wallpapers/pc/WALLPAPER_1.png',
      'assets/images/wallpapers/pc/WALLPAPER_2.png',
      'assets/images/wallpapers/pc/WALLPAPER_3.png',
      'assets/images/wallpapers/pc/WALLPAPER_4.png',
      'assets/images/wallpapers/pc/WALLPAPER_5.png',
      'assets/images/wallpapers/pc/WALLPAPER_6.png'
    ]
  }
];

let activeCategory = null;

function renderCategories() {
  const grid = document.getElementById('wp-categories');
  if (!grid) return;

  grid.innerHTML = WP_CATEGORIES.map(cat => `
    <button onclick="selectCategory('${cat.id}')" id="cat-${cat.id}"
      class="group relative bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 text-left transition-all duration-300 hover:border-primary/50 hover:bg-surface-container hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] focus:outline-none focus:ring-2 focus:ring-primary/50 ${activeCategory === cat.id ? 'border-primary bg-surface-container shadow-[0_0_30px_rgba(212,175,55,0.12)]' : ''}">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors ${activeCategory === cat.id ? 'bg-primary/15' : ''}">
          <span class="material-symbols-outlined text-2xl ${activeCategory === cat.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors">${cat.icon}</span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-bold ${activeCategory === cat.id ? 'text-primary' : 'text-on-surface'} transition-colors">${cat.name}</h3>
          <span class="text-xs font-label text-on-surface-variant">${cat.files.length} duvar kagidi</span>
        </div>
      </div>
      <p class="text-on-surface-variant font-body text-sm leading-relaxed">${cat.description}</p>
      <div class="mt-4 flex items-center gap-2 text-primary text-sm font-label font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${activeCategory === cat.id ? '!opacity-100' : ''}">
        <span>${activeCategory === cat.id ? 'ACIK' : 'GORUNTULE'}</span>
        <span class="material-symbols-outlined text-sm">${activeCategory === cat.id ? 'expand_less' : 'arrow_forward'}</span>
      </div>
    </button>
  `).join('');
}

function selectCategory(catId) {
  const gallery = document.getElementById('wp-gallery');

  // Toggle if same category clicked
  if (activeCategory === catId) {
    activeCategory = null;
    gallery.classList.add('hidden');
    renderCategories();
    return;
  }

  activeCategory = catId;
  const cat = WP_CATEGORIES.find(c => c.id === catId);
  renderCategories();
  renderGallery(cat);

  // Scroll to gallery smoothly
  setTimeout(() => {
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function renderGallery(cat) {
  const gallery = document.getElementById('wp-gallery');
  gallery.classList.remove('hidden');

  // Determine grid layout based on category
  let gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  let imgAspect = 'aspect-video';

  if (cat.id === 'twitter') {
    gridClass = 'grid-cols-1 md:grid-cols-2';
    imgAspect = 'aspect-[3/1]';
  } else if (cat.id === 'mobile') {
    gridClass = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    imgAspect = 'aspect-[9/16]';
  } else if (cat.id === 'pc') {
    gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    imgAspect = 'aspect-video';
  }

  gallery.innerHTML = `
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-2xl">${cat.icon}</span>
        <h2 class="font-headline text-3xl font-bold text-on-surface">${cat.name}</h2>
        <span class="text-on-surface-variant font-label text-sm ml-2">(${cat.files.length} adet)</span>
      </div>
      <button onclick="closeGallery()" class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-sm">
        <span>KAPAT</span>
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
    <div class="grid ${gridClass} gap-4">
      ${cat.files.map((file, i) => `
        <div class="group relative bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
          <div class="${imgAspect} overflow-hidden cursor-pointer" onclick="openLightbox('${cat.id}', ${i})">
            <img src="${file}" alt="${cat.name} Duvar Kagidi ${i + 1}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          </div>
          <div class="p-3 flex items-center justify-between">
            <span class="text-on-surface-variant font-label text-xs">${cat.name} #${i + 1}</span>
            <a href="${file}" download="${cat.id}_misa_${i + 1}.png"
              class="flex items-center gap-1.5 text-primary hover:text-primary-fixed text-xs font-label font-semibold transition-colors"
              onclick="event.stopPropagation()">
              <span class="material-symbols-outlined text-sm">download</span>
              INDIR
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function closeGallery() {
  activeCategory = null;
  document.getElementById('wp-gallery').classList.add('hidden');
  renderCategories();
  document.getElementById('wp-categories').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Lightbox ---
function openLightbox(catId, index) {
  const cat = WP_CATEGORIES.find(c => c.id === catId);
  if (!cat) return;

  // Remove existing lightbox if any
  const existing = document.getElementById('wp-lightbox');
  if (existing) existing.remove();

  const lightbox = document.createElement('div');
  lightbox.id = 'wp-lightbox';
  lightbox.className = 'fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8';
  lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

  let currentIndex = index;

  function render() {
    const file = cat.files[currentIndex];
    lightbox.innerHTML = `
      <div class="relative max-w-6xl w-full max-h-full flex flex-col items-center">
        <!-- Close button -->
        <button onclick="closeLightbox()" class="absolute -top-2 right-0 z-10 text-white/70 hover:text-white transition-colors">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>

        <!-- Image -->
        <div class="relative w-full flex items-center justify-center" style="max-height: 80vh;">
          <img src="${file}" alt="${cat.name} Duvar Kagidi ${currentIndex + 1}" class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"/>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-6 mt-6">
          <button onclick="lightboxPrev()" class="text-white/70 hover:text-white transition-colors ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}">
            <span class="material-symbols-outlined text-3xl">chevron_left</span>
          </button>

          <span class="text-white/70 font-label text-sm">${currentIndex + 1} / ${cat.files.length}</span>

          <button onclick="lightboxNext()" class="text-white/70 hover:text-white transition-colors ${currentIndex === cat.files.length - 1 ? 'opacity-30 pointer-events-none' : ''}">
            <span class="material-symbols-outlined text-3xl">chevron_right</span>
          </button>

          <a href="${file}" download="${cat.id}_misa_${currentIndex + 1}.png"
            class="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label font-bold text-sm hover:opacity-90 transition-opacity ml-4">
            <span class="material-symbols-outlined text-lg">download</span>
            INDIR
          </a>
        </div>
      </div>
    `;
  }

  window.lightboxPrev = () => {
    if (currentIndex > 0) { currentIndex--; render(); }
  };
  window.lightboxNext = () => {
    if (currentIndex < cat.files.length - 1) { currentIndex++; render(); }
  };

  // Keyboard navigation
  window._lightboxKeyHandler = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') window.lightboxPrev();
    if (e.key === 'ArrowRight') window.lightboxNext();
  };
  document.addEventListener('keydown', window._lightboxKeyHandler);

  render();
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('wp-lightbox');
  if (lightbox) lightbox.remove();
  document.body.style.overflow = '';
  if (window._lightboxKeyHandler) {
    document.removeEventListener('keydown', window._lightboxKeyHandler);
    window._lightboxKeyHandler = null;
  }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
});
