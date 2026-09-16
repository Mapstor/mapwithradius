// Single source of truth for the tool pages' JSON-LD, so every page emits the same,
// schema.org-valid shape. Nodes cross-reference the sitewide Organization/WebSite defined
// in the (main) layout by @id (referenced, never duplicated here).

const BASE = 'https://mapwithradius.com';

export interface ToolPageSchemaInput {
  /** Route path, '' for the homepage, e.g. '/km-radius-map'. */
  path: string;
  /** WebApplication/WebPage name. */
  name: string;
  /** Matches the page's meta description. */
  description: string;
  /** Same-domain hero image path, e.g. '/images/km-radius-map-10-km-london.png'. Omit for a
   *  page with no hero image (the ImageObject node is then left out entirely). */
  image?: string;
  /** One-line image caption (only used when `image` is set). */
  imageCaption?: string;
  /** Breadcrumb leaf label; omit on the homepage (breadcrumb is just Home). */
  breadcrumbName?: string;
  /** Optional WebApplication.featureList (schema.org Text[]) — quotable feature bullets. */
  featureList?: string[];
  imageWidth?: number;
  imageHeight?: number;
}

/** Build the tool-page JSON-LD graph (WebPage + primary ImageObject + WebApplication + BreadcrumbList). */
export function buildToolPageSchema(input: ToolPageSchemaInput) {
  const pageUrl = input.path ? `${BASE}${input.path}` : `${BASE}/`;
  const imageId = `${pageUrl}#primaryimage`;
  const hasImage = !!input.image;

  const breadcrumbItems: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
  ];
  if (input.breadcrumbName) {
    breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: input.breadcrumbName, item: pageUrl });
  }

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: input.name,
      description: input.description,
      isPartOf: { '@id': `${BASE}/#website` },
      ...(hasImage ? { primaryImageOfPage: { '@id': imageId }, image: { '@id': imageId } } : {}),
    },
  ];

  if (hasImage) {
    graph.push({
      '@type': 'ImageObject',
      '@id': imageId,
      url: `${BASE}${input.image}`,
      contentUrl: `${BASE}${input.image}`,
      width: input.imageWidth ?? 1600,
      height: input.imageHeight ?? 900,
      ...(input.imageCaption ? { caption: input.imageCaption } : {}),
      representativeOfPage: true,
    });
  }

  graph.push(
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#webapp`,
        name: input.name,
        url: pageUrl,
        description: input.description,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        ...(input.featureList && input.featureList.length ? { featureList: input.featureList } : {}),
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      }
  );

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
