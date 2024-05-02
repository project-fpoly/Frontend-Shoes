import { Outlet } from 'react-router-dom'
import NavProfile from '../../components/Profile/Nav'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchOneUsers } from '../../features/user'
import { scrollToTop } from '../../hooks/utils'

const Profile = () => {
  const dispact = useDispatch<AppDispatch>()

  useEffect(() => {
    dispact(fetchOneUsers())
    scrollToTop()
  }, [])
  return (
    <>
      <div className="flex   justify-center items-center">
        <NavProfile></NavProfile>
      </div>
      <div className="flex flex-col gap-10 px-16  mt-10">
        <Outlet></Outlet>
      </div>
    </>
  )
}
export default Profile
