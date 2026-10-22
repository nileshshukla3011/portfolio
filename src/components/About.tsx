import { MARQUEE, SKILLS } from '../content'
import { Eyebrow } from './ui'

export function Marquee() {
	return (
		<div
			className="overflow-hidden border-y border-line py-[18px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
			aria-hidden="true"
		>
			{/* the list twice, so scrolling by half its width loops seamlessly */}
			<div className="flex w-max animate-marquee gap-12">
				{[...MARQUEE, ...MARQUEE].map((name, i) => (
					<span
						key={i}
						className="font-display text-[1.3rem] font-semibold text-muted before:mr-12 before:text-[0.8em] before:text-accent-2 before:content-['✦']"
					>
						{name}
					</span>
				))}
			</div>
		</div>
	)
}

export function About() {
	return (
		<section id="about" className="wrap pt-[110px] max-small:pt-20">
			<Eyebrow className="reveal">01 — About</Eyebrow>
			<div className="grid grid-cols-2 items-start gap-12 max-tablet:grid-cols-1 max-tablet:gap-6">
				<h2 className="reveal">I like turning messy, real-world workflows into software that just works.</h2>
				<div className="reveal text-muted">
					<p>
						I'm an Information Technology graduate from Gautam Buddha University and a full-stack developer specialising in React, Next.js,
						Node.js and databases like PostgreSQL and MongoDB.
					</p>
					<p className="mt-4">
						I've raised user engagement by 21% as a Frontend Developer at Blockchain Council, built MERN applications at VEGFED, and done
						blockchain research at DRDO, where I earned a Letter of Recommendation. I was also Management Lead for the Google Developer
						Student Club, organising events for 1,500+ attendees.
					</p>
					<ul className="mt-6 flex flex-wrap gap-2 text-ink">
						{SKILLS.map((skill) => (
							<li key={skill} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.85rem]">
								{skill}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
