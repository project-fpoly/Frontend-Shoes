import { useSelector } from 'react-redux'
import { Avatar, Space } from 'antd'
import moment from 'moment'

const Infomation = () => {
  const user = useSelector((state: any) => state.auth.user)
  return (
    <div className="px-16 h-[500px] mt-20 h-auto">
      <div className='flex gap-5'>
        <Avatar size={80} src={user?.avt?.url} />
        <div className='flex flex-col gap-3'>
          <h3 className=' text-4xl'>{user.userName}</h3>
          <p>Nike Member Since {moment(user.createdAt).calendar()}</p>
        </div>
      </div>
    </div>
  )
}

export default Infomation
