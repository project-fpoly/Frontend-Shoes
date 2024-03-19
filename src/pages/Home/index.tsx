import Popular from '../../components/Home/Popular'
import Banner from '../../components/Home/Banner'
import Featured from '../../components/Home/Featured'
import Trending from '../../components/Home/Trending'
import MerchMenu from '../../components/Home/MerchMenu'
import Sale from '../../components/Home/Sale'
import Sport from '../../components/Home/Sport'
import { Link } from 'react-router-dom'
const Home = () => {
  const accessToken = localStorage.getItem('accessToken')
  return (
    <div className="px-10">
      {!accessToken && (
        <>
          <div className="flex justify-center mt-20 mb-1 items-center flex-col">
            <h2>Move, Shop, Customise & Celebrate With Us.</h2>
            <p>
              No matter what you feel like doing today, It’s better as a Member.
            </p>
            <a href="">
              <u>
                <b>
                  <Link to={'/signup'}>Join us</Link>
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
      <MerchMenu />
    </div>
  )
}
export default Home
