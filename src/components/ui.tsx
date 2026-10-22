import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib'

type Variant = 'default' | 'primary' | 'ghost' | 'glow' | 'whatsapp'
type Size = 'md' | 'sm'

const buttonBase =
	'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-surface font-semibold backdrop-blur-[10px] transition-[translate,box-shadow,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-accent-2 active:translate-y-0'

const buttonSizes: Record<Size, string> = {
	md: 'px-5 py-3 text-[0.95rem]',
	sm: 'px-4 py-2 text-[0.85rem]',
}

const buttonVariants: Record<Variant, string> = {
	default: '',
	primary:
		'animate-shimmer border-transparent bg-(image:--gradient) bg-size-[200%_100%] text-white shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--accent-1)_70%,transparent)] hover:border-transparent hover:shadow-[0_16px_40px_-10px_color-mix(in_srgb,var(--accent-2)_70%,transparent)]',
	ghost: 'bg-transparent',
	glow: "relative before:absolute before:-inset-0.5 before:-z-1 before:rounded-[inherit] before:bg-(image:--gradient) before:opacity-55 before:blur-[12px] before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-90",
	whatsapp:
		'border-transparent bg-whatsapp text-[#062b16] hover:border-transparent hover:shadow-[0_14px_34px_-10px_rgba(37,211,102,0.7)]',
}

export const buttonClass = (variant: Variant = 'default', size: Size = 'md', className?: string) =>
	cx(buttonBase, buttonSizes[size], buttonVariants[variant], className)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant
	size?: Size
}

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
	return <button type={type} className={buttonClass(variant, size, className)} {...rest} />
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Display classes; pass e.g. "hidden max-tablet:inline-grid" to show the button only on small screens. */
	display?: string
}

export function IconButton({ className, display = 'inline-grid', type = 'button', ...rest }: IconButtonProps) {
	return (
		<button
			type={type}
			className={cx(
				display,
				'size-10 cursor-pointer place-items-center rounded-xl border border-line bg-surface transition-[border-color,rotate] duration-200 hover:-rotate-8 hover:border-accent-2',
				className,
			)}
			{...rest}
		/>
	)
}

/** Small mono label above a section heading, e.g. "02 — Projects". */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
	return <p className={cx('mb-3.5 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-accent-2', className)}>{children}</p>
}

/** A shell prompt line: nilesh@portfolio ~ % <command>. */
export function Prompt({ command, className }: { command: string; className?: string }) {
	return (
		<p aria-hidden="true" className={cx('font-mono text-[0.85rem] text-muted', className)}>
			<span className="text-accent-3">nilesh@portfolio</span> <span className="text-accent-2">~</span> %{' '}
			<span className="text-ink">{command}</span>
		</p>
	)
}

/** Renders **double-star** words in bold. */
export function Rich({ text }: { text: string }) {
	return (
		<>
			{text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
				part.startsWith('**') && part.endsWith('**') ? (
					<strong key={i} className="font-semibold text-ink">
						{part.slice(2, -2)}
					</strong>
				) : (
					part
				),
			)}
		</>
	)
}

export const glass = 'relative overflow-hidden rounded-[20px] border border-line bg-surface backdrop-blur-[14px]'

export const field =
	'w-full rounded-xl border border-line-strong bg-surface-2 px-3.5 py-3 text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-200 focus:border-accent-2 focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-2)_20%,transparent)] focus:outline-none'

export const label = 'mb-1.5 block text-[0.88rem] font-semibold'
