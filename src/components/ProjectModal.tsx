import { useRef } from 'react'
import { useModal } from '../hooks/useModal'
import type { AnyProject } from '../types'
import { Actions, Kicker, ProjectMedia, Status, Tag } from './ProjectParts'
import { IconButton } from './ui'

interface Props {
	/** The project to show; null keeps the dialog closed. */
	project: AnyProject | null
	counter: string
	onClose: () => void
}

/** Full details of one project: large preview, the whole description, highlights, stack and links. */
export function ProjectModal({ project: p, counter, onClose }: Props) {
	const dialogRef = useRef<HTMLDivElement>(null)
	useModal(p !== null, onClose, dialogRef)

	if (!p) return null
	return (
		<div ref={dialogRef} className="fixed inset-0 z-100 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="project-title">
			<div className="absolute inset-0 animate-fade bg-[rgba(3,4,10,0.6)] backdrop-blur-[6px]" onClick={onClose} />
			<div className="group relative max-h-[calc(100vh-32px)] w-[min(820px,100%)] animate-pop overflow-y-auto rounded-3xl border border-line-strong bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]">
				<div className="sticky top-0 z-2 flex items-center gap-4 border-b border-line bg-panel py-2 pr-2.5 pl-5 font-mono text-[0.8rem] text-muted">
					<span className="min-w-0 flex-1 truncate">
						~/projects/<span className="text-ink">{p.slug}</span>
					</span>
					<span>{counter}</span>
					<IconButton aria-label="Close" onClick={onClose}>
						✕
					</IconButton>
				</div>
				<div className="dot-canvas flex justify-center border-b border-line p-[clamp(16px,4vw,40px)]">
					<ProjectMedia project={p} className="max-w-[620px] text-[0.8rem] max-small:text-[0.7rem]" />
				</div>
				<div className="grid gap-4 p-[clamp(20px,4vw,36px)]">
					<div className="flex flex-wrap items-center gap-3">
						{p.kicker && <Kicker>{p.kicker}</Kicker>}
						{p.status && <Status>{p.status}</Status>}
					</div>
					<h2 id="project-title" className="text-[length:clamp(1.6rem,3vw,2.1rem)]">
						{p.title}
					</h2>
					<p className="text-muted">{p.description}</p>
					{p.highlights && (
						<ul className="grid gap-1.5 text-[0.92rem]">
							{p.highlights.map((h) => (
								<li key={h} className="before:mr-2 before:text-accent-3 before:content-['→']">
									{h}
								</li>
							))}
						</ul>
					)}
					{p.tags && (
						<ul aria-label="Tech stack" className="flex flex-wrap gap-2">
							{p.tags.map((tag) => (
								<Tag key={tag}>{tag}</Tag>
							))}
						</ul>
					)}
					{p.demo || p.repo ? <Actions project={p} /> : <p className="text-[0.88rem] text-muted">No public demo or code for this one.</p>}
				</div>
			</div>
		</div>
	)
}
