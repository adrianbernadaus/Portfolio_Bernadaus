
export function renderDock(containerId) {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div class="flex items-end gap-2 px-4 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full" id="dock-bar">
        </div>
    `;

    const dockBar = container.querySelector('#dock-bar');

    const actions = {
        home: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        work: () => document.getElementById('bento-grid-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        github: () => window.open('https://github.com/adrianbernadaus', '_blank'),
        mail: () => window.location.href = 'mailto:contact@adrianbernadaus.com'
    };

    const items = [
        { id: 'home', label: 'Home', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
        { id: 'work', label: 'Work', icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>' },
        { id: 'github', label: 'Code', icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>' },
        { id: 'mail', label: 'Mail', icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' }
    ];

    items.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-white cursor-pointer hover:bg-neutral-700 transition-all duration-200 relative group dock-icon origin-bottom';
        btn.onclick = actions[item.id];

        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
            <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                ${item.label}
            </span>
        `;
        dockBar.appendChild(btn);
    });

    const icons = dockBar.querySelectorAll('.dock-icon');
    const baseScale = 1;
    const maxScale = 1.6;
    const radius = 120;

    let mouseX = 0;

    dockBar.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;

        requestAnimationFrame(() => {
            icons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(mouseX - iconCenterX);

                if (distance < radius) {
                    const scaleAmount = Math.cos((distance / radius) * (Math.PI / 2));
                    const scale = baseScale + (scaleAmount * (maxScale - baseScale));

                    icon.style.transform = `scale(${scale})`;
                    icon.style.setProperty('z-index', '10');
                } else {
                    icon.style.transform = 'scale(1)';
                    icon.style.removeProperty('z-index');
                }
            });
        });
    });

    dockBar.addEventListener('mouseleave', () => {
        window.requestAnimationFrame(() => {
            icons.forEach(icon => {
                icon.style.transform = 'scale(1)';
                icon.style.removeProperty('z-index');
            });
        });
    });
}
