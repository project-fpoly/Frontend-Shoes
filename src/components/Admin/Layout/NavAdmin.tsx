import React, { useState } from 'react'
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  DotChartOutlined,
  WechatOutlined,
  CodeSandboxOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Space } from 'antd'
import { SiNike } from 'react-icons/si'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link to="/admin">Home</Link>, 'sub1', <HomeOutlined />),
  getItem(<Link to="users">User</Link>, 'sub2', <UserOutlined />),
  getItem(<Link to="orders">Order</Link>, 'sub3', <AppstoreOutlined />),

  getItem(<Link to="product">Products</Link>, 'sub4', <CodeSandboxOutlined />),
  getItem(
    <Link to="categories">Categories</Link>,
    'sub5',
    <DotChartOutlined />,
  ),
  getItem(<Link to="sale">Sale</Link>, 'sub6', <ShoppingCartOutlined />),
  getItem(<Link to="comment">Comments</Link>, 'sub7', <WechatOutlined />),
  getItem(<Link to="voucher">Voucher</Link>, 'sub8', <GiftOutlined />),
  getItem(<Link to="setting">Setting</Link>, 'sub9', <SettingOutlined />),
]

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5']

const NavAdmin: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <>
      <Space
        style={{ width: '100%', justifyContent: 'center' }}
        align="center"
        size="middle"
      >
        <Link to={'/'}>
          <SiNike className="hover:opacity-75" size={50} />
        </Link>
      </Space>

      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
    </>
  )
}

export default NavAdmin
