import { CONTACT, SOCIALS } from '../content'
import { gradientText } from './Hero'
import { Button, buttonClass, Eyebrow } from './ui'

const hireMail = `mailto:${CONTACT.email}?subject=Hire%20Nilesh%20for%20a%20project&body=Hi%20Nilesh%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20project%20with%20you.`

export function Contact({ onRequestResume }: { onRequestResume: () => void }) {
	return (
		<section id="contact" className="wrap pt-[110px] max-small:pt-20">
			<div className="reveal relative overflow-hidden rounded-[28px] border border-line-strong bg-surface bg-(image:--cta-bg) px-[clamp(20px,5vw,64px)] py-[clamp(40px,7vw,80px)] text-center">
				<Eyebrow>05 — Contact</Eyebrow>
				<h2 className="mx-auto max-w-[18ch] text-[length:clamp(2rem,5vw,3.4rem)]">
					Let's build something <span className={gradientText}>people rely on.</span>
				</h2>
				<p className="mx-auto mt-[18px] max-w-[56ch] text-muted">
					I'm available for full-time roles, contract work and freelance projects. Want my resume? Send a quick request and it'll reach me on
					email or WhatsApp.
				</p>
				<div className="mt-[30px] flex flex-wrap justify-center gap-3">
					<Button variant="primary" onClick={onRequestResume}>
						Request resume
					</Button>
					<a className={buttonClass()} href={hireMail}>
						Email me
					</a>
					<a className={buttonClass()} href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">
						WhatsApp
					</a>
					<a className={buttonClass()} href={`tel:${CONTACT.phone}`}>
						Call
					</a>
				</div>
				<div className="mt-7 flex flex-wrap justify-center gap-6 font-medium text-muted">
					{SOCIALS.map((s) => (
						<a key={s.href} className="transition-colors hover:text-accent-2" href={s.href} target="_blank" rel="noopener">
							{s.label} ↗
						</a>
					))}
				</div>
			</div>
		</section>
	)
}

export function Footer() {
	return (
		<footer className="mt-[100px] border-t border-line py-7 text-[0.9rem] text-muted">
			<div className="wrap flex flex-wrap justify-between gap-4">
				<p>
					© <span id="year">{new Date().getFullYear()}</span> Nilesh Kumar Shukla
				</p>
				<a className="hover:text-ink" href="#home">
					Back to top ↑
				</a>
			</div>
		</footer>
	)
}
