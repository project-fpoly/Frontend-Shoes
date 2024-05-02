import Popular from '../../components/Home/Popular'
import Banner from '../../components/Home/Banner'
import Featured from '../../components/Home/Featured'
import Trending from '../../components/Home/Trending'
import Sale from '../../components/Home/Sale'
import Sport from '../../components/Home/Sport'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { scrollToTop } from '../../hooks/utils'
const Home = () => {
  useEffect(() => {
    scrollToTop()
  }, [])
  const accessToken = localStorage.getItem('accessToken')
  return (
    <div className="px-3 lg:px-10">
      {!accessToken && (
        <>
          <div className="flex justify-center mt-10 mb-1 items-center flex-col">
            <h2>
              Di chuyển, Mua sắm, Tùy chỉnh & Ăn mừng cùng chúng tôi.</h2>
            <p>
              Dù bạn muốn làm gì hôm nay, Đó sẽ tốt hơn khi là một Thành viên..
            </p>
            <a href="">
              <u>
                <b>
                  <Link to={'/signup'}>Tham gia   </Link>
                </b>
              </u>
            </a>
          </div>
        </>
      )}

      <Banner />
      <Featured />
      <Sale />
      <Trending />
      <Popular />
      <Sport />
    </div>
  )
}
export default Home
