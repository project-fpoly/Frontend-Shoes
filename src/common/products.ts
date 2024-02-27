interface ISize {
  id?:string,
  name: string;
  quantity?: number;
}
export interface IProduct {
    _id?: string;
  product_id: string;
  SKU?: string;
  name?: string;
  description: string;
  categoryId?: string;
  price: number;
  sale: number;
  discount?: number;
  quantity: number;
  sold_count?: number;
  rating?: number;
  sizes: ISize[];
  color?: "red" | "green" | "blue" | "yellow" | "black" | "white";
  material?: string;
  release_date?: Date;
  images?: string[];
  video?: string;
  blog?: string;
  warranty?: string;
  tech_specs?: string;
  stock_status?: string;
  isPublished: boolean;
  publishedDate?: Date;
  hits?: number;
  updatedAt?: Date;
  createdAt?: Date

}
export interface ICmt {
  _id: string,
  shoeId: string,
  userId: string,
  rating: number,
  content: string,
  likes: string[],
  createdAt: Date,
  updatedAt: Date
}