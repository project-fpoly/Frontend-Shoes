import React from 'react'
import { ConfigProvider, MenuProps } from 'antd'
import { Menu } from 'antd'
import style from './index.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import {
  featchProductByColor,
  featchProductByGender,
  featchProductByMaterial,
  featchProductByPrice,
  featchProductBySize,
  fetchProductsByCategory,
} from '../../../features/product'
import { genderFilterProducts } from '../../../services/productsQuery'
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

const items: MenuProps['items'] = [
  getItem('Giới tính', 'Gender', '', [
    getItem('Nam', 'nam'),
    getItem('Nữ', 'nữ'),
  ]),
  getItem('Loại ', 'Category', '', [
    getItem('Jordan', '6584f32081f5022799afe79e'),
    getItem('Nike', '65899c32bb48834579fde67e'),
    getItem('Adidas', '65b32b3962fec2570781106c'),
  ]),
  ,
  getItem('Sản phẩm theo giá', 'Price', '', [
    getItem('1  to  1,000,000', '1  to  1,000,000'),
    getItem('1,000,000đ  to  2,000,000đ', '1,000,000 to  2,000,000'),
    getItem('2,000,000đ  to  5,000,000đ', '2,000,000  to  5,000,000'),
    getItem('5,000,000đ  to  10,000,000đ', '5,000,000  to  10,000,000'),
  ]),
  getItem('Kích cỡ', 'Size', '', [
    getItem('36', '36'),
    getItem('37', '37'),
    getItem('38', '38'),
    getItem('39', '39'),
    getItem('40', '40'),
    getItem('41', '41'),
    getItem('42', '42'),
  ]),
  getItem('Màu', 'Color', '', [
    getItem('Đen', 'black'),
    getItem('Trắng', 'white'),
    getItem('Xanh lá cây', 'green'),
  ]),
  getItem('Chất liệu', 'Material', '', [
    getItem('Plastic', 'Plastic'),
    getItem('Eva', 'EVA'),
    getItem('Leather', 'Leather'),
  ]),
  // getItem('Color', 'Color', '', [
  //   getItem('Black', 'black'),
  //   getItem('White', 'white'),
  //   getItem('Green', 'green'),
  // ]),
]
fetchProductsByCategory

interface Props {
  hideFilter: boolean
}
const Sidebar = (props: Props) => {
  const dispact = useDispatch<AppDispatch>()
  // const shoes = useSelector((state: IStateProduct) => state.product.products);
  const { hideFilter } = props
  const onClick: MenuProps['onClick'] = (e: any) => {
    switch (e.keyPath[1]) {
      case 'Gender':
        dispact(featchProductByGender(e.keyPath[0]))
        break
      case 'Category':
        dispact(fetchProductsByCategory(e.keyPath[0]))
        break
      case 'Size':
        dispact(featchProductBySize(e.keyPath[0]))
        break

      case 'Price':
        if (e.keyPath[0] === '1  to  1,000,000') {
          console.log('hi')
          dispact(featchProductByPrice({ minPrice: 1, maxPrice: 999999 }))
        }
        if (e.keyPath[0] === '1,000,000 to  2,000,000') {
          dispact(
            featchProductByPrice({ minPrice: 1000000, maxPrice: 1999999 }),
          )
        }
        if (e.keyPath[0] === '2,000,000  to  5,000,000') {
          dispact(
            featchProductByPrice({ minPrice: 2000000, maxPrice: 4999999 }),
          )
        }
        if (e.keyPath[0] === '5,000,000  to  10,000,000') {
          dispact(
            featchProductByPrice({ minPrice: 5000000, maxPrice: 9999999 }),
          )
        }
        break
      case 'Color':
        dispact(featchProductByColor(e.keyPath[0]))
        break
      case 'Material':
        dispact(featchProductByMaterial(e.keyPath[0]))
        break
      default:
        ''
        break
    }
  }

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
      <>
        <div className={hideFilter ? '' : 'hidden'}>
          <h1>Name </h1>
          <Menu
            className={style.sideBar}
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['Size', 'Gender', 'Price', 'Color', 'Material']}
            mode="inline"
            items={items}
          />
        </div>
      </>
    </ConfigProvider>
  )
}

export default Sidebar
