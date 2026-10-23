import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'button, input, textarea, a[href]'

/**
 * Dialog behaviour shared by the site's modals: locks page scroll, closes on Escape, keeps Tab focus inside
 * the dialog, and puts focus back where it was on close. Focus starts on `initialFocusRef`, or else on the
 * dialog's first control.
 */
export function useModal(
	open: boolean,
	onClose: () => void,
	dialogRef: RefObject<HTMLElement | null>,
	initialFocusRef?: RefObject<HTMLElement | null>,
) {
	useEffect(() => {
		if (!open) return
		const focusables = () => [...(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])]
		const lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
		document.body.classList.add('overflow-hidden')
		const focusTimer = window.setTimeout(() => (initialFocusRef?.current ?? focusables()[0])?.focus(), 50)

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			if (e.key !== 'Tab' || !dialogRef.current) return
			const all = focusables()
			const first = all[0]
			const last = all[all.length - 1]
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
		document.addEventListener('keydown', onKey)
		return () => {
			window.clearTimeout(focusTimer)
			document.removeEventListener('keydown', onKey)
			document.body.classList.remove('overflow-hidden')
			lastFocus?.focus()
		}
	}, [open, onClose, dialogRef, initialFocusRef])
}
