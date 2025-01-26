export interface Media {
  id?: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
  order: number;
}

export enum StockStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  PRE_ORDER = 'PRE_ORDER',
  COMING_SOON = 'COMING_SOON',
}

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  brand: string;
  type: string;
  description: string;
  features: string[];
  category: string;
  subCategory?: string;
  stock: StockStatus;
  media: Media[];
}
