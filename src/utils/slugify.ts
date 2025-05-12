/**
 * Converts a product name to a URL-friendly slug
 * @param name The product name to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
}

/**
 * Creates a SEO-friendly URL slug from a product name
 * @param name The product name
 * @param id The product ID (not used in the slug, but kept for backward compatibility)
 * @returns A URL-friendly slug in the format "product-name"
 */
export function createProductSlug(name: string, id: string): string {
  return slugify(name);
}

/**
 * Extracts the product ID from a slug
 * @param slug The product slug in the format "product-name-shortid"
 * @returns The product ID or shortId
 */
export function extractIdFromSlug(slug: string): string {
  // If the slug contains hyphens, extract the last part as the shortId
  if (slug.includes('-')) {
    return slug.split('-').pop() || slug;
  }
  // If no hyphens, assume the entire slug is the ID
  return slug;
}
