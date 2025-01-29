export interface Media {
  id?: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
  order: number;
  product: {
    connect: { id: string };
  };
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
  name: string; // Default name (e.g., in French)
  brand: string;
  type: string;
  description: string; // Default description
  features: Record<string, any>; // JSON object for features
  category: string;
  subCategory?: string; // For accessories: FILTRE, TUYAU, etc.
  stock: StockStatus; // Enum: IN_STOCK, OUT_OF_STOCK, etc.
  translations: ProductTranslation[];
  media: Media[];
  orderItems: CommandeItem[];
}

export interface ProductTranslation {
  id: string;
  productId: string;
  language: Language; // Enum for Language
  name: string;
  description: string;
  features?: Record<string, any>; // JSON object for translated features
}

export interface CommandeItem {
  id: string;
  quantity: number;
  commandeId: string;
  productId: string;
}

export enum Language {
  FR = 'FR',
  EN = 'EN',
  AR = 'AR'
}