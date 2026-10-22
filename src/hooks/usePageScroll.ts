import { useEffect, useState } from 'react'

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 10) {
	const [scrolled, setScrolled] = useState(() => window.scrollY > offset)
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > offset)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [offset])
	return scrolled
}

/** Id of the `main section[id]` in the middle of the screen, for the active nav link. */
export function useActiveSection() {
	const [active, setActive] = useState('')
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
			},
			{ rootMargin: '-45% 0px -50% 0px' },
		)
		document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [])
	return active
}
