import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, sortByDateDesc, postUrl } from '../lib/content';
import { DEFAULT_CONFIG } from '../lib/seo/config';

export async function GET(context: APIContext) {
  const posts = sortByDateDesc(await getPublishedPosts());

  return rss({
    title: `${DEFAULT_CONFIG.siteName} — Blog`,
    description: 'Réflexions sur l\'AI, l\'automatisation et les outils de développement.',
    site: context.site!.href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post),
    })),
    customData: '<language>fr-FR</language>',
  });
}
