import { defineCollection } from "astro:content"
import { glob, file } from "astro/loaders"
import { z } from "astro/zod"
import { CATEGORIES } from "./scripts/_types"

const garden = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/garden" }),
    schema: z.object({
        title: z.string(),
        category: z.enum(CATEGORIES),
        date: z.coerce.date(),
        description: z.string(),
    }),
})

export const collections = { garden }
