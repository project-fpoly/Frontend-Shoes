import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { CollapseProps } from 'antd'
import {
  Collapse,
  Rate,
  Button,
  Image,
  Input,
  Avatar,
  Popover,
  Popconfirm,
  message,
} from 'antd'
import './index.scss'
import ModalCustom from '../../../Modal'
import { ICmt, IProduct } from '../../../../common/products'
import { useDispatch, useSelector } from 'react-redux'
import { IStateCmt } from '../../../../common/redux/type'
import { Link } from 'react-router-dom'
import user from '../../../../features/user'
import moment from 'moment'
import { AppDispatch } from '../../../../redux/store'
import { createCommnets, deleteCommentById, updateCommentById } from '../../../../features/comment'
import ModalCmt from '../../../Modal/ModalCmt'
const Colspace = ({ shoe }: { shoe: IProduct }) => {

  const [typeCmt, setTypeCmt] = useState<string>('')
  const userIdStorage = localStorage.getItem('userID')
  const commnets = useSelector((state: IStateCmt) => state.comment.comments)
  const dispatch = useDispatch<AppDispatch>()
  const Loading = useSelector((state: IStateCmt) => state.comment.loading)
  const accessToken = localStorage.getItem('accessToken')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenCmt, setIsModalOpenCmt] = useState(false)
  const [idCmt, setIdCmt] = useState<ICmt>()
  const filteredReviews = commnets.filter(
    (review) => typeof review.rating === 'number',
  )
  const totalStars = filteredReviews.reduce(
    (acc, review) => acc + +review?.rating!,
    0,
  )
  const averageRating = totalStars / commnets.length
<<<<<<< Updated upstream
  const onChange = (key: string | string[]) => {
  }
=======
  const onChange = (key: string | string[]) => { }
