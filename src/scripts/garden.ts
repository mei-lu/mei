import type { AstroInstance, MarkdownContent, Props } from "astro"
import { getCollection } from "astro:content"

const gardenPostsMatches = import.meta.glob<MarkdownContent>(
    "../pages/garden/**/*.md",
    {
        eager: true,
    }
)

const gardenPosts = Object.values(gardenPostsMatches)

export const getPostsByYear = async (year: number) => {
    const yearlyPosts: MarkdownContent[] = await getCollection(
        "garden",
        (data: MarkdownContent) => {
            return data.date.getFullYear() == year
        }
    )

    console.log(yearlyPosts)
    return yearlyPosts
}

export const getLatestPosts = (limit: number): MarkdownContent[] => {
    // gardenPosts.forEach((post) => {
    //     console.log(typeof post)
    //     console.log(post.url)
    //     console.log(post.frontmatter)
    // })
    return gardenPosts
        .sort(
            (a, b) =>
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
        )
        .slice(0, limit)
}

// const Garden = () => {}
// document.addEventListener("DOMContentLoaded", () => {
//     Garden()
// })
