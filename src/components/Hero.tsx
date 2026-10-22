import { useEffect, useRef } from 'react'
import { ROTATOR_WORDS, STATS } from '../content'
import { useTypewriter } from '../hooks/useTypewriter'
import { asset, cx, prefersReducedMotion } from '../lib'
import { Button, buttonClass } from './ui'

export const gradientText = 'bg-(image:--gradient) bg-clip-text text-transparent'

const chip =
	'absolute inline-flex animate-bob items-center gap-2 whitespace-nowrap rounded-[14px] border border-line-strong bg-[color-mix(in_srgb,var(--bg-2)_80%,transparent)] px-3.5 py-2.5 text-[0.85rem] font-semibold shadow-soft backdrop-blur-[12px] max-phone:px-2.5 max-phone:py-[7px] max-phone:text-[0.75rem]'

export function Hero({ onRequestResume }: { onRequestResume: () => void }) {
	const word = useTypewriter(ROTATOR_WORDS)

	return (
		<section className="wrap grid min-h-[calc(100vh-70px)] grid-cols-[1.25fr_0.9fr] items-center gap-12 pt-14 pb-18 max-tablet:min-h-0 max-tablet:grid-cols-1 max-tablet:gap-14 max-tablet:pt-10">
			<div className="min-w-0">
				<p className="reveal mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.85rem] text-muted">
					<span className="relative size-2 rounded-full bg-accent-3 after:absolute after:inset-0 after:animate-ping-dot after:rounded-full after:bg-accent-3 after:content-['']" />
					Open to full-time roles &amp; freelance work
				</p>
				<h1 className="reveal text-[length:clamp(2.2rem,5.6vw,4.6rem)] max-tiny:text-[2rem]">
					Hi, I'm Nilesh.
					<br />I build{' '}
					{/* own line + nowrap so the typing never reflows the page */}
					<span className="block min-h-[1.12em] whitespace-nowrap">
						<span id="rotator" className={gradientText}>
							{word}
						</span>
						<span className="ml-0.5 animate-blink font-normal text-accent-2" aria-hidden="true">
							|
						</span>
					</span>
				</h1>
				<p className="reveal mt-[22px] max-w-[58ch] text-[length:clamp(1rem,1.6vw,1.15rem)] text-muted">
					Full-stack developer working across React, Node.js and Python. Lately I've been shipping software for{' '}
					<strong className="text-ink">MGIMS Sevagram</strong>: a complaint management system, a mortuary module and the public website. On
					the side I built an AI bot that hunts jobs for me.
				</p>
				<div className="reveal mt-8 flex flex-wrap gap-3">
					<a className={buttonClass('primary', 'md', 'max-phone:flex-auto')} href="#projects">
						See my work <span aria-hidden="true">→</span>
					</a>
					<Button variant="glow" className="max-phone:flex-auto" onClick={onRequestResume}>
						Request resume
					</Button>
					<a className={buttonClass('ghost', 'md', 'max-phone:flex-auto')} href="#contact">
						Contact
					</a>
				</div>
				<ul className="reveal mt-11 flex flex-wrap gap-9 max-phone:gap-[22px]">
					{STATS.map((stat) => (
						<li key={stat.label}>
							<CountUp to={stat.value} suffix={stat.suffix} />
							<span className="text-[0.85rem] text-muted">{stat.label}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="reveal relative w-[min(400px,84%)] justify-self-center max-tablet:order-first max-tablet:w-[min(300px,78%)]">
				<div className="photo-ring relative aspect-square animate-ring rounded-full p-1.5 shadow-soft">
					<img
						className="size-full rounded-full border-6 border-page object-cover"
						src={asset('assets/photo_profile_square.jpg')}
						alt="Portrait of Nilesh Kumar Shukla"
					/>
				</div>
				<div className={cx(chip, 'top-[8%] -left-[12%] max-small:-left-[6%]')}>
					<span className="inline-block size-2 rounded-full bg-accent-3 shadow-[0_0_10px_var(--accent-3)]" />
					CMS · SLA on track
				</div>
				<div className={cx(chip, 'bottom-[16%] -right-[8%] [animation-delay:-1.6s] max-small:-right-[6%]')}>
					<span className="font-mono text-[0.85em] text-muted">match</span> 92%
				</div>
				<div className={cx(chip, '-bottom-[4%] left-[4%] [animation-delay:-3.2s]')}>⚡ React · Node · Python</div>
			</div>
		</section>
	)
}

/** Counts up to `to` the first time it is on screen. */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
	const ref = useRef<HTMLElement>(null)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		let frame = 0
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				observer.disconnect()
				if (prefersReducedMotion()) {
					el.textContent = to.toLocaleString('en-IN') + suffix
					return
				}
				const start = performance.now()
				const step = (now: number) => {
					const progress = Math.min((now - start) / 1400, 1)
					const eased = 1 - Math.pow(1 - progress, 3)
					el.textContent = Math.round(to * eased).toLocaleString('en-IN') + (progress === 1 ? suffix : '')
					if (progress < 1) frame = requestAnimationFrame(step)
				}
				frame = requestAnimationFrame(step)
			},
			{ threshold: 0.6 },
		)
		observer.observe(el)
		return () => {
			observer.disconnect()
			cancelAnimationFrame(frame)
		}
	}, [to, suffix])
	return (
		<strong ref={ref} className="block font-display text-[2rem] leading-none max-phone:text-[1.6rem]">
			0
		</strong>
	)
}
