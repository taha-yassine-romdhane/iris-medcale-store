import type { Metadata } from 'next';
import ProductClient from './ProductClient';

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = params.slug;
  
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://www.elitemedicaleservices.tn';
    const productRes = await fetch(`${baseUrl}/api/products/by-name/${slug}`, { next: { revalidate: 3600 } });
    
    if (!productRes.ok) {
      return {
        title: 'Product Not Found | Elite Médicale Services',
        description: 'The requested product could not be found.',
      };
    }
    
    const product = await productRes.json();
    
    // Get the first image URL for OpenGraph
    const imageUrl = product.media && product.media.length > 0 
      ? product.media[0].url 
      : `https://www.elitemedicaleservices.tn/logo.png`;
    
    return {
      title: `${product.name} | ${product.brand} | Elite Médicale Services`,
      description: product.description?.substring(0, 160) || `Découvrez ${product.name} de ${product.brand} chez Elite Médicale Services. Livraison rapide en Tunisie.`,
      keywords: [product.name, product.brand, product.category, product.type, 'équipement médical', 'Tunisie'].filter(Boolean).join(', '),
      openGraph: {
        title: `${product.name} | ${product.brand}`,
        description: product.description?.substring(0, 160) || `Découvrez ${product.name} de ${product.brand} chez Elite Médicale Services.`,
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name
        }],
        type: 'website', // Valid OpenGraph type
        locale: 'fr_FR',
        siteName: 'Elite Médicale Services',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | ${product.brand}`,
        description: product.description?.substring(0, 160) || `Découvrez ${product.name} de ${product.brand} chez Elite Médicale Services.`,
        images: [imageUrl],
      },
      alternates: {
        canonical: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://www.elitemedicaleservices.tn'}/product/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'product:brand': product.brand,
        'product:category': product.category,
        'product:availability': product.stock === 'IN_STOCK' ? 'in stock' : 'out of stock',
      }
    };
  } catch (error) {
    console.error('Error generating product metadata:', error);
    return {
      title: 'Product | Elite Médicale Services',
      description: 'Découvrez notre gamme de produits médicaux de haute qualité.',
    };
  }
}

export default function ProductPage() {
  // This is a server component that renders the client component
  return <ProductClient />;
}
