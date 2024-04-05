export interface IVoucher {
    _id: string
    Name: string
    Quantity: number
    reduced_amount: number
    price_order: number
    description: string,
    start_date:string
    expiration_date: string
    create_by?:any
  }
  