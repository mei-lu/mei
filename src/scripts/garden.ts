import { getCollection } from "astro:content"
import { writeFile } from "node:fs/promises"

export const updatePostsIndex = async () => {
    const posts = await getCollection("garden")

    const data = posts
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
        .map((post) => ({
            slug: post.id,
            title: post.data.title,
            date: post.data.date,
            description: post.data.description,
            category: post.data.category,
        }))

    const outputUrl = new URL("../content/posts.json", import.meta.url)
    await writeFile(outputUrl, JSON.stringify(data, null, 2), "utf-8")
}
