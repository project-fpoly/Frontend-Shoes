import { Modal } from 'antd'
import React, { ReactNode } from 'react'

import './index.scss'
interface Props {
  isModalOpenCmt: boolean
  setIsModalOpenCmt: any
  children: ReactNode
}
const ModalCmt: React.FC<Props> = ({
  isModalOpenCmt,
  setIsModalOpenCmt,
  children,
}) => {
  const handleCancel = () => {
    setIsModalOpenCmt(false)
  }
  return (
    <>
      <Modal
        className="h-[700px]"
        open={isModalOpenCmt}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  )
}

export default ModalCmt
