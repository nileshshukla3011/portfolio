import data from '../data/projects.json'
import { asset, cx } from '../lib'
import type { FeaturedProject, Project, ProjectsData } from '../types'
import { PreviewWindow } from './Previews'
import { buttonClass, Eyebrow, glass, Prompt } from './ui'

const projects: ProjectsData = data
const all = [...projects.featured, ...projects.earlier]
const counter = (i: number) => `${String(i + 1).padStart(2, '0')} / ${String(all.length).padStart(2, '0')}`

export function Projects() {
	return (
		<section id="projects" className="wrap pt-[110px] max-small:pt-20">
			<Eyebrow className="reveal">02 — Projects</Eyebrow>
			<div className="mb-9 flex flex-wrap items-end justify-between gap-6">
				<h2 className="reveal">Recent work</h2>
				<p className="reveal text-muted">Hospital systems, AI tooling and websites I've built recently.</p>
			</div>

			<div className="reveal mb-8">
				<Prompt command="ls ~/projects" />
				<nav aria-label="Projects" className="mt-2.5 flex flex-wrap gap-x-7 gap-y-1.5 font-mono text-[0.9rem]">
					{all.map((p) => (
						<a key={p.slug} href={`#${p.slug}`} className="text-accent-2 underline-offset-4 transition-colors hover:text-ink hover:underline">
							{p.slug}/
						</a>
					))}
				</nav>
			</div>

			<div id="featured-grid" data-reveal-group className="grid gap-7">
				{projects.featured.map((p, i) => (
					<FeaturedCard key={p.slug} project={p} counter={counter(i)} />
				))}
			</div>

			<h3 className="reveal mt-[72px] mb-5 text-[1.4rem]">Earlier projects</h3>
			<div id="projects-grid" data-reveal-group className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
				{projects.earlier.map((p, i) => (
					<ProjectCard key={p.slug} project={p} counter={counter(projects.featured.length + i)} />
				))}
			</div>
		</section>
	)
}

/** Wide card: the project's mini UI on a dotted canvas, details on the right. */
function FeaturedCard({ project: p, counter }: { project: FeaturedProject; counter: string }) {
	return (
		<div className="reveal">
			<article
				id={p.slug}
				data-spotlight
				className={cx(glass, 'spotlight group scroll-mt-24 transition-[translate,box-shadow] duration-350 hover:-translate-y-1.5 hover:shadow-soft')}
			>
				<TitleBar slug={p.slug} counter={counter} />
				<div className="grid grid-cols-[3fr_2fr] max-tablet:grid-cols-1">
					<div className="dot-canvas relative flex min-w-0 items-center justify-center border-r border-line p-[clamp(16px,3vw,32px)] max-tablet:border-r-0 max-tablet:border-b">
						{p.preview && (
							<div
								aria-hidden="true"
								className="relative w-full max-w-[560px] overflow-hidden tablet:max-w-[620px] tablet:text-[0.8rem] rounded-xl border border-line-strong bg-panel text-[0.72rem] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.025]"
							>
								<PreviewWindow kind={p.preview} />
							</div>
						)}
					</div>
					<div className="flex min-w-0 flex-col gap-3.5 p-[clamp(20px,3vw,32px)]">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<Kicker>{p.kicker}</Kicker>
							<span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-[3px] text-[0.75rem] text-muted before:size-1.5 before:rounded-full before:bg-accent-3 before:content-['']">
								{p.status}
							</span>
						</div>
						<h3 className="text-[length:clamp(1.45rem,2.2vw,1.8rem)]">{p.title}</h3>
						<p className="text-[0.95rem] text-muted">{p.description}</p>
						{p.highlights && (
							<ul className="mt-0.5 grid gap-1.5 text-[0.88rem]">
								{p.highlights.map((h) => (
									<li key={h} className="before:mr-2 before:text-accent-3 before:content-['→']">
										{h}
									</li>
								))}
							</ul>
						)}
						<Tags tags={p.tags} />
						<Actions project={p} />
					</div>
				</div>
			</article>
		</div>
	)
}

/** Smaller card with a screenshot on top. */
function ProjectCard({ project: p, counter }: { project: Project; counter: string }) {
	return (
		<div className="reveal">
			<article
				id={p.slug}
				data-spotlight
				className={cx(glass, 'spotlight group flex h-full scroll-mt-24 flex-col transition-[translate] duration-300 hover:-translate-y-1')}
			>
				<TitleBar slug={p.slug} counter={counter} />
				{p.image && (
					<div className="dot-canvas border-b border-line p-4">
						<div className="overflow-hidden rounded-lg border border-line-strong shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]">
							<img
								src={asset(p.image)}
								alt={p.imageAlt ?? ''}
								loading="lazy"
								className="aspect-[2/1] w-full object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.025]"
							/>
						</div>
					</div>
				)}
				<div className="flex flex-1 flex-col gap-3 p-[22px]">
					{p.kicker && <Kicker>{p.kicker}</Kicker>}
					<h3 className="text-[1.2rem]">{p.title}</h3>
					<p className="text-[0.92rem] text-muted">{p.description}</p>
					<Tags tags={p.tags} />
					<Actions project={p} />
				</div>
			</article>
		</div>
	)
}

function TitleBar({ slug, counter }: { slug: string; counter: string }) {
	return (
		<div className="flex flex-wrap justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-[11px] font-mono text-[0.8rem] text-muted">
			<span>
				~/projects/<span className="text-ink">{slug}</span>
			</span>
			<span>{counter}</span>
		</div>
	)
}

function Kicker({ children }: { children?: string }) {
	return <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-accent-2">{children}</span>
}

function Tags({ tags }: { tags?: string[] }) {
	if (!tags?.length) return null
	return (
		<ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-2 pt-1.5">
			{tags.map((tag) => (
				<li key={tag} className="rounded-md border border-line-strong px-2.5 py-[3px] font-mono text-[0.72rem] text-muted">
					{tag}
				</li>
			))}
		</ul>
	)
}

function Actions({ project: p }: { project: Project }) {
	if (!p.demo && !p.repo) return null
	return (
		<div className="flex flex-wrap gap-2.5">
			{p.demo && (
				<a className={buttonClass('default', 'sm')} href={p.demo} target="_blank" rel="noopener">
					Live ↗
				</a>
			)}
			{p.repo && (
				<a className={buttonClass('default', 'sm')} href={p.repo} target="_blank" rel="noopener">
					Code ↗
				</a>
			)}
		</div>
	)
}