>>>>>>> Stashed changes

  const handleShowModal = () => {
    setIsModalOpen(true)
  }

  type FormValues = {
    content: string
  }
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      content: '',
    },
  })

  const previousContent = watch('content')

  const { _id: shoeId } = shoe
  const [rating, setRating] = useState<any>(0)
  const handleRateChange = (value: number) => {
    setRating(value)
  }
  const confirm = () => {
    dispatch(deleteCommentById(idCmt as ICmt))
  }

  const contentCommnet = () => {
    return (
      <>
        <div className="flex flex-col w-32">
          <button
            onClick={() => {
              setIsModalOpenCmt(true)
              setRating(idCmt?.rating)
              setValue('content', idCmt?.content!)
            }}
            className="flex flex-start py-2 hover:bg-gray-100 rounded-sm"
          >
            Chỉnh sửa bình luận
          </button>
          <Popconfirm
            className='z-10'
            title="Delete "
            description="Are you sure to delete this commnet?"
            onConfirm={confirm}
            okText={<button className='text-white'> Yes</button>}
            cancelText="No"
          >
            <button className="flex flex-start py-2 hover:bg-gray-100 rounded-sm">
              Xóa
            </button>
          </Popconfirm>
        </div>
      </>
    )
  }
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <h1 className=" text-xl font-bold">Phí giao hàng</h1>,
      children: (
        <div className="flex flex-col gap-5">
          <h3>Đơn hàng từ 5.000.000₫ trở lên bạn sẽ được giao hàng tiêu chuẩn miễn phí.</h3>

          <ul>
            <li>Giao hàng tiêu chuẩn 4-5 ngày làm việc.</li>
            <li>Chuyển phát nhanh 2-4 ngày làm việc.</li>
          </ul>

          <p>
            Đơn hàng được xử lý và giao từ Thứ Hai đến Thứ Sáu (trừ ngày lễ).
          </p>

          <p>Thành viên Nike được hưởng lợi nhuận miễn phí..</p>
        </div>
      ),
    },
    {
      key: '2',
      label: <h1 className=" text-xl font-bold">Đánh giá</h1>,
      children: (
        <div className="flex flex-col gap-5">
          <p className="flex gap-5">
            <p className="text-[17px]">{`Review(${commnets.length})`}</p>
            <Rate
              disabled
              className="text-black"
              defaultValue={averageRating}
              allowHalf
            ></Rate>
          </p>
<<<<<<< Updated upstream
          <p
            onClick={() => {
              handleShowModal()
              setTypeCmt('CREATE')
            }}
            className="text-black text-2xl font-bold cursor-pointer border-b-black border-b-[1px] w-[170px] hover:opacity-70"
          >
            Write a review
          </p>
=======

          {checkBuy?.message === 'Chưa mua hàng' ? (
            <>
              <p className="text-black  text-xl pb-2 font-bold cursor-pointer  hover:opacity-70">
                Bạn phải mua hàng để có thể đánh giá
              </p>
            </>
          ) : (
            <>
              <p
                onClick={() => {
                  handleShowModal()
                  setTypeCmt('CREATE')
                }}
                className="text-black text-2xl font-bold cursor-pointer border-b-black border-b-[1px] w-[170px] hover:opacity-70"
              >
                Viết đánh giá
              </p>
            </>
          )}
>>>>>>> Stashed changes
          <div className="flex flex-col gap-8  ">
            {commnets.map((comment, index) => {
              const { content, userId } = comment
              return (
                <div
                  key={index + 1}
                  className="flex flex-col gap-5 cursor-pointer"
                >
                  <div className="flex gap-5">
                    {userId?.avt['url'] ? (
                      <>
                        <Avatar src={userId?.avt['url']} />
                      </>
                    ) : (
                      <>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                      </>
                    )}

                    <div className="flex  gap-5">
                      <>
                        <p className="text-xl">
                          {comment?.userId['userName']}
                        </p>
                        {userId?._id! === userIdStorage && (
                          <>
                            <Popover
                              className="mt-1"
                              placement="bottomLeft"
                              content={contentCommnet}
                              trigger="click"
                            >
                              <button className='font-bold' onClick={() => {
                                setIdCmt(comment)
                              }}>
                                ...
                              </button>
                            </Popover>
                          </>
                        )}
                      </>

                    </div>
                  </div>

                  <span className="flex flex-col gap-3">
                    <Rate
                      disabled
                      className="text-black"
                      value={comment.rating}
                    />
                    <span className=" flex flex-col gap-2  ">
                      <p className="text-xl">{comment.content}</p>
                      <p className="text-gray-500">
                        {moment(comment.createdAt).calendar()}
                      </p>
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
  ]

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { content } = data
    const shoeId = shoe._id
    const commnetcr = { content, rating, shoeId }
    const commentId = idCmt?._id
    const comentUpdate = { ...commnetcr, commentId, shoeId }
    if (typeCmt === 'CREATE') {
      dispatch(createCommnets(commnetcr as any))
      if (Loading === 'fulfilled') {
        setIsModalOpen(false)
        setTypeCmt('')
        reset()
        setRating(null)
      }
    } if (typeCmt === 'UPDATE') {
      setIsModalOpenCmt(false)
      setTypeCmt('')
      dispatch(updateCommentById(comentUpdate as any))
      reset()
      setRating(null)
    }
  }

  return (
    <>
      <Collapse
        className="w-[380px]"
        items={items}
        defaultActiveKey={['1', '2']}
        onChange={onChange}
      />

      <ModalCustom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="flex flex-col gap-10">
          <span className="text-center">
            <h1 className="text-xl">Viết đánh giá</h1>
            <p className="text-gray-400">
              Chia sẻ suy nghĩ của bạn với cộng đồng.
            </p>
          </span>
          {accessToken && (
            <>


              <div className="flex gap-5">
                <Image width={80} src={shoe.images ? shoe.images[0] : ''} />
                <p>{shoe.name}</p>
              </div>
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <span>
                  <h2 className="mb-3">Đánh giá tổng thể *</h2>
                  <Rate
                    value={rating}
                    allowClear
                    onChange={handleRateChange}
                    className="text-black text-3xl"
                  />
                </span>
                <div className="border-t-[1px] "></div>
                <p>Đánh giá của bạn *</p>
                <input
                  className="h-[100px] p-2 rounded-md border border-black text-3xl outline-none"
                  type="text"
                  {...register('content', { required: true })}
                />
                {errors.content && (
                  <span className="text-red-500 font-bold ">
                    Trường này là bắt buộc
                  </span>
                )}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded w-[100px]"
                >
                  {Loading === 'pending' ? 'Loading...' : 'Send'}
                </button>
              </form>
              <p>
                Mô tả những gì bạn thích, những gì bạn không thích và những điều quan trọng khác mà người mua hàng nên biết. Tối thiểu 30 ký tự.
              </p>
            </>
          )}
          {!accessToken && (
            <>
              <Link to={'/signin'}>
                <h1 className="font-bold text-2xl text-center underline text-black">
                  Bạn cần đăng nhập
                </h1>
              </Link>
            </>
          )}
        </div>
      </ModalCustom>
      <ModalCmt isModalOpenCmt={isModalOpenCmt} setIsModalOpenCmt={setIsModalOpenCmt} >
        <div className="flex flex-col gap-10 ">
          <span className="text-center">
            <h1 className="text-xl">Viết đánh giá</h1>
            <p className="text-gray-400">
              Chia sẻ suy nghĩ của bạn với cộng đồng.
            </p>
          </span>
          <>
            <div className="flex gap-5">
              <Image width={80} src={shoe.images ? shoe.images[0] : ''} />
              <p>{shoe.name}</p>
            </div>
            <form

              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span>
                <h2 className="mb-3">Đánh giá tổng thể *</h2>
                <Rate
                  value={rating}
                  allowClear
                  onChange={handleRateChange}
                  className="text-black text-3xl"
                />
              </span>
              <div className="border-t-[1px] "></div>
              <p>Đánh giá của bạn *</p>
              <input
                className="h-[100px] p-2 rounded-md border border-black text-xl outline-none"
                type="text"
                {...register('content', { required: true })}
              />
              {errors.content && (
                <span className="text-red-500 font-bold ">
                  Trường này là bắt buộc
                </span>
              )}

<<<<<<< Updated upstream
              {previousContent === idCmt?.content && rating === idCmt?.rating ? (
=======
              {previousContent === idCmt?.content &&
                rating === idCmt?.rating ? (
>>>>>>> Stashed changes
                <button
                  disabled
                  onClick={() => setTypeCmt('UPDATE')}
                  type="submit"
                  className="bg-blue-500  text-white  py-2 px-4 rounded w-[100px]"
                >
                  {Loading === 'pending' ? 'Loading...' : 'Send'}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setTypeCmt('UPDATE')}
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 font-bold text-white  py-2 px-4 rounded w-[100px]"
                  >
                    {Loading === 'pending' ? 'Loading...' : 'Send'}
                  </button>
                </>

              )}


            </form>
            <p>
<<<<<<< Updated upstream
              Describe what you liked, what you didn't like and other key
              things shoppers should know. Minimum 30 characters.
=======
              Mô tả những gì bạn thích, những gì bạn không thích và những điều quan trọng khác mà người mua hàng nên biết. Tối thiểu 30 ký tự.
>>>>>>> Stashed changes
            </p>
          </>

        </div>
      </ModalCmt>

    </>
  )
}

export default Colspace
