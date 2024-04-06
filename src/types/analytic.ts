export interface IAnalytic {
  name: string
  value: number
}
export interface IAnalytics {
  vouchers: IAnalytic[]
  countOrderDay: IAnalytic[]
  countOrderStatus: IAnalytic[]
  moneys: IAnalytic[]
  users: IAnalytic[]
  products: IAnalytic[]
  categorys: IAnalytic[]
  blogs: IAnalytic[]
  categoryBlogs: IAnalytic[]
  moneyOrderStatus: IAnalytic[]
}

export interface DataAnalytics {
  '*theo thời gian tuỳ ý': any[] // Thay "any" bằng kiểu chính xác nếu có thể
  voucher: {
    'số lượng': number
    'tổng tiền': number
  }
  'doanh thu tháng này': any
  'số user tham gia': {
    'tháng này': number
    'tổng ': number
    'khách vãn lai': number
  }
  'mặt hàng bán chạy tháng này': {
    'sản phẩm bán nhiều nhất': any
    'danh sách ': any
  }
  'user mua 2 đơn trở lên': any
  TopSell: any
}
