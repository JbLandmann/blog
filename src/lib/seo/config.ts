export interface SeoConfig {
  readonly siteName: string;
  readonly defaultAuthor: string;
  readonly defaultImage: string;
  readonly locale: string;
  readonly authorUrl: string;
  readonly faviconSvg: string;
  readonly faviconPng: string;
  readonly rssPath: string;
  readonly fontsUrl: string;
}

export const DEFAULT_CONFIG: SeoConfig = {
  siteName: 'JB Landmann',
  defaultAuthor: 'Jean-Baptiste Landmann',
  defaultImage: '/blog/meta_img.png',
  locale: 'fr_FR',
  authorUrl: 'https://github.com/JbLandmann',
  faviconSvg: '/blog/logo_blog.svg',
  faviconPng: '/blog/logo_blog.png',
  rssPath: '/blog/rss.xml',
  fontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
};
