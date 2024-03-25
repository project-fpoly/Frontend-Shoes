export interface ISale {
  _id?: string;
  name?: string;
  description: string;
  discount?: number;
  quantity: number;
  expiration_date?: string | number;
  create_by?: any;
  start_date?: string | number;
}
