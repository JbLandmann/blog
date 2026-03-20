import { describe, it, expect } from 'vitest';
import { sortByDateDesc, filterByTag, getAllTags, formatDate, isoDate, postUrl } from './content';
import type { BlogPost } from './content';

/** Helper to build a minimal mock post. */
function mockPost(overrides: {
  slug?: string;
  pubDate?: Date;
  tags?: string[];
  draft?: boolean;
}): BlogPost {
  return {
    id: overrides.slug ?? 'test-post',
    slug: overrides.slug ?? 'test-post',
    collection: 'blog',
    data: {
      title: 'Test Post',
      description: 'A test post',
      pubDate: overrides.pubDate ?? new Date('2025-06-15'),
      author: 'Jean-Baptiste Landmann',
      tags: overrides.tags ?? [],
      draft: overrides.draft ?? false,
    },
    body: '',
    render: async () => ({ Content: {} as any, headings: [], remarkPluginFrontmatter: {} }),
  } as unknown as BlogPost;
}

describe('sortByDateDesc', () => {
  it('sorts posts newest first', () => {
    const posts = [
      mockPost({ slug: 'old', pubDate: new Date('2025-01-01') }),
      mockPost({ slug: 'new', pubDate: new Date('2025-12-01') }),
      mockPost({ slug: 'mid', pubDate: new Date('2025-06-01') }),
    ];
    const sorted = sortByDateDesc(posts);
    expect(sorted.map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
  });

  it('does not mutate the original array', () => {
    const posts = [
      mockPost({ slug: 'b', pubDate: new Date('2025-01-01') }),
      mockPost({ slug: 'a', pubDate: new Date('2025-12-01') }),
    ];
    const original = [...posts];
    sortByDateDesc(posts);
    expect(posts.map((p) => p.slug)).toEqual(original.map((p) => p.slug));
  });

  it('returns empty array for empty input', () => {
    expect(sortByDateDesc([])).toEqual([]);
  });
});

describe('filterByTag', () => {
  const posts = [
    mockPost({ slug: 'a', tags: ['Astro', 'TypeScript'] }),
    mockPost({ slug: 'b', tags: ['Python'] }),
    mockPost({ slug: 'c', tags: ['astro', 'AI'] }),
  ];

  it('filters by tag (case-insensitive)', () => {
    const result = filterByTag(posts, 'astro');
    expect(result.map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('returns empty when no match', () => {
    expect(filterByTag(posts, 'Rust')).toEqual([]);
  });
});

describe('getAllTags', () => {
  it('returns unique tags sorted alphabetically', () => {
    const posts = [
      mockPost({ tags: ['TypeScript', 'Astro'] }),
      mockPost({ tags: ['astro', 'AI'] }),
    ];
    expect(getAllTags(posts)).toEqual(['AI', 'astro', 'Astro', 'TypeScript']);
  });

  it('returns empty for posts with no tags', () => {
    expect(getAllTags([mockPost({ tags: [] })])).toEqual([]);
  });
});

describe('formatDate', () => {
  it('formats date in French locale', () => {
    const result = formatDate(new Date('2025-01-15T00:00:00Z'));
    expect(result).toContain('janvier');
    expect(result).toContain('2025');
  });
});

describe('isoDate', () => {
  it('returns ISO 8601 string', () => {
    const date = new Date('2025-06-15T12:00:00Z');
    expect(isoDate(date)).toBe('2025-06-15T12:00:00.000Z');
  });
});

describe('postUrl', () => {
  it('builds canonical post URL', () => {
    const post = mockPost({ slug: 'my-first-post' });
    expect(postUrl(post)).toBe('/blog/blog/my-first-post/');
  });
});
