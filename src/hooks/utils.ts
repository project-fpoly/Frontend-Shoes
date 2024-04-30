export const formatCurrency = (money: number) => {
  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  }
  return new Intl.NumberFormat('vi-VN', config).format(money)
}

export const discountcurrency = (money: number, percent: number) => {
  return (money * (1 - percent / 100))
}
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Smooth scrolling behavior
  })
}