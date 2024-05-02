import { SiJordan } from 'react-icons/si'

import { Popover, Avatar, ConfigProvider, message, Button } from 'antd'
import { UserOutlined, InboxOutlined } from '@ant-design/icons'
import { SiNike } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import MenuNav from './Menu'
import NavRight from './NavRight'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByID, setUser } from '../../features/auth'
import io from 'socket.io-client'
import AllNotification from '../Admin/Notification/AllNotification'
const NavBar = () => {
  const content = (
    <div>
      <Link to="/signin">
        <h1 className="font-bold">Đăng nhập</h1>
      </Link>
      {/*<p>Logout</p>*/}
    </div>
  )
  const [showNav, setShowNav] = useState<boolean>(false)
  const [position, setPosition] = useState<boolean>(false)
  const user = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser(null))
    message.success('Logout successfully')
    const socket = io('http://localhost:9000', { transports: ['websocket'] })
    socket.emit('log_out', { userId: user._id })
  }

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              horizontalItemSelectedColor: 'black',
            },
          },
        }}
      >
        <div className={clsx('fixed z-50 w-full',
          showNav ? 'hidden' : '',
        )} >
          <div className="flex  justify-between px-16  py-4 bg-[#f5f5f5]">
            <Link to={'/'}>
              <SiJordan size={28} className="hover:opacity-70" />
            </Link>
            <div className="flex gap-3 cursor-pointer ">
              {user?.role === 'member' && (
                <Popover
                  className="hover:opacity-70"
                  content={<AllNotification />}
                  trigger="click"
                  title="Hộp thư của bạn"
                >
                  <InboxOutlined />
                </Popover>
              )}
              <span>|</span>
              <Popover
                className="hover:opacity-70"
                content={content}
                title="Title"
              >
                Find a store
              </Popover>
              <span>|</span>
              <Link to={'/help'}>
                <Popover className="hover:opacity-70" content={content} title="">
                  Help
                </Popover>
              </Link>
              <span>|</span>
              {user ? (
                <Popover
                  className="flex gap-2 hover:opacity-70"
                  content={
                    <>
                      <Link to="/profile">
                        <h1 className="font-bold">Hồ sơ</h1>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin">
                          <h1 className="font-bold">Admin</h1>
                        </Link>
                      )}
                      <Link to="">
                        <h1 className="font-bold" onClick={handleLogout}>
                          Đăng xuất
                        </h1>
                      </Link>
                    </>
                  }
                  title="Account"
                >
                  Hi, {user.userName}
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={user?.avt?.url}
                  />
                  {/*<Button onClick={handleLogout}>Logout</Button>*/}
                </Popover>
              ) : (
                <Popover
                  className="flex gap-2 hover:opacity-70"
                  content={content}
                  title="Account"
                >
                  <Avatar size={30} icon={<UserOutlined />} />
                </Popover>
              )}
            </div>
          </div>

          <div
            className={clsx(
              'flex  bg-white w-full justify-evenly z-50')}
          >
<<<<<<< Updated upstream
            <div className="flex justify-evenly mx-24 gap-[100px] z-10">
              <Link to={'/'}>
                <SiNike className="hover:opacity-75" size={50} />
              </Link>
              <MenuNav></MenuNav>
              <NavRight></NavRight>
=======
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-6 mt-5 ml-10 justify-start">
                <Link onClick={onClose} className="text-3xl" to={'/greaup'}>
                  Sản phẩm
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/men'}>
                  Nam
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/women'}>
                  Nữ
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/sale'}>
                  Giảm giá
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/contact'}>
                  Liên hệ
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/membership'}>
                  Thành viên
                </Link>
                <Link onClick={onClose} className="text-3xl" to={'/help'}>
                  Hỗ trợ
                </Link>
              </div>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center mt-20 items-center flex-col bg-[#f5f5f5]">
          <h2>Move, Shop, Customise & Celebrate With Us.</h2>
          <p>
            No matter what you feel like doing today, It’s better as a Member.
          </p>
          <a href="">Join us</a>
        </div> */}
      </ConfigProvider>
    </>
  )
}

export default NavBar
