import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib'

/** Deletes and types each word in turn. Shows the first word only when motion is reduced. */
export function useTypewriter(words: string[]) {
	const [text, setText] = useState(words[0])
	useEffect(() => {
		if (prefersReducedMotion()) return
		let word = 0
		let chars = words[0].length
		let deleting = true
		let timer = 0
		const tick = () => {
			let delay: number
			if (deleting) {
				chars -= 1
				delay = 45
				if (chars === 0) {
					deleting = false
					word = (word + 1) % words.length
					delay = 300
				}
			} else {
				chars += 1
				delay = 85
				if (chars === words[word].length) {
					deleting = true
					delay = 2200
				}
			}
			setText(words[word].slice(0, chars))
			timer = window.setTimeout(tick, delay)
		}
		timer = window.setTimeout(tick, 2400)
		return () => window.clearTimeout(timer)
	}, [words])
	return text
}
