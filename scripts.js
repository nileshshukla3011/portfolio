(function(){
	const CONTACT = {
		email: 'nilesh.shukla47@gmail.com',
		whatsapp: '917366866911' // country code + number, no "+" (wa.me format)
	};

	const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const yearEl = document.getElementById('year');
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	// Theme toggle (dark by default)
	const toggle = document.getElementById('theme-toggle');
	if(toggle){
		const updateIcon = () => {
			toggle.textContent = document.documentElement.classList.contains('dark') ? '☀' : '☾';
		};
		updateIcon();
		toggle.addEventListener('click', ()=>{
			const isDark = document.documentElement.classList.toggle('dark');
			try{ localStorage.setItem('theme', isDark ? 'dark' : 'light'); }catch(e){}
			updateIcon();
		});
	}

	// Mobile menu
	const menuToggle = document.getElementById('menu-toggle');
	const primaryNav = document.getElementById('primary-nav');
	if(menuToggle && primaryNav){
		const setOpen = (open) => {
			primaryNav.classList.toggle('open', open);
			menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			menuToggle.textContent = open ? '✕' : '☰';
		};
		menuToggle.addEventListener('click', ()=> setOpen(!primaryNav.classList.contains('open')));
		primaryNav.addEventListener('click', (e)=>{ if(e.target.closest('a')) setOpen(false); });
	}

	// Header border on scroll + active nav link
	const header = document.querySelector('.site-header');
	window.addEventListener('scroll', ()=> header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
	const navLinks = [...document.querySelectorAll('.nav-links a')];
	const sectionObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(!entry.isIntersecting) return;
			navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
		});
	}, { rootMargin: '-45% 0px -50% 0px' });
	document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

	// Cursor glow + card spotlight
	const glow = document.querySelector('.cursor-glow');
	window.addEventListener('pointermove', (e)=>{
		if(glow){ glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
		const card = e.target.closest && e.target.closest('.feature, .card');
		if(card){
			const r = card.getBoundingClientRect();
			card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
			card.style.setProperty('--my', (e.clientY - r.top) + 'px');
		}
	}, { passive: true });

	// Reveal on scroll
	const revealObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				entry.target.classList.add('in');
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	const observeReveals = (root) => root.querySelectorAll('.reveal:not(.in)').forEach((el, i) => {
		if(!el.style.getPropertyValue('--d')) el.style.setProperty('--d', Math.min(i % 4, 3) * 0.08 + 's');
		revealObserver.observe(el);
	});
	observeReveals(document);

	// Rotating headline word
	const rotator = document.getElementById('rotator');
	if(rotator && !reduceMotion){
		const words = ['hospital software', 'AI job bots', 'admin consoles', 'fast websites', 'things that ship'];
		let wi = 0, ci = words[0].length, deleting = true;
		const tick = () => {
			let delay;
			if(deleting){
				rotator.textContent = words[wi].slice(0, --ci);
				delay = 45;
				if(ci === 0){ deleting = false; wi = (wi + 1) % words.length; delay = 300; }
			}else{
				rotator.textContent = words[wi].slice(0, ++ci);
				delay = 85;
				if(ci === words[wi].length){ deleting = true; delay = 2200; }
			}
			setTimeout(tick, delay);
		};
		setTimeout(tick, 2400);
	}

	// Count-up stats
	const countObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(!entry.isIntersecting) return;
			const el = entry.target;
			const target = +el.dataset.count, suffix = el.dataset.suffix || '';
			countObserver.unobserve(el);
			if(reduceMotion){ el.textContent = target.toLocaleString('en-IN') + suffix; return; }
			const start = performance.now(), dur = 1400;
			const step = (now) => {
				const p = Math.min((now - start) / dur, 1);
				const eased = 1 - Math.pow(1 - p, 3);
				el.textContent = Math.round(target * eased).toLocaleString('en-IN') + (p === 1 ? suffix : '');
				if(p < 1) requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		});
	}, { threshold: 0.6 });
	document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

	// Projects
	const previews = {
		jobbot: () => `
			<div class="win-bar"><i></i><i></i><i></i><b>job-bot · matches</b></div>
			<div class="win-body">
				<div class="row"><span class="score hi">92</span><span class="grow">Frontend Engineer <small>· Bengaluru</small></span><span class="chip go">Auto-fill</span></div>
				<div class="row"><span class="score hi">87</span><span class="grow">Full-stack Developer <small>· Remote</small></span><span class="chip">Cover note</span></div>
				<div class="row"><span class="score mid">74</span><span class="grow">React Developer <small>· Pune</small></span><span class="chip">Applied ✓</span></div>
				<div class="row"><span class="score lo">41</span><span class="grow">Java Lead <small>· dropped: 8+ yrs</small></span><span class="chip">Why?</span></div>
			</div>`,
		cms: () => `
			<div class="win-bar"><i></i><i></i><i></i><b>cms · agent queue</b></div>
			<div class="win-body">
				<div class="row"><span class="prio p1"></span><span class="grow">Ventilator alarm, ICU-2 <small>· Biomedical</small></span><span class="sla warn">SLA 0:42</span></div>
				<div class="row"><span class="prio p2"></span><span class="grow">AC not cooling, Ward 7 <small>· Electrical</small></span><span class="sla">SLA 3:10</span></div>
				<div class="row"><span class="prio p3"></span><span class="grow">Printer offline, OPD counter <small>· IT</small></span><span class="sla">SLA 6:55</span></div>
				<div class="row"><span class="prio p3"></span><span class="grow">KB: "Reset HIS password" <small>· solved it</small></span><span class="chip">Deflected</span></div>
			</div>`,
		mortuary: () => {
			const states = ['on','','on','on','alert','','on','','','on','on','','on','on','','','on',''];
			return `
			<div class="win-bar"><i></i><i></i><i></i><b>mortuary · chambers</b></div>
			<div class="win-body">
				<div class="chambers">${states.map((s, i) => `<div class="chamber ${s}">C${String(i + 1).padStart(2, '0')}</div>`).join('')}</div>
				<div class="legend"><span class="l-on">Occupied</span><span>Free</span><span class="l-al">Alert</span></div>
			</div>`;
		},
		mgims: () => `
			<div class="win-bar"><i></i><i></i><i></i><b>mgims.ac.in</b></div>
			<div class="win-body">
				<div class="site-nav"><span class="crest"></span><span class="bar" style="width:30%"></span><span style="flex:1"></span><span class="bar" style="width:12%"></span><span class="bar" style="width:12%"></span><span class="bar" style="width:12%"></span></div>
				<div class="site-hero"><span class="bar" style="width:60%"></span><span class="bar" style="width:38%;opacity:.6"></span></div>
				<div class="site-cards"><div></div><div></div><div></div></div>
			</div>`,
		naturefrost: () => `
			<div class="win-bar"><i></i><i></i><i></i><b>nature frost · products</b></div>
			<div class="win-body"><div class="produce"><div>🍓</div><div>🫐</div><div>🥦</div><div>🌽</div></div></div>`
	};

	const actionsHtml = (p) => `${p.demo ? `<a class="button" href="${escapeHtml(p.demo)}" target="_blank" rel="noopener">Live ↗</a>` : ''}${p.repo ? `<a class="button" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">Code ↗</a>` : ''}`;
	const tagsHtml = (tags) => (tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join('');

	fetch('data/projects.json')
		.then(r => r.json())
		.then(({ featured = [], earlier = [] }) => {
			const bento = document.getElementById('featured-grid');
			if(bento){
				bento.innerHTML = featured.map(p => {
					const actions = actionsHtml(p);
					return `<article class="feature reveal">
						<div class="preview" aria-hidden="true"><div class="window">${previews[p.preview] ? previews[p.preview]() : ''}</div>${p.preview === 'cms' ? '<div class="scan"></div>' : ''}</div>
						<div class="feature-body">
							<div class="feature-top"><span class="kicker">${escapeHtml(p.kicker)}</span><span class="status">${escapeHtml(p.status)}</span></div>
							<h3>${escapeHtml(p.title)}</h3>
							<p>${escapeHtml(p.description)}</p>
							${p.highlights ? `<ul class="highlights">${p.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}</ul>` : ''}
							<div class="meta">${tagsHtml(p.tags)}</div>
							${actions ? `<div class="actions">${actions}</div>` : ''}
						</div>
					</article>`;
				}).join('');
				observeReveals(bento);
			}
			const grid = document.getElementById('projects-grid');
			if(grid){
				grid.innerHTML = earlier.map(p => `<article class="card reveal">
					<h3>${escapeHtml(p.title)}</h3>
					<p>${escapeHtml(p.description)}</p>
					<div class="meta">${tagsHtml(p.tags)}</div>
					<div class="actions">${actionsHtml(p)}</div>
				</article>`).join('');
				observeReveals(grid);
			}
		})
		.catch(()=>{
			// Silent fail if no data
		});

	// Toast
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.setAttribute('role', 'status');
	document.body.appendChild(toast);
	let toastTimer;
	const showToast = (msg) => {
		toast.textContent = msg;
		toast.classList.add('show');
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
	};

	// Resume request dialog
	const modal = document.getElementById('resume-modal');
	const resumeForm = document.getElementById('resume-form');
	const resumeError = document.getElementById('resume-error');
	let lastFocus = null;

	const openModal = () => {
		lastFocus = document.activeElement;
		modal.hidden = false;
		document.body.classList.add('modal-open');
		resumeError.textContent = '';
		setTimeout(() => document.getElementById('r-name').focus(), 50);
	};
	const closeModal = () => {
		modal.hidden = true;
		document.body.classList.remove('modal-open');
		if(lastFocus) lastFocus.focus();
	};
	document.querySelectorAll('[data-open-resume]').forEach(b => b.addEventListener('click', openModal));
	modal.querySelectorAll('[data-close-resume]').forEach(b => b.addEventListener('click', closeModal));
	document.addEventListener('keydown', (e) => {
		if(modal.hidden) return;
		if(e.key === 'Escape') closeModal();
		if(e.key === 'Tab'){
			// keep focus inside the dialog
			const focusables = [...modal.querySelectorAll('button, input, textarea, a[href]')];
			const first = focusables[0], last = focusables[focusables.length - 1];
			if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
			else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
		}
	});

	resumeForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const channel = (e.submitter && e.submitter.dataset.channel) || 'email';
		const data = new FormData(resumeForm);
		const name = (data.get('name') || '').trim();
		const company = (data.get('company') || '').trim();
		const contact = (data.get('contact') || '').trim();
		const message = (data.get('message') || '').trim() || 'Hi Nilesh, I would like to request a copy of your resume.';

		if(!name){
			resumeError.textContent = 'Please add your name so I know who is asking.';
			document.getElementById('r-name').focus();
			return;
		}
		resumeError.textContent = '';

		const details = [`Name: ${name}`];
		if(company) details.push(`Company / role: ${company}`);
		if(contact) details.push(`Reach me at: ${contact}`);
		const body = `${message}\n\n${details.join('\n')}\n\n(Sent from your portfolio)`;

		if(channel === 'whatsapp'){
			window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
			showToast('Opening WhatsApp. Press send to deliver your request.');
		}else{
			const subject = `Resume request from ${name}${company ? ' (' + company + ')' : ''}`;
			window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			showToast('Opening your email app. Press send to deliver your request.');
		}
		closeModal();
	});

	// Testimonials (saved in this browser)
	const testimonialForm = document.getElementById('testimonial-form');
	const testimonialsList = document.getElementById('testimonials-list');
	const readTestimonials = () => {
		try{ return JSON.parse(localStorage.getItem('testimonials') || '[]'); }catch(e){ return []; }
	};

	const loadTestimonials = () => {
		const testimonials = readTestimonials();
		if(testimonials.length === 0){
			testimonialsList.innerHTML = '<p class="empty-note">No testimonials yet. Be the first to share your experience!</p>';
			return;
		}
		testimonialsList.innerHTML = testimonials.map(t => `
			<div class="testimonial-card">
				<div class="rating">${'⭐'.repeat(Math.max(1, Math.min(5, t.rating | 0)))}</div>
				<div class="text">"${escapeHtml(t.testimonial)}"</div>
				<div class="author">${escapeHtml(t.name)}</div>
				<div class="role">${escapeHtml(t.role)}</div>
			</div>
		`).join('');
	};

	if(testimonialForm){
		testimonialForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(testimonialForm);
			const testimonials = readTestimonials();
			testimonials.unshift({
				name: formData.get('name'),
				role: formData.get('role'),
				testimonial: formData.get('testimonial'),
				rating: parseInt(formData.get('rating'), 10),
				date: new Date().toISOString()
			});
			try{ localStorage.setItem('testimonials', JSON.stringify(testimonials)); }catch(err){}
			loadTestimonials();
			testimonialForm.reset();

			const button = testimonialForm.querySelector('button[type="submit"]');
			const originalText = button.textContent;
			button.textContent = 'Thank you! ✓';
			setTimeout(() => { button.textContent = originalText; }, 2000);
		});
	}

	loadTestimonials();
})();
