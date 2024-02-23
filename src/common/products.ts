export interface IProduct {
  id: number;
  name: string;
  title: string;
  image: string;
  price: string;
  description: string;
  benefits: string;
}
export interface ICmt{
  _id:string,
  shoeId:string,
  userId:string,
  rating:number,
  content:string,
  like:string[],
  createdAt:Date,
  updatedAt:Date
}