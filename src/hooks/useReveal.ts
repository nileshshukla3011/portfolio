import { useEffect } from 'react'

/**
 * Fades `.reveal` elements in as they scroll into view. Elements are staggered in groups of four;
 * each [data-reveal-group] container is staggered on its own.
 */
export function useReveal() {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					entry.target.classList.add('in')
					observer.unobserve(entry.target)
				}
			},
			{ threshold: 0.12 },
		)
		const observe = (elements: Element[]) =>
			elements.forEach((el, i) => {
				const style = (el as HTMLElement).style
				if (!style.getPropertyValue('--d')) style.setProperty('--d', `${(Math.min(i % 4, 3) * 0.08).toFixed(2)}s`)
				observer.observe(el)
			})

		const pending = [...document.querySelectorAll('.reveal:not(.in)')]
		observe(pending.filter((el) => !el.closest('[data-reveal-group]')))
		document.querySelectorAll('[data-reveal-group]').forEach((group) => observe([...group.querySelectorAll('.reveal:not(.in)')]))
		return () => observer.disconnect()
	}, [])
}
