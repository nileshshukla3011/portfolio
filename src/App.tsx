import { useCallback, useEffect, useRef, useState } from 'react'
import { About, Marquee } from './components/About'
import { Background } from './components/Background'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { ResumeModal } from './components/ResumeModal'
import { Testimonials } from './components/Testimonials'
import { usePointerEffects } from './hooks/usePointerEffects'
import { useReveal } from './hooks/useReveal'
import { cx } from './lib'

export default function App() {
	const glowRef = useRef<HTMLDivElement>(null)
	const [resumeOpen, setResumeOpen] = useState(false)
	const openResume = useCallback(() => setResumeOpen(true), [])
	const closeResume = useCallback(() => setResumeOpen(false), [])
	const toast = useToast()

	useReveal()
	usePointerEffects(glowRef)

	return (
		<>
			<Background glowRef={glowRef} />
			<Header onRequestResume={openResume} />
			<main id="home">
				<Hero onRequestResume={openResume} />
				<Marquee />
				<About />
				<Projects />
				<Experience />
				<Testimonials />
				<Contact onRequestResume={openResume} />
			</main>
			<Footer />
			<ResumeModal open={resumeOpen} onClose={closeResume} onSent={toast.show} />
			<div
				role="status"
				className={cx(
					'pointer-events-none fixed bottom-6 left-1/2 z-120 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[14px] border border-line-strong bg-panel px-[18px] py-3 text-[0.92rem] font-semibold shadow-soft transition-all duration-350',
					toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
				)}
			>
				{toast.message}
			</div>
		</>
	)
}

/** A short status message at the bottom of the screen for 3.5 seconds. */
function useToast() {
	const [message, setMessage] = useState('')
	const [visible, setVisible] = useState(false)
	const timer = useRef(0)
	const show = useCallback((text: string) => {
		setMessage(text)
		setVisible(true)
		window.clearTimeout(timer.current)
		timer.current = window.setTimeout(() => setVisible(false), 3500)
	}, [])
	useEffect(() => () => window.clearTimeout(timer.current), [])
	return { message, visible, show }
}
