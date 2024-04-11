import {CiHeart} from 'react-icons/ci'
import {IoBagOutline} from 'react-icons/io5'
import {CiSearch} from 'react-icons/ci'
import {useState} from 'react'
import ModalCustom from '../../Modal'
import Search from './Search'
import {Link} from 'react-router-dom'

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

    return (
        <div className="mt-2 flex gap-3 ">
            <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer  hover:bg-[#e5e5e5] rounded-full px-3 "
                style={{backgroundColor: "transparent"}}
            >
                <CiSearch size={23}/>
            </button>

            <Link to="favorites">
                <CiHeart
                    className="cursor-pointer mt-1 hover:bg-[#e5e5e5] rounded-full p-2"
                    size={43}
                />
            </Link>

            <Link to="cart">
                <IoBagOutline
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