import type { Ref } from 'react'

const blob = 'absolute size-[46vmax] rounded-full blur-[90px] animate-drift'

/** Drifting colour blobs and a faint grid behind the page, plus the pointer glow. */
export function Background({ glowRef }: { glowRef: Ref<HTMLDivElement> }) {
	return (
		<>
			<div className="pointer-events-none fixed inset-0 -z-2 overflow-hidden" aria-hidden="true">
				<div className={`${blob} -top-[18vmax] -left-[12vmax] bg-accent-1 opacity-(--blob-opacity)`} />
				<div className={`${blob} top-[20vh] -right-[20vmax] bg-accent-2 opacity-(--blob-opacity) [animation-delay:-8s] [animation-duration:32s]`} />
				<div className={`${blob} -bottom-[26vmax] left-[25vw] bg-accent-3 opacity-[calc(var(--blob-opacity)*0.6)] [animation-delay:-16s]`} />
				<div className="grid-lines absolute inset-0" />
			</div>
			<div
				ref={glowRef}
				className="cursor-glow pointer-events-none fixed top-0 left-0 -z-1 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(image:--glow-bg)"
				aria-hidden="true"
			/>
		</>
	)
}
