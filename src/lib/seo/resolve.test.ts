import { describe, it, expect } from 'vitest';
import { resolvePageSeo } from './resolve';
import type { PageSeoInput, SiteContext } from './types';

const BASE_CTX: SiteContext = {
  url: new URL('/blog/', 'https://example.com'),
  site: new URL('https://example.com'),
  generator: 'Astro v4.16.19',
};

const BASE_INPUT: PageSeoInput = {
  title: 'Test Page',
  description: 'A test page description',
};

describe('resolvePageSeo', () => {
  describe('website page (no pubDate)', () => {
    const seo = resolvePageSeo(BASE_INPUT, BASE_CTX);

    it('builds full title with site name', () => {
      expect(seo.fullTitle).toBe('Test Page — JB Landmann');
    });

    it('resolves canonical URL', () => {
      expect(seo.canonicalUrl).toBe('https://example.com/blog/');
    });

    it('uses default author', () => {
      expect(seo.author).toBe('Jean-Baptiste Landmann');
    });

    it('uses default OG image', () => {
      expect(seo.og.image).toBe('https://example.com/blog/meta_img.png');
    });

    it('sets og:type to website', () => {
      expect(seo.og.type).toBe('website');
    });

    it('does not generate JSON-LD', () => {
      expect(seo.jsonLd).toBeNull();
    });

    it('has null keywords when no tags', () => {
      expect(seo.keywords).toBeNull();
    });

    it('includes generator', () => {
      expect(seo.generator).toBe('Astro v4.16.19');
    });
  });

  describe('article page (with pubDate)', () => {
    const input: PageSeoInput = {
      ...BASE_INPUT,
      title: 'My Article',
      pubDate: new Date('2025-06-15T00:00:00Z'),
      updatedDate: new Date('2025-07-01T00:00:00Z'),
      tags: ['AI', 'TypeScript'],
      author: 'Custom Author',
    };
    const ctx: SiteContext = {
      ...BASE_CTX,
      url: new URL('/blog/blog/my-article/', 'https://example.com'),
    };
    const seo = resolvePageSeo(input, ctx);

    it('auto-detects article type from pubDate', () => {
      expect(seo.og.type).toBe('article');
    });

    it('generates JSON-LD BlogPosting', () => {
      expect(seo.jsonLd).not.toBeNull();
      expect(seo.jsonLd!['@type']).toBe('BlogPosting');
    });

    it('includes published and modified times in OG', () => {
      expect(seo.og.publishedTime).toBe('2025-06-15T00:00:00.000Z');
      expect(seo.og.modifiedTime).toBe('2025-07-01T00:00:00.000Z');
    });

    it('sets JSON-LD dates', () => {
      expect(seo.jsonLd!.datePublished).toBe('2025-06-15T00:00:00.000Z');
      expect(seo.jsonLd!.dateModified).toBe('2025-07-01T00:00:00.000Z');
    });

    it('uses custom author', () => {
      expect(seo.author).toBe('Custom Author');
      expect(seo.jsonLd!.author.name).toBe('Custom Author');
    });

    it('builds keywords from tags', () => {
      expect(seo.keywords).toBe('AI, TypeScript');
    });

    it('passes tags to OG', () => {
      expect(seo.og.tags).toEqual(['AI', 'TypeScript']);
    });

    it('twitter card matches OG image', () => {
      expect(seo.twitter.image).toBe(seo.og.image);
    });
  });

  describe('custom image', () => {
    it('resolves relative image path to absolute URL', () => {
      const seo = resolvePageSeo(
        { ...BASE_INPUT, image: '/blog/images/cover.png' },
        BASE_CTX,
      );
      expect(seo.og.image).toBe('https://example.com/blog/images/cover.png');
    });
  });

  describe('article without updatedDate', () => {
    it('falls back dateModified to datePublished in JSON-LD', () => {
      const seo = resolvePageSeo(
        { ...BASE_INPUT, pubDate: new Date('2025-01-01T00:00:00Z') },
        BASE_CTX,
      );
      expect(seo.jsonLd!.dateModified).toBe('2025-01-01T00:00:00.000Z');
    });
  });

  describe('static resources', () => {
    const seo = resolvePageSeo(BASE_INPUT, BASE_CTX);

    it('includes favicon paths', () => {
      expect(seo.favicons.svg).toBe('/blog/logo_blog.svg');
      expect(seo.favicons.png).toBe('/blog/logo_blog.png');
    });

    it('includes RSS and fonts URLs', () => {
      expect(seo.rssUrl).toBe('/blog/rss.xml');
      expect(seo.fontsUrl).toContain('fonts.googleapis.com');
    });
  });
});
