import React, { useState } from 'react'
import {
  SettingOutlined,
  UserOutlined,
  WechatOutlined,
  CodeSandboxOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  SendOutlined,
  BarChartOutlined,
  ReconciliationOutlined,
  PartitionOutlined,
  ShopFilled,
  WechatWorkOutlined,
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
  getItem(<Link to="/admin">Dashboard</Link>, 'sub1', <BarChartOutlined />),
  getItem(<Link to="users">User</Link>, 'sub2', <UserOutlined />),
  getItem(<Link to="orders">Order</Link>, 'sub3', <ReconciliationOutlined />),

  getItem(<Link to="product">Products</Link>, 'sub4', <ShopFilled />),
  getItem(
    <Link to="categories">Categories</Link>,
    'sub5',
    <PartitionOutlined />,
  ),
  getItem(<Link to="sale">Sale</Link>, 'sub6', <ShoppingCartOutlined />),
  getItem(<Link to="comment">Comments</Link>, 'sub7', <WechatOutlined />),
  getItem(<Link to="voucher">Voucher</Link>, 'sub8', <GiftOutlined />),
  getItem('Setting', 'sub9', <SettingOutlined />, [
    getItem(
      <Link to="setting/sendNotification">Send Notification</Link>,
      '5',
      <SendOutlined />,
    ),
    getItem(<Link to="setting/chat">Chat</Link>, '5', <WechatWorkOutlined />),
  ]),
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
