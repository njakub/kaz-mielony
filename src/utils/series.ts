import type { CollectionEntry } from "astro:content";

// Each series maps to a YouTube playlist (plus a Shorts playlist for Sound Bites). To add a new one, add an entry here
// and add its key to the `series` enum in src/content/config.ts.
export const SERIES = {
  history: {
    key: "history",
    name: "Kaz Cooks History",
    short: "History",
    tagline: "The go-to meals of famous (and infamous) figures — scientists, movie stars, dictators and revolutionaries.",
    noun: "figures",
    playlist: "https://www.youtube.com/playlist?list=PLVZ9MD2QVF282Cg1LYCnqzJx6amI7pFVo",
    shortsPlaylistId: "PLVZ9MD2QVF2-xyU6qs7LtX8geJUjoT8n9",
  },
  nations: {
    key: "nations",
    name: "Kaz Cooks Nations",
    short: "Nations",
    tagline: "A country picked at random. Its national dish. A bit of history on the side.",
    noun: "nations",
    playlist: "https://www.youtube.com/playlist?list=PLVZ9MD2QVF292YpI6Ic8Gr9D_c42ZWNLd",
    shortsPlaylistId: "PLVZ9MD2QVF2_PwTUQf2trA9culpyhO7qT",
  },
} as const;

export type SeriesKey = keyof typeof SERIES;
export const SERIES_KEYS = Object.keys(SERIES) as SeriesKey[];

type Episode = CollectionEntry<"episodes">;
type Recipe = CollectionEntry<"recipes">;

export function getEpisodeSeries(episode: Episode): SeriesKey {
  if (episode.data.series) return episode.data.series;
  return /national dish(es)? series/i.test(episode.data.description) ? "nations" : "history";
}

export function findRecipeEpisode(recipe: Recipe, episodes: Episode[]): Episode | undefined {
  return (
    episodes.find((e) => e.data.relatedRecipes.includes(recipe.slug)) ??
    episodes.find((e) => recipe.data.episode !== undefined && e.data.episodeNumber === recipe.data.episode)
  );
}

export function getRecipeSeries(recipe: Recipe, episodes: Episode[]): SeriesKey {
  if (recipe.data.series) return recipe.data.series;
  const episode = findRecipeEpisode(recipe, episodes);
  return episode ? getEpisodeSeries(episode) : "history";
}

export function hasVideo(episode: Episode): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(episode.data.youtubeId);
}

export function getEpisodeThumbnail(episode: Episode): string | undefined {
  if (episode.data.thumbnail) return episode.data.thumbnail;
  if (hasVideo(episode)) return `https://i.ytimg.com/vi/${episode.data.youtubeId}/hqdefault.jpg`;
  return undefined;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function formatMinutes(total: number): string {
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}
