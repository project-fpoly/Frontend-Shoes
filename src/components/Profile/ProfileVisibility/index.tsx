import { Avatar } from 'antd';
import { useSelector } from 'react-redux';

const ProfileVisibility = () => {
  const user = useSelector((state: any) => state.user.user)
  console.log(user);

  return (
    <>
      <div className="max-w-[380px]">
        <p className="text-2xl mb-5">Privacy
        </p>
        <p>Your Nike profile represents you on product reviews and across the Nike family of apps</p>


      </div>
    </>
  )
}

export default ProfileVisibility