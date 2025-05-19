import { Product, ProductTranslation } from '@/types/product';

interface JsonLdProductProps {
  product: Product;
  url: string;
  translations?: ProductTranslation[];
  language?: string;
}

export default function JsonLdProduct({ product, url, translations = [], language = 'fr' }: JsonLdProductProps) {
  console.log('JsonLdProduct rendering with:', { productId: product?.id, url, translationsCount: translations?.length });
  
  if (!product) {
    console.log('No product data available for JSON-LD');
    return null;
  }
  
  // Get the translation for the current language
  const translation = Array.isArray(translations) ? 
    translations.find(t => t.language.toLowerCase() === language.toLowerCase()) : null;
  
  // Use translated content when available, fall back to default product data
  const name = translation?.name || product.name;
  const description = translation?.description || product.description;
  
  // Process all product images for structured data
  const productImages = [];
  
  if (product.media && product.media.length > 0) {
    // Add all product images to the array with proper structured data
    product.media.forEach((media, index) => {
      productImages.push({
        '@type': 'ImageObject',
        '@id': `${url}#image${index + 1}`,
        'url': media.url,
        'width': 800,  // Default width for all images
        'height': 800, // Default height for all images
        'caption': `${name} - Image ${index + 1}`
      });
    });
  } else {
    // Fallback to logo if no product images
    productImages.push({
      '@type': 'ImageObject',
      '@id': `${url}#logo`,
      'url': 'https://www.elitemedicaleservices.tn/logo.png',
      'width': 512,
      'height': 512,
      'caption': 'Elite Médicale Services Logo'
    });
  }
  
  // Map stock status to Schema.org availability
  let availability = 'https://schema.org/OutOfStock';
  if (product.stock === 'IN_STOCK') {
    availability = 'https://schema.org/InStock';
  } else if (product.stock === 'PRE_ORDER') {
    availability = 'https://schema.org/PreOrder';
  }
  
  // Build the structured data object
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: productImages,  // Use the array of ImageObject items
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    sku: product.id,
    identifier: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.category,
    url,
    offers: {
      '@type': 'Offer',
      url,
      itemCondition: 'https://schema.org/NewCondition',
      availability,
      seller: {
        '@type': 'Organization',
        name: 'Elite Médicale Services'
      },
      // Indicate that price is available upon request
      priceSpecification: {
        '@type': 'PriceSpecification',
        valueAddedTaxIncluded: true,
        price: 0,
        priceCurrency: 'TND'
      }
    }
  };
  

  // Log the final structured data object
  console.log('Generated JSON-LD structured data:', { 
    productName: structuredData.name,
    imageCount: Array.isArray(structuredData.image) ? structuredData.image.length : 0,
    availability: structuredData.offers.availability
  });
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      id="product-jsonld"
    />
  );
}
