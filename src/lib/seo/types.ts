/** Resolved URL + site context, passed explicitly (no Astro globals). */
export interface SiteContext {
  readonly url: URL;
  readonly site: URL;
  readonly generator?: string;
}

/** Raw page input — what the layout author provides. */
export interface PageSeoInput {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly type?: 'website' | 'article';
  readonly pubDate?: Date;
  readonly updatedDate?: Date;
  readonly author?: string;
  readonly tags?: readonly string[];
}

/** Fully resolved SEO data — every value concrete, no optionals that affect rendering. */
export interface ResolvedSeo {
  readonly fullTitle: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly author: string;
  readonly keywords: string | null;
  readonly generator: string | undefined;

  readonly og: {
    readonly type: 'website' | 'article';
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly siteName: string;
    readonly image: string;
    readonly locale: string;
    readonly publishedTime: string | null;
    readonly modifiedTime: string | null;
    readonly tags: readonly string[];
  };

  readonly twitter: {
    readonly card: 'summary_large_image';
    readonly title: string;
    readonly description: string;
    readonly image: string;
  };

  readonly jsonLd: {
    readonly '@context': 'https://schema.org';
    readonly '@type': 'BlogPosting';
    readonly headline: string;
    readonly description: string;
    readonly image: string;
    readonly datePublished: string | undefined;
    readonly dateModified: string | undefined;
    readonly author: {
      readonly '@type': 'Person';
      readonly name: string;
      readonly url: string;
    };
    readonly publisher: {
      readonly '@type': 'Person';
      readonly name: string;
    };
    readonly mainEntityOfPage: {
      readonly '@type': 'WebPage';
      readonly '@id': string;
    };
    readonly keywords: string;
  } | null;

  readonly favicons: {
    readonly svg: string;
    readonly png: string;
    readonly appleTouchIcon: string;
  };
  readonly rssUrl: string;
  readonly fontsUrl: string;
}
