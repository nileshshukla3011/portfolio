import { useState } from 'react'

/** Dark by default; the choice is saved in localStorage and applied before paint by index.html. */
export function useTheme() {
	const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
	const toggle = () => {
		const isDark = document.documentElement.classList.toggle('dark')
		try {
			localStorage.setItem('theme', isDark ? 'dark' : 'light')
		} catch {
			// storage blocked: the theme still changes for this visit
		}
		setDark(isDark)
	}
	return [dark, toggle] as const
}
