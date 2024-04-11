export interface ISale {
  _id?: string;
  name: string;
  discount:number;
  product?: string[];
  description: string;
  create_by?: {
    _id?: string;
    email?: string;
    role?: string;
  };
  start_date?: string;
  expiration_date?: string;
  isDelete?: boolean;
}
 export default class Sale {

 }