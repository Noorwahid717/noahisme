export const SITE = {
  name: "Noah Isme",
  title: "Noah Isme · Senior Frontend & UX Engineer",
  description:
    "Menciptakan pengalaman digital presisi tinggi dengan aksesibilitas, performa, dan detail visual yang sempurna.",
  url: "https://noahisme.vercel.app",
  locale: "id-ID",
};

export type Breadcrumb = {
  name: string;
  url: string;
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Senior Frontend & UX Engineer",
  url: SITE.url,
  image: `${SITE.url}/og-default.svg`,
  sameAs: [
    "https://github.com/noahisme",
    "https://www.linkedin.com/in/noahisme",
    "https://dribbble.com/noahisme",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.title,
  url: SITE.url,
  description: SITE.description,
  inLanguage: SITE.locale,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/search?q={query}`,
    "query-input": "required name=query",
  },
};

export function buildBreadcrumbs(trail: Breadcrumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}
