/**
 * GROQ projections. Every query lists its fields explicitly so no private
 * data (e.g. comment emails) can reach page payloads by accident.
 */

export const releaseCardFields = /* groq */ `
  _id,
  _createdAt,
  title,
  description,
  publishedAt,
  "slug": slug.current,
  mainImage {
    asset -> { _id, url, "lqip": metadata.lqip, "dimensions": metadata.dimensions },
    hotspot,
    crop
  }
`;

export const releasesQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] {
    ${releaseCardFields}
  }
`;

export const releaseSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)].slug.current
`;

export const releaseBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${releaseCardFields},
    purchaseEmbed,
    embed,
    body
  }
`;

/** Approved comments: public fields only. Email is deliberately excluded. */
export const approvedCommentsQuery = /* groq */ `
  *[_type == "comment" && post._ref == $postId && approved == true]
    | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      comment
    }
`;

/** The legacy "mainImage" document used to promote a release. */
export const legacyFeatureQuery = /* groq */ `
  *[_type == "mainImage"][0] {
    releaseName,
    releaseType,
    releaseUrl,
    isDebut
  }
`;

/** Count of recent submissions by hashed IP for abuse limiting. */
export const recentSubmissionsByIpQuery = /* groq */ `
  count(*[_type in ["comment", "emails"] && ipHash == $ipHash && _createdAt > $since])
`;

export const subscriberByEmailQuery = /* groq */ `
  *[_type == "emails" && lower(email) == $email] { _id, status }
`;
