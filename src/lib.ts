/** Join class names, skipping empty values. */
export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** URL of a file in public/, relative to the page so the site also works from a sub-path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
