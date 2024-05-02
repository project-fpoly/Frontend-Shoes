import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { IProduct } from '../../../common/products'
import { FaCheck } from 'react-icons/fa'
import { formatCurrency } from '../../../hooks/utils'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const style = {
  position: 'absolute' as 'absolute',
  top: '30%',
  right: '-10%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
}

interface Props {
  open: boolean
  setOpen: (value: boolean) => any
  shoe: IProduct
}
const ModalCartItem = (props: Props) => {
  const { open, setOpen, shoe } = props
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <p className="flex gap-5 ">
              <FaCheck className="mt-1 text-green-500" />
              Đã thêm sản phảm vào giỏ hàng
            </p>
            <IoCloseCircleOutline
              size={30}
              onClick={() => handleClose()}
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-3">
            <img
              width={80}
              src={`${shoe.images ? shoe.images[0] : ''}?w=248&fit=crop&auto=format`}
              alt={shoe.name}
              loading="lazy"
            />
            <div className="flex flex-col gap-3">
              <p>{shoe.name}</p>
              <p>{shoe.categoryId?.name!}</p>
              <p>
                {formatCurrency(shoe.priceSale ? shoe.priceSale : shoe.price)}
              </p>
            </div>
          </div>
          <div className="flex justify-around mt-4">
            <Link to={'/cart'}>
              {' '}
              <button className="w-40  py-3 border border-gray-400 text-black rounded-2xl bg-white text-sm">
                Xem giỏ hàng
              </button>
            </Link>
            <Link to={'/cart/checkout'}>
              {' '}
              <button className="w-40 text-white py-3 rounded-2xl bg-black">
                Thanh toán
              </button>
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalCartItem
