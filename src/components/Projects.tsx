import { useCallback, useState, type KeyboardEvent } from 'react'
import data from '../data/projects.json'
import { cx } from '../lib'
import type { AnyProject, ProjectsData } from '../types'
import { ProjectModal } from './ProjectModal'
import { Actions, Kicker, ProjectMedia, Tag } from './ProjectParts'
import { Eyebrow, glass, Prompt } from './ui'

const projects: ProjectsData = data
const all: AnyProject[] = [...projects.featured, ...projects.earlier]
const counter = (p: AnyProject) => `${String(all.indexOf(p) + 1).padStart(2, '0')} / ${String(all.length).padStart(2, '0')}`

type Tab = 'featured' | 'earlier'
const TABS: { id: Tab; label: string; items: AnyProject[] }[] = [
	{ id: 'featured', label: 'Recent work', items: projects.featured },
	{ id: 'earlier', label: 'Earlier projects', items: projects.earlier },
]

export function Projects() {
	const [tab, setTab] = useState<Tab>('featured')
	const [open, setOpen] = useState<AnyProject | null>(null)
	const close = useCallback(() => setOpen(null), [])
	const items = TABS.find((t) => t.id === tab)!.items

	const show = (p: AnyProject) => {
		setTab(projects.earlier.includes(p) ? 'earlier' : 'featured')
		setOpen(p)
	}

	// Left / right arrows move between tabs, as in a native tab strip.
	const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
		const next = TABS[(TABS.findIndex((t) => t.id === tab) + 1) % TABS.length].id
		setTab(next)
		document.getElementById(`tab-${next}`)?.focus()
	}

	return (
		<section id="projects" className="wrap pt-[110px] max-small:pt-20">
			<Eyebrow className="reveal">02 — Projects</Eyebrow>
			<div className="mb-9 flex flex-wrap items-end justify-between gap-6">
				<h2 className="reveal">Selected work</h2>
				<p className="reveal text-muted">Hospital systems, AI tooling and websites. Click any project for the details.</p>
			</div>

			<div className="reveal mb-8">
				<Prompt command="ls ~/projects" />
				<nav aria-label="Projects" className="mt-2.5 flex flex-wrap gap-x-7 gap-y-1.5 font-mono text-[0.9rem]">
					{all.map((p) => (
						<button
							key={p.slug}
							type="button"
							onClick={() => show(p)}
							className="cursor-pointer text-accent-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
						>
							{p.slug}/
						</button>
					))}
				</nav>
			</div>

			<div
				role="tablist"
				aria-label="Project list"
				onKeyDown={onTabKey}
				className="reveal mb-6 inline-flex gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur-[10px] max-phone:flex"
			>
				{TABS.map((t) => (
					<button
						key={t.id}
						id={`tab-${t.id}`}
						type="button"
						role="tab"
						aria-selected={tab === t.id}
						aria-controls="projects-panel"
						tabIndex={tab === t.id ? 0 : -1}
						onClick={() => setTab(t.id)}
						className={cx(
							'flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-[0.9rem] font-semibold transition-colors duration-200 max-phone:flex-1 max-phone:px-3',
							tab === t.id ? 'bg-(image:--gradient) text-white' : 'text-muted hover:text-ink',
						)}
					>
						{t.label}
						<span className={cx('font-mono text-[0.75rem]', tab === t.id ? 'text-white/80' : 'text-muted')}>{t.items.length}</span>
					</button>
				))}
			</div>

			<div id="projects-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="reveal">
				<div key={tab} className="grid animate-fade grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-[22px]">
					{items.map((p) => (
						<ProjectCard key={p.slug} project={p} onOpen={() => setOpen(p)} />
					))}
				</div>
			</div>

			<ProjectModal project={open} counter={open ? counter(open) : ''} onClose={close} />
		</section>
	)
}

/** Grid card. The whole card opens the details dialog; the Live / Code links sit above that click area. */
function ProjectCard({ project: p, onOpen }: { project: AnyProject; onOpen: () => void }) {
	const shownTags = p.tags?.slice(0, 3) ?? []
	const moreTags = (p.tags?.length ?? 0) - shownTags.length
	return (
		<article
			id={p.slug}
			data-spotlight
			className={cx(
				glass,
				'spotlight group flex h-full scroll-mt-24 flex-col transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft',
				'outline-offset-3 has-[.card-open:focus-visible]:outline-2 has-[.card-open:focus-visible]:outline-accent-2',
			)}
		>
			<TitleBar slug={p.slug} counter={counter(p)} />
			<div className="dot-canvas flex h-[240px] items-center justify-center overflow-hidden border-b border-line p-4">
				<ProjectMedia project={p} className="max-w-[420px] text-[0.68rem]" />
			</div>
			<div className="flex flex-1 flex-col gap-3 p-[22px]">
				{p.kicker && <Kicker>{p.kicker}</Kicker>}
				<h3 className="text-[1.25rem]">
					<button
						type="button"
						onClick={onOpen}
						aria-haspopup="dialog"
						className="card-open cursor-pointer text-left after:absolute after:inset-0 after:z-1 after:content-[''] focus-visible:outline-none"
					>
						{p.title}
					</button>
				</h3>
				<p className="line-clamp-3 text-[0.92rem] text-muted">{p.description}</p>
				{shownTags.length > 0 && (
					<ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-2 pt-1.5">
						{shownTags.map((tag) => (
							<Tag key={tag}>{tag}</Tag>
						))}
						{moreTags > 0 && <Tag>+{moreTags}</Tag>}
					</ul>
				)}
				<div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
					<Actions project={p} className="relative z-2" />
					<span aria-hidden="true" className="ml-auto text-[0.85rem] font-semibold text-accent-2 transition-transform duration-200 group-hover:translate-x-1">
						Details →
					</span>
				</div>
			</div>
		</article>
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
