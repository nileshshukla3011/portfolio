(function(){
	const yearEl = document.getElementById('year');
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const savedTheme = localStorage.getItem('theme');
	if(savedTheme === 'dark' || (!savedTheme)){
		document.documentElement.classList.add('dark');
	}
	const toggle = document.getElementById('theme-toggle');
	if(toggle){
		const updateIcon = () => {
			const isDark = document.documentElement.classList.contains('dark');
			toggle.textContent = isDark ? '☀' : '☾';
		};
		
		updateIcon(); // Set initial icon
		
		toggle.addEventListener('click', ()=>{
			document.documentElement.classList.toggle('dark');
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			updateIcon();
		});
	}

	const menuToggle = document.getElementById('menu-toggle');
	const primaryNav = document.getElementById('primary-nav');
	if(menuToggle && primaryNav){
		menuToggle.addEventListener('click', ()=>{
			const isOpen = primaryNav.classList.toggle('open');
			menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
	}

	fetch('/data/projects.json')
		.then(r=>r.json())
		.then(projects=>{
			const grid = document.getElementById('projects-grid');
			if(!grid) return;
			grid.innerHTML = projects.map(p=>`<article class="card">
				<h3>${p.title}</h3>
				<p>${p.description}</p>
				<div class="meta">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>
				<div class="actions">
					${p.demo ? `<a class="button" href="${p.demo}" target="_blank" rel="noopener">Live</a>` : ''}
					${p.repo ? `<a class="button" href="${p.repo}" target="_blank" rel="noopener">Code</a>` : ''}
				</div>
			</article>`).join('');
		})
		.catch(()=>{
			// Silent fail if no data
		});
})();
