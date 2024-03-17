interface ISize {
  id?: string
  name: string
  quantity?: number
}
export interface IProduct {
  _id?: string
  product_id: string
  SKU?: string
  name?: string
  description: string
  categoryId:
    | string
    | {
        _id: string
        name?: string
      }
  price: number
  sale: number
  discount?: number
  quantity: number
  sold_count?: number
  rating?: number
  sizes?: ISize[]
  color?: string
  material?: string
  release_date?: string
  images?: string[]
  video?: string
  blog?: string
  warranty?: string
  tech_specs?: string
  stock_status?: string
  gender?: string
  isPublished?: boolean
  publishedDate?: string
  hits?: number
  updatedAt?: Date
  createdAt?: Date
  quantityCart?: number
}
export interface ICmt {
  _id: string
  shoeId?: string
  userId?: string
  rating?: number
  content?: string
  likes?: string[]
  createdAt?: Date
  updatedAt?: Date
}
export interface ISale {
  _id?: string
  name?: string
  description: string
  sale: number
  discount?: number
  quantity: number
  create_date: Date
  expiration_date: Date
}
