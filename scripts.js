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

	// Testimonials functionality
	const testimonialForm = document.getElementById('testimonial-form');
	const testimonialsList = document.getElementById('testimonials-list');
	
	// Load testimonials from localStorage
	const loadTestimonials = () => {
		const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
		if(testimonials.length === 0) {
			testimonialsList.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px;">No testimonials yet. Be the first to share your experience!</p>';
			return;
		}
		
		testimonialsList.innerHTML = testimonials.map(t => `
			<div class="testimonial-card">
				<div class="rating">${'⭐'.repeat(t.rating)}</div>
				<div class="text">"${t.testimonial}"</div>
				<div class="author">${t.name}</div>
				<div class="role">${t.role || ''}</div>
			</div>
		`).join('');
	};
	
	// Handle form submission
	if(testimonialForm) {
		testimonialForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const formData = new FormData(testimonialForm);
			const testimonial = {
				name: formData.get('name'),
				role: formData.get('role'),
				testimonial: formData.get('testimonial'),
				rating: parseInt(formData.get('rating')),
				date: new Date().toISOString()
			};
			
			// Save to localStorage
			const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
			testimonials.unshift(testimonial); // Add to beginning
			localStorage.setItem('testimonials', JSON.stringify(testimonials));
			
			// Reload testimonials
			loadTestimonials();
			
			// Reset form
			testimonialForm.reset();
			
			// Show success message
			const button = testimonialForm.querySelector('button[type="submit"]');
			const originalText = button.textContent;
			button.textContent = 'Thank you! ✓';
			button.style.background = 'var(--brand)';
			setTimeout(() => {
				button.textContent = originalText;
				button.style.background = '';
			}, 2000);
		});
	}
	
	// Load testimonials on page load
	loadTestimonials();
})();
