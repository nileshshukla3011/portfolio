import { EXPERIENCE } from '../content'
import { cx } from '../lib'
import { Eyebrow, Prompt, Rich } from './ui'

/** A `git log --graph` style timeline: dates on the left, a commit node per role, changes as "+" lines. */
export function Experience() {
	return (
		<section id="experience" className="wrap pt-[110px] max-small:pt-20">
			<Eyebrow className="reveal">03 — Experience</Eyebrow>
			<h2 className="reveal">Where I've worked</h2>
			<Prompt className="reveal mt-5" command='git log --graph --author="nilesh"' />

			<ol className="mt-10">
				{EXPERIENCE.map((job, i) => {
					const last = i === EXPERIENCE.length - 1
					const when = [job.period, job.place].filter(Boolean)
					return (
						<li key={job.org} className="reveal flex gap-[clamp(14px,2.4vw,28px)]">
							<div className="w-[180px] flex-none pt-px text-right font-mono text-[0.8rem] leading-[1.8] text-muted max-small:hidden">
								{when.map((line) => (
									<div key={line}>{line}</div>
								))}
							</div>
							<div aria-hidden="true" className="flex w-[13px] flex-none flex-col items-center">
								<span
									className={cx(
										'mt-2 size-[13px] flex-none rounded-full',
										i === 0 ? 'bg-accent-2 shadow-[0_0_12px_var(--accent-2)]' : 'border-2 border-accent-2 bg-page',
									)}
								/>
								{!last && <span className="mt-2 w-px flex-auto bg-line-strong" />}
							</div>
							<div className={cx('min-w-0 flex-1', !last && 'pb-14')}>
								<div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
									<h3 className="text-[1.2rem] leading-[1.45]">{job.role}</h3>
									<span className="text-[0.95rem] text-accent-2">@ {job.org}</span>
									{job.tag && (
										<span
											className={cx(
												'rounded-sm border px-2 py-px font-mono text-[0.72rem]',
												job.tag.startsWith('HEAD') ? 'border-accent-1 text-accent-1' : 'border-accent-2 text-accent-2',
											)}
										>
											{job.tag}
										</span>
									)}
								</div>
								<p className="mt-1.5 hidden font-mono text-[0.8rem] text-muted max-small:block">{when.join(' · ')}</p>
								<ul className="mt-4 grid gap-2.5 text-[0.95rem] text-muted">
									{job.points.map((point) => (
										<li key={point} className="flex gap-3">
											<span aria-hidden="true" className="flex-none font-mono text-accent-3">
												+
											</span>
											<span>
												<Rich text={point} />
											</span>
										</li>
									))}
								</ul>
							</div>
						</li>
					)
				})}
			</ol>
		</section>
	)
}
