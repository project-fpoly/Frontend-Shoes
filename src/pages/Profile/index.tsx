
import NavProfile from "../../components/Profile/Nav"
import Infomation from "../../components/Profile/Infomation"
import NikeApps from "../../components/Profile/Apps"
import MemberBenefits from "../../components/Profile/MemberBenefits"


const Profile = () => {

  return (
    <>
      <div className="flex   justify-center items-center">
        <NavProfile></NavProfile>
      </div>
      <div className="flex flex-col gap-10 px-16  mt-20">
        <Infomation></Infomation>
        <MemberBenefits></MemberBenefits>
        <NikeApps></NikeApps>
      </div>



    </>

  )

}
export default Profile