import { SERIES, SERIES_KEYS, type SeriesKey } from "./series";

export const YOUTUBE_CHANNEL_ID = "UCbWnIZ01Bxh2DRUj9-kcDpg";

/* ── Sound Bites (Shorts) ─────────────────────────────────────────
   Pulled at build time from each series' Shorts playlist via YouTube's
   public RSS feed — no API key needed. The feed returns the latest 15. */

export interface Short {
  id: string;
  title: string;
  published: Date;
  views: number;
  series: SeriesKey;
  thumbnail: string;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Hashtags are for the algorithm, not the website
const cleanTitle = (s: string) =>
  decode(s)
    .replace(/#\S+/g, "")
    .replace(/^\s*Kaz Cooks[^|]*\|\s*/i, "")
    .replace(/\s*\|\s*Kaz Cooks[^|]*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();

async function fetchPlaylistFeed(playlistId: string, series: SeriesKey): Promise<Short[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
      const id = entry.match(/<yt:videoId>([^<]+)/)?.[1] ?? "";
      const rawTitle = entry.match(/<media:title>([^<]*)/)?.[1] ?? "";
      return {
        id,
        title: cleanTitle(rawTitle),
        published: new Date(entry.match(/<published>([^<]+)/)?.[1] ?? 0),
        views: Number(entry.match(/views="(\d+)"/)?.[1] ?? 0),
        // Trust the title over the playlist when a national dish has been filed under History
        series: /national dish/i.test(rawTitle) ? "nations" : series,
        thumbnail: `https://i.ytimg.com/vi/${id}/oar2.jpg`,
      };
    }).filter((s) => s.id);
  } catch {
    return [];
  }
}

let shortsPromise: Promise<Short[]> | undefined;

export function getShorts(): Promise<Short[]> {
  shortsPromise ??= Promise.all(
    SERIES_KEYS.map((k) => fetchPlaylistFeed(SERIES[k].shortsPlaylistId, k))
  ).then((lists) =>
    [...new Map(lists.flat().map((s) => [s.id, s])).values()].sort((a, b) => b.published.getTime() - a.published.getTime())
  );
  return shortsPromise;
}

/* ── Audience numbers ─────────────────────────────────────────────
   YouTube is fetched automatically when YOUTUBE_API_KEY is set.
   Instagram and TikTok don't offer account-wide view totals through a
   simple public API, so they're set by hand via env vars (e.g. "1.2M").
   Any *_VIEWS / *_FOLLOWERS env var overrides the fetched value. */

export const SOCIALS = {
  youtube: { label: "YouTube", url: "https://www.youtube.com/@KazMielony", followerNoun: "subscribers" },
  instagram: { label: "Instagram", url: "https://instagram.com/kazmielony", followerNoun: "followers" },
  tiktok: { label: "TikTok", url: "https://www.tiktok.com/@kazmielony", followerNoun: "followers" },
} as const;

export type SocialKey = keyof typeof SOCIALS;

export interface PlatformStats {
  key: SocialKey;
  label: string;
  url: string;
  followerNoun: string;
  views?: number;
  followers?: number;
}

// Accepts "1234567", "1,234,567", "350K" or "1.2M"
function parseCount(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const m = value.trim().replace(/,/g, "").match(/^(\d+(?:\.\d+)?)\s*([kKmMbB])?$/);
  if (!m) return undefined;
  const mult = { k: 1e3, m: 1e6, b: 1e9 }[m[2]?.toLowerCase() as "k" | "m" | "b"] ?? 1;
  return Math.round(Number(m[1]) * mult);
}

async function fetchYouTubeStats(): Promise<{ views?: number; followers?: number }> {
  const key = import.meta.env.YOUTUBE_API_KEY;
  if (!key) return {};
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${key}`);
    if (!res.ok) return {};
    const stats = (await res.json()).items?.[0]?.statistics;
    return {
      views: stats?.viewCount ? Number(stats.viewCount) : undefined,
      followers: stats?.hiddenSubscriberCount ? undefined : Number(stats?.subscriberCount ?? 0) || undefined,
    };
  } catch {
    return {};
  }
}

let statsPromise: Promise<{ platforms: PlatformStats[]; totalViews: number }> | undefined;

export function getAudienceStats() {
  statsPromise ??= (async () => {
    const env = import.meta.env;
    const yt = await fetchYouTubeStats();
    const raw: Record<SocialKey, { views?: number; followers?: number }> = {
      youtube: {
        views: parseCount(env.YOUTUBE_VIEWS) ?? yt.views,
        followers: parseCount(env.YOUTUBE_SUBSCRIBERS) ?? yt.followers,
      },
      instagram: { views: parseCount(env.INSTAGRAM_VIEWS), followers: parseCount(env.INSTAGRAM_FOLLOWERS) },
      tiktok: { views: parseCount(env.TIKTOK_VIEWS), followers: parseCount(env.TIKTOK_FOLLOWERS) },
    };
    const platforms = (Object.keys(SOCIALS) as SocialKey[])
      .map((key) => ({ key, ...SOCIALS[key], ...raw[key] }))
      .filter((p) => p.views !== undefined || p.followers !== undefined);
    const totalViews = platforms.reduce((sum, p) => sum + (p.views ?? 0), 0);
    return { platforms, totalViews };
  })();
  return statsPromise;
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
