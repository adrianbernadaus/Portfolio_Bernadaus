
export function renderBentoGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
      
      <div class="group relative md:col-span-1 rounded-[2rem] bg-neutral-900/40 border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-white/10 transition-colors">
        <div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="z-10">
          <span class="text-xs font-medium tracking-widest text-neutral-500 uppercase">Base Operations</span>
          <h3 class="text-2xl font-space font-bold text-white mt-1">Zaragoza, ES</h3>
        </div>

        <div class="z-10">
          <div class="text-5xl font-mono font-light text-white tracking-tighter" id="clock-display">00:00</div>
          <div class="flex items-center gap-2 mt-4 text-emerald-400 text-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Online / Creating
          </div>
        </div>
      </div>

      <div class="group relative md:col-span-1 rounded-[2rem] bg-neutral-900/40 border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-white/10 transition-colors cursor-pointer" onclick="window.open('https://github.com/adrianbernadaus', '_blank')">
        <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="z-10 flex justify-between items-start">
          <div>
            <span class="text-xs font-medium tracking-widest text-neutral-500 uppercase">Github Intel</span>
            <h3 class="text-2xl font-space font-bold text-white mt-1">Open Source</h3>
          </div>
          <svg class="w-8 h-8 text-white opacity-50 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </div>

        <div class="z-10 space-y-4" id="github-stats">
           <div class="animate-pulse space-y-2">
             <div class="h-4 bg-white/10 rounded w-3/4"></div>
             <div class="h-4 bg-white/10 rounded w-1/2"></div>
           </div>
        </div>
      </div>

      <div class="group relative md:col-span-1 rounded-[2rem] bg-neutral-900/40 border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-white/10 transition-colors animate-glass-sheen">
        
        <div class="z-10">
          <span class="text-xs font-medium tracking-widest text-neutral-500 uppercase">Deployment</span>
          <h3 class="text-2xl font-space font-bold text-white mt-1">BernadausAnim</h3>
        </div>

        <p class="text-neutral-400 text-sm leading-relaxed z-10">
          My private animation engine. Physics-based, smooth, and multinational-grade. Published on NPM.
        </p>

        <a href="https://www.npmjs.com/package/bernadausanim" target="_blank" class="z-10 flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-xl transition-colors group/btn">
          <span class="font-mono text-sm text-neutral-300">npm i bernadausanim</span>
          <svg class="w-4 h-4 text-white transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>

    </div>
  `;

  const clockEl = document.getElementById('clock-display');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Madrid'
      });
    };
    setInterval(updateClock, 1000);
    updateClock();
  }

  fetchGitHubStats();
}

async function fetchGitHubStats() {
  const statsEl = document.getElementById('github-stats');
  if (!statsEl) return;

  try {
    const userRes = await fetch('https://api.github.com/users/adrianbernadaus');
    const userData = await userRes.json();

    if (userData.login) {
      statsEl.innerHTML = `
        <div class="flex flex-col gap-1">
          <span class="text-sm text-neutral-400">Public Repos</span>
          <span class="text-3xl font-mono font-light text-white">${userData.public_repos}</span>
        </div>
        <div class="w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
             <div class="bg-purple-500 h-full w-full animate-progress-indeterminate"></div>
        </div>
        <div class="text-[10px] text-neutral-500 font-mono mt-1 uppercase tracking-widest">
            Fetching latest commit...
        </div>
      `;
    }
  } catch (err) {
    statsEl.innerHTML = `<span class="text-red-500 text-sm">Offline</span>`;
  }
}
