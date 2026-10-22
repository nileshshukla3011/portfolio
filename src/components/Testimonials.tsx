import { useEffect, useState, type FormEvent } from 'react'
import { cx } from '../lib'
import { Button, Eyebrow, field, glass, label } from './ui'

interface Testimonial {
	name: string
	role: string
	testimonial: string
	rating: number
	date: string
}

/** Testimonials are kept in the visitor's own browser; other visitors don't see them. */
const STORAGE_KEY = 'testimonials'

const readTestimonials = (): Testimonial[] => {
	try {
		const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
		return Array.isArray(saved) ? saved : []
	} catch {
		return []
	}
}

export function Testimonials() {
	const [items, setItems] = useState(readTestimonials)
	const [thanks, setThanks] = useState(false)

	useEffect(() => {
		if (!thanks) return
		const timer = window.setTimeout(() => setThanks(false), 2000)
		return () => window.clearTimeout(timer)
	}, [thanks])

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const data = new FormData(form)
		const text = (key: string) => String(data.get(key) ?? '')
		const next = [
			{ name: text('name'), role: text('role'), testimonial: text('testimonial'), rating: parseInt(text('rating'), 10), date: new Date().toISOString() },
			...readTestimonials(),
		]
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
		} catch {
			// storage blocked: show it for this visit only
		}
		setItems(next)
		form.reset()
		setThanks(true)
	}

	return (
		<section id="testimonials" className="wrap pt-[110px] max-small:pt-20">
			<Eyebrow className="reveal">04 — Testimonials</Eyebrow>
			<h2 className="reveal">Worked with me?</h2>
			<p className="reveal text-muted">Share your experience working with me, or leave a testimonial about my work.</p>

			<div className="mt-8 grid grid-cols-2 items-start gap-7 max-tablet:grid-cols-1 max-tablet:gap-6">
				<div className={cx(glass, 'reveal p-7')}>
					<h3 className="mb-[18px] text-[1.25rem]">Submit a testimonial</h3>
					<form id="testimonial-form" onSubmit={onSubmit}>
						<div className="mb-4">
							<label className={label} htmlFor="t-name">
								Your name
							</label>
							<input className={field} type="text" id="t-name" name="name" required />
						</div>
						<div className="mb-4">
							<label className={label} htmlFor="t-role">
								Your role / company
							</label>
							<input className={field} type="text" id="t-role" name="role" placeholder="e.g., Project Manager at ABC Corp" />
						</div>
						<div className="mb-4">
							<label className={label} htmlFor="t-text">
								Testimonial
							</label>
							<textarea
								className={cx(field, 'min-h-24 resize-y')}
								id="t-text"
								name="testimonial"
								rows={4}
								required
								placeholder="Share your experience working with Nilesh..."
							/>
						</div>
						<div className="mb-4">
							<label className={label} htmlFor="t-rating">
								Rating
							</label>
							<select className={cx(field, '[&_option]:bg-panel [&_option]:text-ink')} id="t-rating" name="rating" required defaultValue="">
								<option value="">Select rating</option>
								<option value="5">⭐⭐⭐⭐⭐ Excellent</option>
								<option value="4">⭐⭐⭐⭐ Very good</option>
								<option value="3">⭐⭐⭐ Good</option>
								<option value="2">⭐⭐ Fair</option>
								<option value="1">⭐ Poor</option>
							</select>
						</div>
						<Button type="submit" variant="primary">
							{thanks ? 'Thank you! ✓' : 'Submit testimonial'}
						</Button>
					</form>
				</div>

				<div className="reveal">
					<h3 className="mb-[18px] text-[1.25rem]">What people say</h3>
					<div id="testimonials-list" className="grid gap-3.5">
						{items.length === 0 ? (
							<p className="rounded-2xl border border-dashed border-line-strong p-7 text-center text-muted">
								No testimonials yet. Be the first to share your experience!
							</p>
						) : (
							items.map((t, i) => (
								<div key={`${t.date}-${i}`} className="rounded-2xl border border-line bg-surface p-5">
									<div>{'⭐'.repeat(Math.max(1, Math.min(5, t.rating | 0)))}</div>
									<div className="mt-2 mb-3 italic">"{t.testimonial}"</div>
									<div className="font-bold">{t.name}</div>
									<div className="text-[0.88rem] text-muted">{t.role}</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
