import type { PageSeoInput, SiteContext, ResolvedSeo } from './types.js';
import { type SeoConfig, DEFAULT_CONFIG } from './config.js';

/**
 * Resolve raw page input + site context into a fully concrete SEO data object.
 *
 * Every conditional, default, and URL resolution happens here.
 * The output has zero optionality that affects rendering decisions.
 */
export function resolvePageSeo(
  input: PageSeoInput,
  ctx: SiteContext,
  configOverrides?: Partial<SeoConfig>,
): ResolvedSeo {
  const config = { ...DEFAULT_CONFIG, ...configOverrides };

  const type = input.type ?? (input.pubDate ? 'article' : 'website');
  const author = input.author ?? config.defaultAuthor;
  const canonicalUrl = new URL(ctx.url.pathname, ctx.site).href;
  const ogImage = input.image
    ? new URL(input.image, ctx.site).href
    : new URL(config.defaultImage, ctx.site).href;
  const keywords = input.tags?.length ? input.tags.join(', ') : null;

  return {
    fullTitle: `${input.title} — ${config.siteName}`,
    description: input.description,
    canonicalUrl,
    author,
    keywords,
    generator: ctx.generator,

    og: {
      type,
      title: input.title,
      description: input.description,
      url: canonicalUrl,
      siteName: config.siteName,
      image: ogImage,
      locale: config.locale,
      publishedTime: input.pubDate?.toISOString() ?? null,
      modifiedTime: input.updatedDate?.toISOString() ?? null,
      tags: input.tags ?? [],
    },

    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      image: ogImage,
    },

    jsonLd: type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: input.title,
          description: input.description,
          image: ogImage,
          datePublished: input.pubDate?.toISOString(),
          dateModified: input.updatedDate?.toISOString() ?? input.pubDate?.toISOString(),
          author: {
            '@type': 'Person',
            name: author,
            url: config.authorUrl,
          },
          publisher: {
            '@type': 'Person',
            name: author,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          keywords: keywords ?? '',
        }
      : null,

    favicons: {
      svg: config.faviconSvg,
      png: config.faviconPng,
      appleTouchIcon: config.faviconPng,
    },
    rssUrl: config.rssPath,
    fontsUrl: config.fontsUrl,
  };
}
