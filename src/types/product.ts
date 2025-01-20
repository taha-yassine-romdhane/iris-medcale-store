export interface Media {
  id?: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string; // Ensure this is explicitly typed as string
  type: string; // Ensure this is explicitly typed as string
  description: string;
  category: string; // Ensure this is explicitly typed as string
  subCategory?: string; // Optional, so it can be undefined
  features: string[]; // Ensure this is explicitly typed as string[]
  inStock: boolean;
  media: Media[];
}
