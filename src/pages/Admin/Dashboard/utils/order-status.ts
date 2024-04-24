export const renderOrderStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Đang chờ xác nhận'
    case 'confirmed':
      return 'Đang chờ lấy hàng'
    case 'delivered':
      return 'Đang giao hàng'
    case 'done':
      return 'Đã giao hàng'
    case 'canceled':
      return 'Đã hủy'
    default:
      return 'Không xác định'
  }
}
