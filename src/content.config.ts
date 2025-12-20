import { defineCollection } from "astro:content"

import { glob, file } from "astro/loaders"

import { z } from "astro/zod"

const garden = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./pages/garden" }),
    schema: { title: z.string, date: z.coerce.date, description: z.string },
})
const portfolio = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./pages/garden" }),
})

export const collections = { garden, portfolio }
