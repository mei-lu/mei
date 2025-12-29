import { getCollection } from "astro:content"
import { type APIRoute } from "astro"
import { type PostResult } from "../../scripts/_types"

export const GET: APIRoute = async () => {
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

    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    })
}
