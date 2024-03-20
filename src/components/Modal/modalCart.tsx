import { Modal } from 'antd'
import { ReactNode } from 'react'
import { FaCheck } from 'react-icons/fa'
import './modalCart.scss'
interface Props {
  isModalOpenCart: boolean
  setIsModalOpenCart: any
  children: ReactNode
}

const ModalCart: React.FC<Props> = ({
  children,
  isModalOpenCart,
  setIsModalOpenCart,
}) => {
  const handleCancel = () => {
    setIsModalOpenCart(false)
  }
  return (
    <>
      <div className="w-[300px]">
        <Modal
          open={isModalOpenCart}
          onCancel={handleCancel}
          title={
            <h1 className="flex gap-4  items-center">
              ADDED TO BAG <FaCheck className="text-green-600" />
            </h1>
          }
          okText="确认"
          cancelText="取消"
        >
          {children}
        </Modal>
      </div>
    </>
  )
}

export default ModalCart
