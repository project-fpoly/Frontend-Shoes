import { ConfigProvider, Menu } from 'antd'

import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/profile">
          <h1 className="font-bold text-sm">Profile</h1>
        </Link>
      ),
      key: 'Profile',
    },
    {
      label: (
        <Link to="/order">
          <h1 className="font-bold text-sm">Orders</h1>
        </Link>
      ),
      key: 'Orders',
    },
    {
      label: (
        <Link to="/favourite">
          <h1 className="font-bold text-sm">Favourites</h1>
        </Link>
      ),
      key: 'Favourites',
    },
    {
      label: (
        <Link to="/profile/setting">
          <h1 className="font-bold text-sm">Settings</h1>
        </Link>
      ),
      key: 'Settings',
    },
  ]
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalItemSelectedColor: 'black',
          },
        },
      }}
    >
      <Menu
        className="flex w-[800px]    pt-8 gap-16 "
        mode="horizontal"
        items={items as any}
      />
    </ConfigProvider>
  )
}

export default NavProfile
