import { useEffect, type RefObject } from 'react'

/** Moves the cursor glow, and lights the [data-spotlight] card under the pointer. */
export function usePointerEffects(glowRef: RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			const glow = glowRef.current
			if (glow) {
				glow.style.left = `${e.clientX}px`
				glow.style.top = `${e.clientY}px`
			}
			const target = e.target instanceof Element ? e.target : null
			const card = target?.closest<HTMLElement>('[data-spotlight]')
			if (card) {
				const rect = card.getBoundingClientRect()
				card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
				card.style.setProperty('--my', `${e.clientY - rect.top}px`)
			}
		}
		window.addEventListener('pointermove', onMove, { passive: true })
		return () => window.removeEventListener('pointermove', onMove)
	}, [glowRef])
}
