import { Product } from '@/types/product';

interface CategoryConfig {
  category?: string;
  type?: string;
}

const categoryMapping: { [key: string]: CategoryConfig } = {
  // CPAP
  'accessoires': { category: 'accessoires' },
  'machines': { category: 'cpap' },
  'pieces': { category: 'cpap', type: 'Pièce' },
  
  // Masques
  'nasal': { category: 'masques', type: 'Masque Nasal' },
  'facial': { category: 'masques', type: 'Masque Facial' },
  'narinaire': { category: 'masques', type: 'Masque Narinaire' },
  
  // Oxygène
  'concentrateurs': { type: 'Concentrateur' },
  'oxygene-accessoires': { category: 'oxygene', type: 'Accessoire' },
  
  // BiPAP
  'bipap-machines': { category: 'bipap', type: 'Machine' },
  'bipap-accessoires': { category: 'bipap', type: 'Accessoire' },
  
  // Aérosol
  'nebuliseurs': { category: 'aerosol', type: 'Nébuliseur' },
  'aerosol-accessoires': { category: 'aerosol', type: 'Accessoire' },
  
  // Aspirateur
  'aspirateur-machines': { category: 'aspirateur', type: 'Machine' },
  'consommables': { category: 'aspirateur', type: 'Consommable' },
  
  // Lit
  'medicalise': { category: 'lit', type: 'Médicalisé' },
  'lit-accessoires': { category: 'lit', type: 'Accessoire' }
};

export async function fetchCategoryProducts(pageType: string) {
  const config = categoryMapping[pageType] || { category: pageType };
  let url = '/api/products?limit=100&'; // Set a high limit to get all products
  
  if (config.category) {
    url += `category=${config.category}`;
  }
  
  if (config.type) {
    url += `${config.category ? '&' : ''}type=${config.type}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch products');
  
  const data = await response.json();
  
  // Ensure we have the products array
  if (!data || !data.products || !Array.isArray(data.products)) {
    console.error('Invalid data format:', data);
    throw new Error('Invalid data format received from server');
  }

  return {
    products: data.products,
    pagination: data.pagination,
    initialSelectedMedia: data.products.reduce((acc: { [key: string]: number }, product: Product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  };
}
