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
  /** Same-domain hero image path, e.g. '/images/km-radius-map-10-km-london.png'. */
  image: string;
  /** One-line image caption. */
  imageCaption: string;
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
  const imageUrl = `${BASE}${input.image}`;
  const imageId = `${pageUrl}#primaryimage`;

  const breadcrumbItems: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
  ];
  if (input.breadcrumbName) {
    breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: input.breadcrumbName, item: pageUrl });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: input.name,
        description: input.description,
        isPartOf: { '@id': `${BASE}/#website` },
        primaryImageOfPage: { '@id': imageId },
        image: { '@id': imageId },
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: imageUrl,
        contentUrl: imageUrl,
        width: input.imageWidth ?? 1600,
        height: input.imageHeight ?? 900,
        caption: input.imageCaption,
        representativeOfPage: true,
      },
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
      },
    ],
  };
}
