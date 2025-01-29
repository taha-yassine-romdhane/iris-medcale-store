import { useTranslation } from '@/contexts/TranslationContext';
import { Language } from '@/types/product';

interface ProductTranslation {
  language: Language;
  name: string;
  description: string;
  features: Record<string, any>;
}

interface Product {
  id: string;
  name: string;
  description: string;
  features: Record<string, any>;
  translations: ProductTranslation[];
}

export function useProductTranslation() {
  const { language } = useTranslation();

  const getTranslatedProduct = (product: Product) => {
    // Find translation for current language
    const translation = product.translations?.find(t => t.language === language);

    // Return translated content or fallback to default
    return {
      ...product,
      name: translation?.name || product.name,
      description: translation?.description || product.description,
      features: translation?.features || product.features,
    };
  };

  return {
    getTranslatedProduct,
  };
}
