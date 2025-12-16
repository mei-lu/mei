import type { AstroInstance, MarkdownContent, Props } from "astro"

const Garden = () => {
    const gardenPostsMatches = import.meta.glob<MarkdownContent>(
        "../pages/garden/*.md",
        {
            eager: true,
        }
    )
    const gardenPosts = Object.values(gardenPostsMatches)

    const getLatestPosts = (limit: Number) => {
        gardenPosts.forEach((post) => {
            console.log(typeof post)
            console.log(post.url)
            console.log(post.frontmatter)
        })
    }

    // // Load
    getLatestPosts(5)
}

document.addEventListener("DOMContentLoaded", () => {
    Garden()
})
