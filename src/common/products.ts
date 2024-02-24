export interface IProduct {
  _id: string;
  product_id: string;
  SKU?: string;
  name?: string;
  description: string;
  categoryId?: string | null;
  price: number;
  sale?: number;
  discount?: number;
  quantity: number;
  sold_count?: number;
  rating?: number;
  sizes?: {
    name: string;
    quantity: number;
  }[];
  color?: "red" | "green" | "blue" | "yellow" | "black" | "white";
  material?: string;
  release_date?: Date;
  images?: string[];
  video?: string;
  blog?: string | null;
  warranty?: string;
  tech_specs?: string;
  stock_status?: string;
  isPublished?: boolean;
  publishedDate?: Date;
  hits?: number;
}
