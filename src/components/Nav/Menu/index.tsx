import { ConfigProvider, Menu } from 'antd'

import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const MenuNav = () => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/greaup">
          <h1 className="hover:text-black visited:text-black font-bold">
            Sản phẩm
          </h1>
        </Link>
      ),
      key: 'Products',
    },
    {
      label: (
        <Link to="/men">
          <h1 className="font-bold">Nam</h1>
        </Link>
      ),
      key: 'Men',
    },
    {
      label: (
        <Link to="/women">
          <h1 className="font-bold">Nữ</h1>
        </Link>
      ),
      key: 'Women',
    },
    {
      label: (
        <Link to="/sale">
          <h1 className="font-bold">Giảm giá</h1>
        </Link>
      ),
      key: 'Sale',
    },
    {
      label: (
        <Link to="/contact">
          <h1 className="font-bold">Liên hệ</h1>
        </Link>
      ),
      key: 'Contact',
    },
    {
      label: (
        <Link to="/membership">
          <h1 className="font-bold">Thành viên</h1>
        </Link>
      ),
      key: 'membership',
    },
  ]
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            dangerItemActiveBg: '#fff2f0',
            itemSelectedColor: 'black',
            itemHoverBg: 'gray',
          },
        },
      }}
    >
      <Menu
        className="hidden xl:flex  w-[800px] pl-52 "
        mode="horizontal"
        items={items}
      />
    </ConfigProvider>
  )
}

export default MenuNav
