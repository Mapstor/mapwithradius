import type { MetadataRoute } from 'next';

// Explicit "welcome" rules for the major AI crawlers. The default
// User-agent: * rule already allows everything except /embed, so these
// explicit per-bot blocks don't add new permissions — they just signal
// that the site explicitly welcomes AI training and answer-engine
// traffic. Per-bot rules also document our stance for future-proofing.
const AI_BOTS = [
  // OpenAI
  ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
  // Anthropic
  ['ClaudeBot', 'anthropic-ai', 'Claude-Web'],
  // Perplexity
  ['PerplexityBot', 'Perplexity-User'],
  // Google AI training (separate from Googlebot)
  ['Google-Extended'],
  // Apple Intelligence
  ['Applebot-Extended'],
  // Common Crawl (used by many AI training pipelines)
  ['CCBot'],
  // Meta AI
  ['Meta-ExternalAgent', 'FacebookBot'],
  // ByteDance / TikTok AI
  ['Bytespider'],
  // DuckDuckGo's AI assistant
  ['DuckAssistBot'],
];

export default function robots(): MetadataRoute.Robots {
  const aiRules = AI_BOTS.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: ['/embed', '/embed/'],
  }));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/embed', '/embed/'],
      },
      ...aiRules,
    ],
    sitemap: 'https://mapwithradius.com/sitemap.xml',
    host: 'https://mapwithradius.com',
  };
}
