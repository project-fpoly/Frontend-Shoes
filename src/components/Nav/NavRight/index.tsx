import {
  IoNewspaperOutline,
  IoCartOutline,
  IoSearchOutline,
} from 'react-icons/io5'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { IoMdHeartEmpty } from 'react-icons/io'
import { useState } from 'react'
import ModalCustom from '../../Modal'
import Search from './Search'
import { Link } from 'react-router-dom'
import { TbShoppingBagSearch } from 'react-icons/tb'
const NavRight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueInput, setValueInput] = useState('')
  const handleChange = (e: any) => {
    setValueInput(e.target.value)
    if (valueInput && valueInput != '') {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }
  const accessToken = localStorage.getItem('accessToken')
  return (
    <div className="mt-2 flex gap-3 ">
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer  hover:bg-[#e5e5e5] rounded-full px-3 "
        style={{ backgroundColor: 'transparent' }}
      >
        <IoSearchOutline size={23} />
      </button>

      <Link to="favorites">
        <IoMdHeartEmpty
          className="cursor-pointer mt-1 hover:bg-[#e5e5e5] rounded-full p-2"
          size={43}
        />
      </Link>
      {accessToken ? (
        <Link to="order">
          <IoNewspaperOutline
            className="mt-1 cursor-pointer hover:bg-[#e5e5e5] rounded-full p-2 "
            size={43}
            color="black"
            title="orders"
          />
        </Link>
      ) : (
        <Link to="order/guest">
          <AiOutlineFileSearch
            className="mt-1  cursor-pointer hover:bg-[#e5e5e5] rounded-full p-2 "
            size={43}
            title="search order"
          />
        </Link>
      )}
      <Link to="cart">
        <IoCartOutline
          className="mt-1 cursor-pointer hover:bg-[#e5e5e5] rounded-full p-2 "
          size={43}
        />
      </Link>
      <ModalCustom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Search setIsModalOpen={setIsModalOpen}></Search>
      </ModalCustom>
    </div>
  )
}

export default NavRight
