import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [

      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },

      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'cohere-ai',
          'Omgilibot',
          'FacebookBot',
          'Diffbot',
          'Bytespider',
          'ImagesiftBot',
          'Amazonbot',
          'PetalBot',
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
        ],
        disallow: '/',
      },

      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
        crawlDelay: 10,
      },
    ],
    sitemap: 'https://albaanton.blog/sitemap.xml',
  }
}
