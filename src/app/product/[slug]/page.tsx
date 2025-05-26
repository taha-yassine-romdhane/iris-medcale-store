import type { Metadata } from 'next';
import ProductClient from './ProductClient';
import JsonLdProduct from './JsonLd';
import { createProductSlug } from '@/utils/slugify';

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // Ensure params is awaited before accessing properties
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Always use French as the preferred language
  const preferredLanguage = 'fr';
  
  try {
    // We need to use an absolute URL for server-side fetch
    const baseUrl =  'https://www.elitemedicaleservices.tn';
    // Fetch both product and translations in parallel for better performance
    const [productRes, translationsRes] = await Promise.all([
      fetch(`${baseUrl}/api/products/by-name/${slug}`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/products/by-name/${slug}/translations`, { next: { revalidate: 3600 } })
    ]);
    
    if (!productRes.ok) {
      return {
        title: 'Product Not Found | Elite Médicale Services',
        description: 'The requested product could not be found.',
      };
    }
    
    // Handle potential errors in both requests
    if (!productRes.ok || !translationsRes.ok) {
      return {
        title: 'Product Not Found | Elite Médicale Services',
        description: 'The requested product could not be found.',
      };
    }
    
    const [product, translations] = await Promise.all([
      productRes.json(),
      translationsRes.json()
    ]);
    
    // Get the translation for the preferred language
    const translation = Array.isArray(translations) ? 
      translations.find(t => t.language.toLowerCase() === preferredLanguage) : null;
      
    // Use translated content when available, fall back to default product data
    const productName = translation?.name || product.name;
    const productDescription = translation?.description || product.description;
    
    // Process all product images for OpenGraph
    const productImages = [];
    
    if (product.media && product.media.length > 0) {
      // Add all product images with proper metadata
      product.media.forEach((media: { url: string }) => {
        productImages.push({
          url: media.url,
          width: 800,  // Default width for all images
          height: 800, // Default height for all images
          alt: `${productName} - ${product.brand}`
        });
      });
    } else {
      // Fallback to logo if no product images
      productImages.push({
        url: `https://www.elitemedicaleservices.tn/logo.png`,
        width: 512,
        height: 512,
        alt: 'Elite Médicale Services Logo'
      });
    }
    
    // Get the first image URL for simple references
    const imageUrl = productImages.length > 0 ? productImages[0].url : `https://www.elitemedicaleservices.tn/logo.png`;
      
    // Create a list of supported languages for hreflang tags
    const languages = Array.isArray(translations) ? 
      translations.map(t => t.language.toLowerCase()) : [];
    
    // Add default language if not already in the list
    if (!languages.includes('fr')) {
      languages.push('fr');
    }
    
    // Generate hreflang alternates for each supported language
    const languageAlternates: Record<string, string> = {};
    const productSlug = createProductSlug(product.name);
    languages.forEach(lang => {
      languageAlternates[lang] = `https://www.elitemedicaleservices.tn/product/${productSlug}?lang=${lang}`;
    });
    
    const metadata: Metadata = {
      title: `${productName} | ${product.brand} | Elite Médicale Services`,
      description: productDescription?.substring(0, 155) || `Découvrez ${productName} de ${product.brand} chez Elite Médicale Services. Livraison rapide en Tunisie.`,
      keywords: [productName, product.brand, product.category, product.type, 'équipement médical', 'Tunisie'].filter(Boolean).join(', '),
      openGraph: {
        title: `${productName} | ${product.brand}`,
        description: (productDescription?.substring(0, 155) || `Découvrez ${productName} de ${product.brand} chez Elite Médicale Services.`) + ' Livraison en Tunisie.',
        images: productImages,
        type: 'website',
        locale: 'fr_TN',
        siteName: 'Elite Médicale Services',
        url: `https://www.elitemedicaleservices.tn/product/${createProductSlug(product.name)}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} | ${product.brand} | Elite Médicale Services`,
        description: (productDescription?.substring(0, 155) || `Découvrez ${productName} de ${product.brand} chez Elite Médicale Services.`) + ' Livraison en Tunisie.',
        images: [{
          url: imageUrl,
          alt: `${productName} - ${product.brand}`,
          width: 1200,
          height: 630,
        }],
        site: '@elitemedicaleservices',
        creator: '@elitemedicaleservices',
      },
      alternates: {
        canonical: `https://www.elitemedicaleservices.tn/product/${createProductSlug(product.name)}`,
        languages: languageAlternates,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      },
      other: {
        // OpenGraph product properties
        'og:type': 'website',
        'og:product': 'true',
        'product:brand': product.brand,
        'product:category': product.category,
        'product:availability': product.stock === 'IN_STOCK' ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:retailer_item_id': product.id,
        'product:retailer_title': 'Elite Médicale Services',
        // Facebook Product Tags
        'fb:app_id': 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
        // Additional structured data hints
        'twitter:label1': 'Disponibilité',
        'twitter:data1': product.stock === 'IN_STOCK' ? 'En stock' : 'Rupture de stock',
        'twitter:label2': 'Service Client',
        'twitter:data2': product.stock === 'IN_STOCK' ? 'En stock' : 'Rupture de stock',
      }
    };
    
    return metadata;
  } catch (error) {
    console.error('Error generating product metadata:', error);
    return {
      title: 'Product | Elite Médicale Services',
      description: 'Découvrez notre gamme de produits médicaux de haute qualité.',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  // This is a server component that renders the client component and adds structured data
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Get the base URL for the site
  const baseUrl = 'https://www.elitemedicaleservices.tn';
  
  // Fetch product data for JSON-LD
  console.log(`Fetching data for JSON-LD structured data: ${slug}`);
  try {
    const [productRes, translationsRes] = await Promise.all([
      fetch(`${baseUrl}/api/products/by-name/${slug}`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/products/by-name/${slug}/translations`, { next: { revalidate: 3600 } })
    ]);
    
    if (!productRes.ok || !translationsRes.ok) {
      // If product not found, just render the client component without structured data
      console.log('Product or translations fetch failed:', { 
        productStatus: productRes.status, 
        translationsStatus: translationsRes.status 
      });
      return <ProductClient />;
    }
    
    const [product, translations] = await Promise.all([
      productRes.json(),
      translationsRes.json()
    ]);
    
    console.log('Successfully fetched data for JSON-LD:', { 
      productId: product?.id, 
      productName: product?.name,
      translationsCount: Array.isArray(translations) ? translations.length : 0 
    });
    
    // Get the full URL for the product
    const productUrl = `${baseUrl}/product/${createProductSlug(product.name)}`;
    
    return (
      <>
        <JsonLdProduct 
          product={product} 
          url={productUrl} 
          translations={translations} 
          language="fr" 
        />
        <ProductClient />
      </>
    );
  } catch (error) {
    // In case of error, just render the client component without structured data
    console.error('Error fetching data for JSON-LD:', error);
    console.log('Falling back to client component without structured data');
    return <ProductClient />;
  }
}
