import type { ReactNode } from 'react'
import { cx } from '../lib'

/** Mini UI mock-ups drawn on the featured project cards, keyed by the project's "preview" value. */
export const PREVIEWS: Record<string, { title: string; body: () => ReactNode; scan?: boolean }> = {
	jobbot: {
		title: 'job-bot · matches',
		body: () => (
			<>
				<Row lead={<Score tone="hi">92</Score>} text="Frontend Engineer" note="· Bengaluru" end={<Chip go>Auto-fill</Chip>} />
				<Row lead={<Score tone="hi">87</Score>} text="Full-stack Developer" note="· Remote" end={<Chip>Cover note</Chip>} />
				<Row lead={<Score tone="mid">74</Score>} text="React Developer" note="· Pune" end={<Chip>Applied ✓</Chip>} />
				<Row lead={<Score tone="lo">41</Score>} text="Java Lead" note="· dropped: 8+ yrs" end={<Chip>Why?</Chip>} />
			</>
		),
	},
	cms: {
		title: 'cms · agent queue',
		scan: true,
		body: () => (
			<>
				<Row lead={<Prio className="bg-[#ef4444]" />} text="Ventilator alarm, ICU-2" note="· Biomedical" end={<Sla warn>SLA 0:42</Sla>} />
				<Row lead={<Prio className="bg-[#f59e0b]" />} text="AC not cooling, Ward 7" note="· Electrical" end={<Sla>SLA 3:10</Sla>} />
				<Row lead={<Prio className="bg-accent-2" />} text="Printer offline, OPD counter" note="· IT" end={<Sla>SLA 6:55</Sla>} />
				<Row lead={<Prio className="bg-accent-2" />} text='KB: "Reset HIS password"' note="· solved it" end={<Chip>Deflected</Chip>} />
			</>
		),
	},
	mortuary: {
		title: 'mortuary · chambers',
		body: () => {
			const states = ['on', '', 'on', 'on', 'alert', '', 'on', '', '', 'on', 'on', '', 'on', 'on', '', '', 'on', '']
			return (
				<>
					<div className="grid grid-cols-6 gap-1.5">
						{states.map((state, i) => (
							<div
								key={i}
								className={cx(
									'grid aspect-[1.3] place-items-center rounded-md border font-mono text-[0.833em]',
									state === 'on' && 'border-accent-1 bg-accent-1/30 text-ink',
									state === 'alert' && 'animate-alert border-[#ef4444] bg-[#ef4444]/25 text-ink',
									!state && 'border-line-strong text-muted',
								)}
							>
								C{String(i + 1).padStart(2, '0')}
							</div>
						))}
					</div>
					<div className="flex gap-3 text-[0.889em] text-muted">
						<span className={cx(legend, 'before:bg-accent-1')}>Occupied</span>
						<span className={cx(legend, 'before:bg-line-strong')}>Free</span>
						<span className={cx(legend, 'before:bg-[#ef4444]')}>Alert</span>
					</div>
				</>
			)
		},
	},
	mgims: {
		title: 'mgims.ac.in',
		body: () => (
			<>
				<div className="flex items-center gap-2 pt-0.5 pb-1">
					<span className="size-4 rounded bg-(image:--gradient)" />
					<Bar width="30%" />
					<span className="flex-1" />
					<Bar width="12%" />
					<Bar width="12%" />
					<Bar width="12%" />
				</div>
				<div className="grid h-[58px] content-center gap-[5px] rounded-lg bg-(image:--site-hero-bg) px-2.5 py-[9px]">
					<span className="h-1.5 w-[60%] rounded-[3px] bg-white/75" />
					<span className="h-1.5 w-[38%] rounded-[3px] bg-white/75 opacity-60" />
				</div>
				<div className="grid grid-cols-3 gap-1.5">
					{[0, 1, 2].map((i) => (
						<div key={i} className="h-[34px] rounded-md border border-line bg-surface-2" />
					))}
				</div>
			</>
		),
	},
	naturefrost: {
		title: 'nature frost · products',
		body: () => (
			<div className="grid grid-cols-4 gap-2">
				{['🍓', '🫐', '🥦', '🌽'].map((fruit, i) => (
					<div
						key={fruit}
						className={cx(
							'grid aspect-square place-items-center rounded-[10px] border border-line bg-surface-2 text-[1.944em] transition-transform duration-300',
							i % 2 === 0 ? 'group-hover:-translate-y-1 group-hover:-rotate-4' : 'group-hover:translate-y-[3px] group-hover:rotate-4',
						)}
					>
						{fruit}
					</div>
				))}
			</div>
		),
	},
}

/** A window with traffic-light buttons, a title and the preview body. */
export function PreviewWindow({ kind }: { kind: string }) {
	const preview = PREVIEWS[kind]
	if (!preview) return null
	return (
		<>
			<div className="flex items-center gap-[5px] border-b border-line px-2.5 py-2">
				<i className="size-2 rounded-full bg-[#ff5f57]" />
				<i className="size-2 rounded-full bg-[#febc2e]" />
				<i className="size-2 rounded-full bg-[#28c840]" />
				<b className="ml-2 font-mono text-[0.944em] font-medium text-muted">{preview.title}</b>
			</div>
			<div className="grid gap-[7px] px-3 py-2.5">{preview.body()}</div>
			{preview.scan && (
				<div className="pointer-events-none absolute inset-x-0 -top-[40%] h-[40%] animate-scan bg-(image:--scan-bg)" />
			)}
		</>
	)
}

const legend = "before:mr-[5px] before:inline-block before:size-[7px] before:rounded-[2px] before:content-['']"

function Row({ lead, text, note, end }: { lead: ReactNode; text: string; note: string; end: ReactNode }) {
	return (
		<div className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-[9px] py-[7px]">
			{lead}
			<span className="min-w-0 flex-1 truncate">
				{text} <small className="text-muted [font-size:smaller]">{note}</small>
			</span>
			{end}
		</div>
	)
}

function Score({ tone, children }: { tone: 'hi' | 'mid' | 'lo'; children: ReactNode }) {
	const tones = {
		hi: 'bg-accent-3/22 text-accent-3',
		mid: 'bg-accent-2/22 text-accent-2',
		lo: 'bg-[#f59e0b]/22 text-[#f59e0b]',
	}
	return <span className={cx('rounded-md px-[7px] py-0.5 font-mono text-[0.944em] font-semibold', tones[tone])}>{children}</span>
}

function Chip({ go, children }: { go?: boolean; children: ReactNode }) {
	return (
		<span
			className={cx(
				'whitespace-nowrap rounded-md px-[7px] py-0.5 text-[0.889em]',
				go ? 'bg-(image:--gradient) text-white' : 'border border-line-strong text-muted',
			)}
		>
			{children}
		</span>
	)
}

function Prio({ className }: { className: string }) {
	return <span className={cx('size-[7px] flex-none rounded-full', className)} />
}

function Sla({ warn, children }: { warn?: boolean; children: ReactNode }) {
	return <span className={cx('font-mono text-[0.889em]', warn ? 'text-[#f59e0b]' : 'text-accent-3')}>{children}</span>
}

function Bar({ width }: { width: string }) {
	return <span className="h-[5px] rounded-[3px] bg-line-strong" style={{ width }} />
}
