/* MISA Esports - YouTube Video Embed
 *
 * How to update the featured video:
 * 1. Go to https://www.youtube.com/@MisaEsportsOfficial
 * 2. Open the latest video you want to feature
 * 3. Copy the video ID from the URL (e.g. https://www.youtube.com/watch?v=XXXXXX → the XXXXXX part)
 * 4. Paste it in data.js → MISA_DATA.team.latestVideoId
 */

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@MisaEsportsOfficial';

function renderYouTubeSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const videoId = MISA_DATA.team.latestVideoId;

  if (videoId) {
    // Render embedded video
    container.innerHTML = `
      <div class="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
        <iframe
          src="https://www.youtube.com/embed/${escapeHtml(videoId)}"
          title="Latest MISA Esports Video"
          class="w-full h-full"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p class="text-on-surface-variant text-sm">Resmi MISA Esports YouTube kanalından</p>
        <a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 text-primary font-label font-bold uppercase tracking-widest text-xs hover:translate-x-2 duration-300 transition-transform">
          DAHA FAZLA VİDEO <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    `;
  } else {
    // No video ID set — show channel link
    container.innerHTML = `
      <div class="aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center">
        <div class="text-center space-y-4">
          <span class="material-symbols-outlined text-6xl text-primary/40">smart_display</span>
          <p class="text-on-surface-variant text-sm">MISA Esports'tan en yenileri izle</p>
          <a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-md text-[#3c2f00] font-headline font-bold text-sm tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-sm">play_arrow</span>
            YOUTUBE'DA İZLE
          </a>
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <a href="${YOUTUBE_CHANNEL_URL}" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 text-primary font-label font-bold uppercase tracking-widest text-xs hover:translate-x-2 duration-300 transition-transform">
          KANALI ZİYARET ET <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    `;
  }
}
