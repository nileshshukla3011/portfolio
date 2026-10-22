export interface Project {
	/** Short name used in the ~/projects/… title bar and as the page anchor. */
	slug: string
	title: string
	kicker?: string
	description: string
	tags?: string[]
	demo?: string
	repo?: string
	/** Screenshot in public/, shown instead of a mini preview. */
	image?: string
	imageAlt?: string
}

export interface FeaturedProject extends Project {
	status: string
	/** Which mini UI preview to draw (see components/Previews.tsx). */
	preview?: string
	highlights?: string[]
}

export interface ProjectsData {
	featured: FeaturedProject[]
	earlier: Project[]
}
