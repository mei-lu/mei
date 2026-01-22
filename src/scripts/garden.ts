import { getCollection } from "astro:content"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

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

    const outputPath = path.join(process.cwd(), "src", "content", "posts.json")
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, JSON.stringify(data, null, 2), "utf-8")
}
