import { defineCollection, z } from "astro:content";

const recipesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    historicalFigure: z.string(),
    timePeriod: z.string(),
    mealType: z.enum(["breakfast", "lunch", "dinner", "dessert"]),
    difficulty: z.enum(["easy", "medium", "hard"]),
    cookTime: z.number(),
    prepTime: z.number(),
    servings: z.number(),
    youtubeId: z.string().optional(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    ingredients: z.array(z.string()),
    equipment: z.array(z.string()).optional(),
    image: z.string().optional(),
    episode: z.number().optional(), // Which episode featured this recipe
  }),
});

const episodesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    episodeNumber: z.number(),
    historicalFigure: z.string(),
    publishDate: z.date(),
    youtubeId: z.string(),
    description: z.string(),
    relatedRecipes: z.array(z.string()),
    thumbnail: z.string().optional(),
  }),
});

export const collections = {
  recipes: recipesCollection,
  episodes: episodesCollection,
};
