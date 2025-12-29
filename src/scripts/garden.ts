import { getCollection, type CollectionEntry } from "astro:content"
import { CATEGORIES, type PostCategory, type PostResult } from "./_types"
import { readFile, writeFile } from "node:fs/promises"

export const updatePostsIndex = async () => {
    const posts = await getCollection("garden")

    const data = posts
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
        .map(
            (post) =>
                ({
                    slug: post.id,
                    title: post.data.title,
                    date: post.data.date,
                    description: post.data.description,
                    category: post.data.category,
                }) as PostResult
        )

    const outputUrl = new URL("../../public/posts.json", import.meta.url)
    await writeFile(outputUrl, JSON.stringify(data, null, 2), "utf-8")
}

export const readPostsIndex = async (): Promise<PostResult[]> => {
    const inputUrl = new URL("../../public/posts.json", import.meta.url)
    const fileContents = await readFile(inputUrl, "utf-8")

    return JSON.parse(fileContents) as PostResult[]
}

export const prerender = false

export const getPostMonths = (posts: CollectionEntry<"garden">[]) => {
    const months = new Set<number>()

    posts.forEach((post) => {
        const postDate = post.data.date
        const postMonth = postDate.getMonth()

        months.add(postMonth)
    })

    return months
}

export const applyPostFilters = async ({
    year,
    categories,
    search,
}: {
    year?: number
    categories?: PostCategory[]
    search?: string
}) => {
    const filteredPosts = await getCollection("garden", (post) => {
        const postYear = post.data.date.getFullYear()
        if (year && postYear != year) return false

        const postCategory = post.data.category
        if (categories && !categories.includes(postCategory)) return false

        const postTitle = post.data.title
        const postDescription = post.data.description
        const postBody = post.body
        if (
            search &&
            !postTitle.includes(search) &&
            !postDescription.includes(search)
        )
            return false

        if (search && postBody && !postBody.includes(search)) return false

        return true
    })

    return filteredPosts
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

export const groupPostResultsByMonth = (
    posts: PostResult[]
): Record<string, PostResult[]> => {
    const grouped: Record<string, PostResult[]> = {}

    for (const post of posts) {
        const date = new Date(post.date)
        const key = date.getMonth()

        if (!grouped[key]) {
            grouped[key] = []
        }

        grouped[key].push(post)
    }

    return grouped
}

export const getAllPosts = async () => {
    const gardenPostsMatches = await getCollection("garden")

    const gardenPosts = Object.values(gardenPostsMatches)

    return gardenPosts.sort(
        (a, b) =>
            new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )
}
