
import { Outlet } from "react-router-dom"
import NavProfile from "../../components/Profile/Nav"

const Profile = () => {

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