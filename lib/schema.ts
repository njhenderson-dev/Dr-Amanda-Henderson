import { site, practice, fullAddress, serviceAreas } from "./site";

// Stable @id anchors so search engines & LLMs understand these are the same
// entities across every page.
export const IDS = {
  physician: `${site.url}/#physician`,
  person: `${site.url}/#amanda`,
  clinic: `${site.url}/#clinic`,
  website: `${site.url}/#website`,
  organization: `${site.url}/#practice`,
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: practice.streetAddress,
  addressLocality: practice.suburb,
  addressRegion: practice.region,
  postalCode: practice.postcode,
  addressCountry: practice.country,
};

// Aggregate of clinical interests, de-duplicated, for knowsAbout / specialties.
const knowsAbout = Array.from(
  new Set(serviceAreas.flatMap((s) => s.knowsAbout)),
);

export function physicianSchema() {
  return {
    "@type": ["Physician", "Person"],
    "@id": IDS.physician,
    name: "Dr Amanda Henderson",
    givenName: "Amanda",
    familyName: "Henderson",
    honorificPrefix: "Dr",
    jobTitle: "General Practitioner",
    description: site.description,
    url: site.url,
    // Placeholder until real photography is supplied (see MIGRATION-PLAN.md §15).
    image: `${site.url}/images/dr-amanda-henderson.svg`,
    gender: "Female",
    medicalSpecialty: ["PrimaryCare", "Gynecologic", "Pediatric"],
    knowsAbout,
    telephone: practice.phone,
    address: postalAddress,
    memberOf: {
      "@type": "MedicalOrganization",
      name: "Royal Australian College of General Practitioners",
    },
    worksFor: { "@id": IDS.clinic },
    availableService: serviceAreas.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      url: `${site.url}${s.href}`,
    })),
  };
}

export function clinicSchema() {
  return {
    "@type": "MedicalClinic",
    "@id": IDS.clinic,
    name: practice.name,
    url: site.url,
    telephone: practice.phone,
    address: postalAddress,
    areaServed: [
      "Maroubra",
      "South Maroubra",
      "Coogee",
      "Randwick",
      "Kingsford",
      "Eastern Suburbs, Sydney",
    ],
    medicalSpecialty: "PrimaryCare",
    availableService: serviceAreas.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
    })),
    employee: { "@id": IDS.physician },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    url: site.url,
    name: `${site.name} — ${site.role}, Maroubra`,
    inLanguage: "en-AU",
    publisher: { "@id": IDS.physician },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@type": "MedicalWebPage",
    "@id": `${site.url}/articles/${a.slug}/#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    inLanguage: "en-AU",
    author: { "@id": IDS.physician },
    reviewedBy: { "@id": IDS.physician },
    publisher: { "@id": IDS.physician },
    mainEntityOfPage: `${site.url}/articles/${a.slug}`,
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.physician },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Wraps one or more node types into a single @graph document.
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
