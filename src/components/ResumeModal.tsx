import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { CONTACT } from '../content'
import { cx } from '../lib'
import { buttonClass, Eyebrow, field, IconButton, label } from './ui'

interface Props {
	open: boolean
	onClose: () => void
	/** Shows a short confirmation after the visitor's email or WhatsApp app is opened. */
	onSent: (message: string) => void
}

/**
 * "Request resume" dialog. The request goes out through the visitor's own WhatsApp (wa.me) or email app (mailto:),
 * so no server or API key is needed.
 */
export function ResumeModal({ open, onClose, onSent }: Props) {
	const dialogRef = useRef<HTMLDivElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')

	const close = useCallback(() => {
		setError('')
		onClose()
	}, [onClose])

	useEffect(() => {
		if (!open) return
		const lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
		document.body.classList.add('overflow-hidden')
		const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 50)

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close()
			if (e.key !== 'Tab' || !dialogRef.current) return
			// keep focus inside the dialog
			const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>('button, input, textarea, a[href]')]
			const first = focusables[0]
			const last = focusables[focusables.length - 1]
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
	}, [open, close])

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const submitter = (e.nativeEvent as SubmitEvent).submitter
		const channel = submitter instanceof HTMLElement ? submitter.dataset.channel : 'email'
		const data = new FormData(e.currentTarget)
		const text = (key: string) => String(data.get(key) ?? '').trim()
		const name = text('name')
		const company = text('company')
		const contact = text('contact')
		const message = text('message') || 'Hi Nilesh, I would like to request a copy of your resume.'

		if (!name) {
			setError('Please add your name so I know who is asking.')
			nameRef.current?.focus()
			return
		}
		setError('')

		const details = [`Name: ${name}`]
		if (company) details.push(`Company / role: ${company}`)
		if (contact) details.push(`Reach me at: ${contact}`)
		const body = `${message}\n\n${details.join('\n')}\n\n(Sent from your portfolio)`

		if (channel === 'whatsapp') {
			window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener')
			onSent('Opening WhatsApp. Press send to deliver your request.')
		} else {
			const subject = `Resume request from ${name}${company ? ` (${company})` : ''}`
			window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
			onSent('Opening your email app. Press send to deliver your request.')
		}
		close()
	}

	return (
		<div
			id="resume-modal"
			ref={dialogRef}
			className="fixed inset-0 z-100 grid place-items-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="resume-title"
			hidden={!open}
		>
			<div className="absolute inset-0 animate-fade bg-[rgba(3,4,10,0.6)] backdrop-blur-[6px]" onClick={close} />
			<div className="relative max-h-[calc(100vh-32px)] w-[min(560px,100%)] animate-pop overflow-y-auto rounded-3xl border border-line-strong bg-panel p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] before:absolute before:top-0 before:inset-x-6 before:h-0.5 before:rounded-sm before:bg-(image:--gradient) before:content-[''] max-small:px-5 max-small:py-[26px]">
				<IconButton className="absolute top-4 right-4" aria-label="Close" onClick={close}>
					✕
				</IconButton>
				<Eyebrow>Resume request</Eyebrow>
				<h2 id="resume-title" className="mb-2 text-[1.7rem]">
					Get my latest resume
				</h2>
				<p className="mb-[22px] text-[0.95rem] text-muted">Fill this in and send it on WhatsApp or by email. I'll reply with my resume.</p>
				<form id="resume-form" noValidate onSubmit={onSubmit}>
					<div className="grid grid-cols-2 gap-x-3.5 max-small:grid-cols-1">
						<div className="mb-4">
							<label className={label} htmlFor="r-name">
								Your name *
							</label>
							<input ref={nameRef} className={field} type="text" id="r-name" name="name" required autoComplete="name" placeholder="Jane Doe" />
						</div>
						<div className="mb-4">
							<label className={label} htmlFor="r-company">
								Company / role
							</label>
							<input className={field} type="text" id="r-company" name="company" autoComplete="organization" placeholder="Acme Inc. · Hiring Manager" />
						</div>
					</div>
					<div className="mb-4">
						<label className={label} htmlFor="r-contact">
							Your email or phone
						</label>
						<input className={field} type="text" id="r-contact" name="contact" autoComplete="email" placeholder="So I know where to send it" />
					</div>
					<div className="mb-4">
						<label className={label} htmlFor="r-message">
							Message
						</label>
						<textarea
							className={cx(field, 'min-h-24 resize-y')}
							id="r-message"
							name="message"
							rows={4}
							defaultValue="Hi Nilesh, I came across your portfolio and would like to request a copy of your resume. Could you please share it with me?"
						/>
					</div>
					<p className="-mt-1 mb-2 min-h-[1em] text-[0.88rem] text-[#ef4444]" id="resume-error" role="alert">
						{error}
					</p>
					<div className="mt-1.5 grid grid-cols-2 gap-3 max-small:grid-cols-1">
						<button type="submit" className={buttonClass('whatsapp', 'md', 'w-full')} data-channel="whatsapp">
							<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
								<path
									fill="currentColor"
									d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z"
								/>
							</svg>
							Send on WhatsApp
						</button>
						<button type="submit" className={buttonClass('primary', 'md', 'w-full')} data-channel="email">
							<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
								<path fill="none" stroke="currentColor" strokeWidth="2" d="M3 6h18v12H3zM3 7l9 6 9-6" />
							</svg>
							Send by email
						</button>
					</div>
					<p className="mt-3.5 text-center text-[0.8rem] text-muted">Opens WhatsApp or your email app with the message ready. Just press send.</p>
				</form>
			</div>
		</div>
	)
}
