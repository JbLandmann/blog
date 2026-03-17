import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'JB Landmann — Blog',
    description: 'Réflexions sur l\'AI, l\'automatisation et les outils de développement.',
    site: context.site!.href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/blog/${post.slug}/`,
    })),
    customData: '<language>fr-FR</language>',
  });
}
