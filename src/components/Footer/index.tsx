import {
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { IoLocationOutline } from 'react-icons/io5'
import { Avatar } from 'antd'
import clsx from 'clsx'
import style from './index.module.scss'
const Footer = () => {
  return (
    <div className="bg-black ">
      <div
        className={clsx(
          'py-16 flex justify-around cursor-pointer',
          style.footer,
        )}
      >
        <div className={clsx('flex gap-32 flex-row', style.infoFooter)}>
          <div className="text-base flex flex-col gap-3 text-white">
            <p>Tìm cửa hàng</p>
            <p>Trở thành thành viên</p>
            <p>Gửi phản hồi cho chúng tôi</p>
          </div>
          <div>
            <p className="text-base text-white">Hỗ trợ</p>
            <p className="text-gray-400 hover:text-white">Trạng thái đơn hàng</p>
            <p className="text-gray-400 hover:text-white">Giao hàng</p>
            <p className="text-gray-400 hover:text-white">Trả hàng</p>
            <p className="text-gray-400 hover:text-white">Lựa chọn thanh toán</p>
            <p className="text-gray-400 hover:text-white">Liên hệ chúng tôi</p>
          </div>
          <div>
            <p className="text-base text-white">Về NIKE</p>
            <p className="text-gray-400 hover:text-white">Những thông tin mới</p>
            <p className="text-gray-400 hover:text-white">Nghề nghiệp</p>
            <p className="text-gray-400 hover:text-white">Nhà đầu tư</p>
            <p className="text-gray-400 hover:text-white">Sự bền vững</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <TwitterOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{' '}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <FacebookOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{' '}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <YoutubeOutlined className="text-black hover:text-gray-400 cursor-pointer" />
            }
          />{' '}
          <Avatar
            className="bg-gray-400 hover:bg-white"
            icon={
              <InstagramOutlined className="text-black hover:text-gray-400 cursor-pointer  " />
            }
          />
        </div>
      </div>

      <div className={clsx('flex justify-around py-6', style.detailFooter)}>
        <span className="text-sm">
          <span className=" flex gap-3 ">
            <p className="mt-1 text-white">
              <IoLocationOutline />
            </p>
            <p className="text-white">Vietnam</p>
            <p className="text-gray-400">
              © 2023 Nike, Inc. All Rights Reserved
            </p>
          </span>
        </span>
        <span
          className={clsx(
            'text-sm text-gray-400 flex gap-6',
            style.aboutDtFooter,
          )}
        >
          <p>Hướng đẫn</p>
          <p>Điều khoản bán hàng</p>
          <p>Điều khoản sử dụng</p>
          <p>Chính sách quyền riêng tư của Nike</p>
        </span>
      </div>
    </div>
  )
}

export default Footer
