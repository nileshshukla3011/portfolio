// Text and links shown on the site. Projects live in data/projects.json.

/** Where resume requests are sent. */
export const CONTACT = {
	email: 'nilesh.shukla47@gmail.com',
	whatsapp: '917366866911', // country code + number, no "+" (wa.me format)
	phone: '+917366866911',
}

export const NAV = [
	{ id: 'about', label: 'About' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'testimonials', label: 'Testimonials' },
	{ id: 'contact', label: 'Contact' },
]

/** Words typed after "I build" in the headline. */
export const ROTATOR_WORDS = ['hospital software', 'AI job bots', 'admin consoles', 'fast websites', 'things that ship']

export const STATS = [
	{ value: 5, label: 'recent projects shipped' },
	{ value: 300, suffix: '+', label: 'DSA problems solved' },
	{ value: 1500, suffix: '+', label: 'attendees at events I led' },
]

/** The scrolling strip under the hero. */
export const MARQUEE = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Gemini AI', 'Playwright', 'Vite', 'Solidity']

export const SKILLS = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Tailwind']

export interface Job {
	role: string
	org: string
	/** Dates or a short label, shown left of the timeline. */
	period: string
	place?: string
	/** A git-style label next to the role, e.g. "HEAD → main". */
	tag?: string
	/** One line each. Wrap words in **double stars** to make them bold. */
	points: string[]
}

/** Newest first. The first entry is drawn as the current role (filled node). */
export const EXPERIENCE: Job[] = [
	{
		role: 'Full-stack developer · Healthcare projects',
		org: 'MGIMS Sevagram',
		period: 'Now',
		tag: 'HEAD → main',
		points: [
			'Complaint management system: tickets by department, SLA clocks with business hours, a knowledge base and Staff / Agent / Admin roles.',
			'Mortuary module of the hospital information system: chamber dashboard, autopsy, transfer and family release workflows.',
			'The public website and its admin console, built to the UX4G design handbook with automated accessibility tests.',
		],
	},
	{
		role: 'Frontend Developer',
		org: 'Blockchain Council',
		period: 'Sep 2024 – Dec 2024',
		place: 'Remote',
		points: [
			'Built the social platform’s frontend from scratch in Next.js, TypeScript and Redux, wired to backend APIs with Axios.',
			'Shipped Daily Challenges — monthly challenges with text and image submissions — lifting user engagement by **21%**.',
			'Built the admin dashboard for user reports, analytics and challenge reviews with React, Tailwind CSS and Chart.js.',
		],
	},
	{
		role: 'MERN Stack Developer',
		org: 'VEGFED',
		period: 'Jan 2024 – Jun 2024',
		place: 'Remote',
		points: [
			'Built and maintained MERN web apps with React, Node.js and MongoDB, improving user interaction and backend performance.',
			'Integrated APIs and optimized RESTful services for smoother frontend–backend communication.',
			'Built responsive UI components in Tailwind CSS and JavaScript alongside the design and product teams.',
		],
	},
	{
		role: 'Blockchain Research',
		org: 'DRDO',
		period: 'Jun 2023 – Aug 2023',
		place: 'New Delhi',
		tag: 'tag: letter-of-recommendation',
		points: [
			'Worked on a Hyperledger Fabric blockchain network, analyzing complex data structures.',
			'Wrote and deployed chaincode in Go to improve system performance.',
			'Contributed to web3 applications with a focus on data integrity and security.',
		],
	},
	{
		role: 'Management Lead',
		org: 'Google Developer Student Club, GBU',
		period: 'Leadership',
		points: [
			'Organised GDSC WOW Delhi NCR and Winterlude for **1,500+** attendees.',
			'Ran workshops and mentoring sessions that reached 500+ people.',
		],
	},
]

export const SOCIALS = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/nilesh-shukla-02a15299/' },
	{ label: 'GitHub', href: 'https://github.com/nileshshukla3011' },
	{ label: 'X / Twitter', href: 'https://x.com/nileshshukla30' },
]
