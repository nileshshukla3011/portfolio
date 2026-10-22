import { useState } from 'react'
import { NAV } from '../content'
import { useActiveSection, useScrolled } from '../hooks/usePageScroll'
import { useTheme } from '../hooks/useTheme'
import { asset, cx } from '../lib'
import { Button, IconButton } from './ui'

export function Header({ onRequestResume }: { onRequestResume: () => void }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [dark, toggleTheme] = useTheme()
	const scrolled = useScrolled(10)
	const active = useActiveSection()

	return (
		<header
			className={cx(
				'sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--bg)_65%,transparent)] backdrop-blur-[16px] backdrop-saturate-140 transition-[border-color] duration-300',
				scrolled ? 'border-line' : 'border-transparent',
			)}
		>
			<nav className="wrap flex h-[70px] items-center justify-between gap-4">
				<a href="#home" className="inline-flex items-center gap-2.5 font-display text-[1.2rem] font-bold">
					<img className="size-8 rounded-[10px]" src={asset('assets/logo.png')} alt="" />
					<span>
						Nilesh<em className="text-accent-2 not-italic">.</em>
					</span>
				</a>

				<ul
					id="primary-nav"
					className={cx(
						'flex gap-1',
						'max-tablet:absolute max-tablet:top-[70px] max-tablet:inset-x-4 max-tablet:flex-col max-tablet:rounded-[18px] max-tablet:border max-tablet:border-line-strong max-tablet:bg-panel max-tablet:p-2.5 max-tablet:shadow-soft max-tablet:transition-all max-tablet:duration-250',
						menuOpen ? 'max-tablet:translate-y-0 max-tablet:opacity-100' : 'max-tablet:pointer-events-none max-tablet:-translate-y-2.5 max-tablet:opacity-0',
					)}
				>
					{NAV.map(({ id, label }) => (
						<li key={id}>
							<a
								href={`#${id}`}
								onClick={() => setMenuOpen(false)}
								className={cx(
									'block rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors max-tablet:px-4 max-tablet:py-3',
									active === id ? 'bg-surface-2 text-ink' : 'text-muted hover:bg-surface-2 hover:text-ink',
								)}
							>
								{label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<Button variant="primary" size="sm" className="max-phone:hidden" onClick={onRequestResume}>
						Request resume
					</Button>
					<IconButton id="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
						{dark ? '☀' : '☾'}
					</IconButton>
					<IconButton
						id="menu-toggle"
						display="hidden max-tablet:inline-grid"
						aria-label="Toggle navigation"
						aria-expanded={menuOpen}
						aria-controls="primary-nav"
						onClick={() => setMenuOpen((open) => !open)}
					>
						{menuOpen ? '✕' : '☰'}
					</IconButton>
				</div>
			</nav>
		</header>
	)
}
