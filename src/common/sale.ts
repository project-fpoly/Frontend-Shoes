export interface ISale {
  _id?: string;
  name?: string;
  description: string;
  discount?: number;
  expiration_date: string;
  create_by?: any;
}
