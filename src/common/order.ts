interface ShippingAddress {
  email: string;
  fullname: string;
  address: string;
  phone: number;
}

export interface CartItem {
  product: string;
  quantity: number;
  images?: string;
  price?: number;
  size?: string;
}

export interface IBill {
  _id?: string;
  user: string;
  shippingAddress: ShippingAddress;
  cartItems: CartItem[];
  totalPrice: number;
  isPaid: boolean;
  isDelivered: string;
  createdAt: string;
  updatedAt: string;
}
