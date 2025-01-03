export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
