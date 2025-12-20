import { getCollection, type CollectionEntry } from "astro:content"

export const getPostMonths = (posts: CollectionEntry<"garden">[]) => {
    const months = new Set<number>()

    posts.forEach((post) => {
        const postDate = post.data.date
        const postMonth = postDate.getMonth()

        months.add(postMonth)
    })

    return months
}

export const getPostsByYear = async (year: number) => {
    const yearlyPosts = await getCollection("garden", (post) => {
        const postYear = post.data.date.getFullYear()
        return postYear == year
    })

    return yearlyPosts
        .sort(
            (a, b) =>
                new Date(b.data.date).getTime() -
                new Date(a.data.date).getTime()
        )
        .slice()
}

export const groupPostsByMonth = (
    posts: CollectionEntry<"garden">[]
): Record<string, CollectionEntry<"garden">[]> => {
    const grouped: Record<string, CollectionEntry<"garden">[]> = {}

    for (const post of posts) {
        const date = post.data.date
        const key = date.getMonth()

        if (!grouped[key]) {
            grouped[key] = []
        }

        grouped[key].push(post)
    }

    return grouped
}

// TODO: maybe toss
export const getLatestPosts = async (limit: number) => {
    const gardenPostsMatches = await getCollection("garden")

    const gardenPosts = Object.values(gardenPostsMatches)

    return gardenPosts
        .sort(
            (a, b) =>
                new Date(b.data.date).getTime() -
                new Date(a.data.date).getTime()
        )
        .slice(0, limit)
}
