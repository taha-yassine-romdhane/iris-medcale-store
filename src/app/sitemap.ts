import { MetadataRoute } from 'next';

// This file generates a sitemap.xml automatically for better SEO
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elitemedicaleservices.tn';
  
  // Define type for changeFrequency - must be one of the allowed values
  type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  
  // Static pages that actually exist on the site
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apnee-du-sommeil`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/space-pro`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    },
    // Don't include login/signup pages - they're not relevant for search engines
  ];
  
  // Actual category pages from your site
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/products?category=APPAREILS+CPAP%2FPPC`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products?category=ACCESSOIRES+CPAP%2FPPC`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products?category=CONCENTRATEURS+D%27OXYGENE`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products?category=MASQUES`,
      lastModified: new Date(), 
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=APPAREILS+NEBULISEUR`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=APPAREILS+ASPIRATUER`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=ACCESSOIRES+AEROSOL`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=ACCESSOIRE+ASPIRATEUR`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=LIT+MEDICALISE`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search?q=cpap`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    },
  ];
  
  // Note: We could add common product pages, but would need to know the actual product IDs
  // For now, removing the non-existent location landing pages
  
  // Combine all pages for the sitemap
  return [...staticPages, ...categoryPages];
}
