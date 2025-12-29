export const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export const CATEGORIES = ["Projects", "Web", "Art", "XR"] as const

export type PostCategory = (typeof CATEGORIES)[number]

export type PostResult = {
    slug: string
    title: string
    date: Date
    description: string
    category: PostCategory
}
