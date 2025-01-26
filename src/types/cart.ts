export interface CartItem {
  id: string;
  name: string;
  brand: string;
  media: { url: string }[];
  quantity: number;
  image?: string;
  features?: string[];
  stock?: StockStatus;
}

export enum StockStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  COMING_SOON = 'COMING_SOON',
  PRE_ORDER = 'PRE_ORDER'
}

export interface Cart {
  items: CartItem[];
  total: number;
}
