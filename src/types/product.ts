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
  brand: string;
  type: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  inStock: boolean;
  media: Media[];
}
