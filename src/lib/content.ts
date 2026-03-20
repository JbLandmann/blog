import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// ─── Types ───────────────────────────────────────────────────────────

/** A blog post from the content collection. */
export type BlogPost = CollectionEntry<'blog'>;

// ─── Data Access ─────────────────────────────────────────────────────

/**
 * Fetch all published (non-draft) blog posts.
 *
 * This is the **only** place draft filtering happens — all pages
 * must go through this function to guarantee drafts never leak.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getCollection('blog', ({ data }) => !data.draft);
}

// ─── Sorting ─────────────────────────────────────────────────────────

/** Sort posts by publication date, newest first. Returns a new array. */
export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

// ─── Filtering ───────────────────────────────────────────────────────

/** Return only posts matching the given tag (case-insensitive). */
export function filterByTag(posts: BlogPost[], tag: string): BlogPost[] {
  const lower = tag.toLowerCase();
  return posts.filter((p) =>
    p.data.tags.some((t) => t.toLowerCase() === lower),
  );
}

/** Return all unique tags across the given posts, sorted alphabetically. */
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set(posts.flatMap((p) => p.data.tags));
  return [...tags].sort((a, b) => a.localeCompare(b, 'fr-FR'));
}

// ─── Date Formatting ─────────────────────────────────────────────────

const FR_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/** Format a date for display in the French locale (e.g. "15 janvier 2025"). */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', FR_DATE_OPTIONS);
}

/** Format a date as ISO 8601 string (for `datetime` attributes). */
export function isoDate(date: Date): string {
  return date.toISOString();
}

// ─── URL Helpers ─────────────────────────────────────────────────────

/** Build the canonical URL path for a blog post. */
export function postUrl(post: BlogPost): string {
  return `/blog/blog/${post.slug}/`;
}
