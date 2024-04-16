import { Menu } from 'antd'

import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const MenuNav = () => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/">
          <h1 className="font-bold">New & Features</h1>
        </Link>
      ),
      key: 'mail',
    },
    {
      label: (
        <Link to="/greaup">
          <h1 className="font-bold">Products</h1>
        </Link>
      ),
      key: 'Products'
    },
    {
      label: (
        <Link to="/men">
          <h1 className="font-bold">Men</h1>
        </Link>
      ),
      key: 'Men',
    },
    {
      label: (
        <Link to="/women">
          <h1 className="font-bold">Women</h1>
        </Link>
      ),
      key: 'Women',
    },
    {
      label: (
        <Link to="/sale">
          <h1 className="font-bold">Sale</h1>
        </Link>
      ),
      key: 'Sale',
    },
    {
      label: (
        <Link to="/contact">
          <h1 className="font-bold">Contact</h1>
        </Link>
      ),
      key: 'Contact',
    },
  ]
  return (
    <Menu className="flex w-[800px] pl-52 " mode="horizontal" items={items} />
  )
}

export default MenuNav
