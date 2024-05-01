import { useEffect } from 'react'
import Banner from '../../components/Men/Banner'
import ShopIcon from '../../components/Men/ShopIcon'
import { scrollToTop } from '../../hooks/utils'

const Men = () => {
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <div className="px-10">
      <Banner />
      <ShopIcon />
    </div>
  )
}
export default Men
