import type { ReactNode } from 'react'
import { asset, cx } from '../lib'
import type { AnyProject } from '../types'
import { PreviewWindow } from './Previews'
import { buttonClass } from './ui'

/* Pieces shared by the project grid cards and the project details dialog. */

/** The project's mini UI preview, or its screenshot. */
export function ProjectMedia({ project: p, className }: { project: AnyProject; className?: string }) {
	if (p.preview) {
		return (
			<div
				aria-hidden="true"
				className={cx(
					'relative w-full overflow-hidden rounded-xl border border-line-strong bg-panel shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.025]',
					className,
				)}
			>
				<PreviewWindow kind={p.preview} />
			</div>
		)
	}
	if (p.image) {
		return (
			<div className={cx('w-full overflow-hidden rounded-lg border border-line-strong shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]', className)}>
				<img
					src={asset(p.image)}
					alt={p.imageAlt ?? ''}
					loading="lazy"
					className="aspect-[2/1] w-full object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.025]"
				/>
			</div>
		)
	}
	return null
}

export function Kicker({ children }: { children?: string }) {
	return <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-accent-2">{children}</span>
}

export function Status({ children }: { children: string }) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-[3px] text-[0.75rem] text-muted before:size-1.5 before:rounded-full before:bg-accent-3 before:content-['']">
			{children}
		</span>
	)
}

export function Tag({ children }: { children: ReactNode }) {
	return <li className="rounded-md border border-line-strong px-2.5 py-[3px] font-mono text-[0.72rem] text-muted">{children}</li>
}

export function Actions({ project: p, className }: { project: AnyProject; className?: string }) {
	if (!p.demo && !p.repo) return null
	return (
		<div className={cx('flex flex-wrap gap-2.5', className)}>
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
