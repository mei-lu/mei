import type { AstroInstance, Props } from "astro"
import { getCollection } from "astro:content"

export const getPostsByYear = async (year: number) => {
    const yearlyPosts = await getCollection("garden", (post) => {
        const postYear = post.data.date.getFullYear()
        return postYear == year
    })

    return yearlyPosts
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
