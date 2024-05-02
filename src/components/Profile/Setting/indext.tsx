import React, { useState } from 'react'
import { ConfigProvider, MenuProps } from 'antd'
import { FaRegUser } from 'react-icons/fa'
import { Menu } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { MdOutlineMailOutline } from 'react-icons/md'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { MdOutlineSettingsSuggest } from 'react-icons/md'

const Setting = () => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={'/profile/setting'}>
          <p className="text-[20px] ">
            <p className=" hidden lg:block">Thông tin cá nhân</p>
          </p>
        </Link>
      ),
      key: 'Account Detail',
      icon: <FaRegUser size="20" />,
    },
    {
      label: (
        <Link to={'/profile/setting/communication-preferences'}>
          <p className="text-[20px] hidden lg:block ">
            Tùy chọn liên lạc
          </p>
        </Link>
      ),
      key: 'Communication',
      icon: <MdOutlineMailOutline size="20" />,
    },
    {
      label: (
        <Link to={'/profile/setting/privacy'}>
          <p className="text-[20px] hidden lg:block ">Quyền riêng tư</p>
        </Link>
      ),
      key: 'Privacy',
      icon: <MdOutlineVerifiedUser size="20" />,
    },
    {
      label: (
        <Link to={'/profile/setting/profile-visibility'}>
          <p className="text-[20px] hidden lg:block">Tính hiển thị của Hồ sơ</p>
        </Link>
      ),
      key: 'profile-visibility',
      icon: <MdOutlineSettingsSuggest size="20" />,
    },
  ]
  const [current, setCurrent] = useState('Account Detail')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: '#001529',
            itemHoverBg: 'gray',
          },
        },
      }}
    >
      <div>
        <h1 className="text-3xl mb-8">Cài đặt</h1>
        <div className="flex gap-24 min-h-[500px]">
          <Menu
            className="flex flex-col gap-10 w-[25%] "
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
          <div className="w-[70%]">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Setting
