import { useState } from 'react'
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
import { IStateCmt, IStateProduct } from '../../../../common/redux/type'
import { Link } from 'react-router-dom'
import user from '../../../../features/user'
import moment from 'moment'
import { AppDispatch } from '../../../../redux/store'
import { createCommnets, deleteCommentById } from '../../../../features/comment'
const Colspace = ({ shoe }: { shoe: IProduct }) => {
  const [inputUpdate, setInputUpdate] = useState<boolean>(false)
  const userIdStorage = localStorage.getItem('userID')
  const commnets = useSelector((state: IStateCmt) => state.comment.comments)
  const dispatch = useDispatch<AppDispatch>()
  const Loading = useSelector((state: IStateCmt) => state.comment.loading)
  const accessToken = localStorage.getItem('accessToken')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idCmt, setIdCmt] = useState<ICmt>()
  const filteredReviews = commnets.filter(
    (review) => typeof review.rating === 'number',
  )
  const totalStars = filteredReviews.reduce(
    (acc, review) => acc + +review?.rating!,
    0,
  )
  const averageRating = totalStars / commnets.length
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  const handleShowModal = () => {
    setIsModalOpen(true)
  }
  type FormValues = {
    content: string
  }
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { _id: shoeId } = shoe
  const [rating, setRating] = useState<any>(0)
  const handleRateChange = (value: number) => {
    setRating(value)
  }
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(deleteCommentById(idCmt as ICmt))
    success()
  }
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Delete successfully',
      duration: 3000,
    })
  }

  const contentCommnet = () => {
    return (
      <>
        {contextHolder}
        <div className="flex flex-col w-32">
          <button
            onClick={() => setInputUpdate(true)}
            className="flex flex-start py-2 hover:bg-gray-100 rounded-sm"
          >
            Update
          </button>
          <Popconfirm
            title="Delete "
            description="Are you sure to delete this commnet?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <button className="flex flex-start py-2 hover:bg-gray-100 rounded-sm">
              Delete
            </button>
          </Popconfirm>
        </div>
      </>
    )
  }
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <h1 className=" text-xl font-bold">Free Delivery and Returns</h1>,
      children: (
        <div className="flex flex-col gap-5">
          <h3>Your order of 5.000.000₫ or more gets free standard delivery.</h3>

          <ul>
            <li>Standard delivered 4-5 Business Days</li>
            <li>Express delivered 2-4 Business Days</li>
          </ul>

          <p>
            Orders are processed and delivered Monday-Friday (excluding public
            holidays)
          </p>

          <p>Nike Members enjoy free returns.</p>
        </div>
      ),
    },
    {
      key: '2',
      label: <h1 className=" text-xl font-bold">Reviews</h1>,
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
          <p
            onClick={() => handleShowModal()}
            className="text-black text-2xl font-bold cursor-pointer border-b-black border-b-[1px] w-[170px] hover:opacity-70"
          >
            Write a review
          </p>
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
                      {inputUpdate && comment._id === idCmt?._id ? (
                        <>
                          {' '}
                          <form className="flex gap-5" action="">
                            <input
                              className="border outline-none p-1 rounded-md"
                              type="text"
                            />{' '}
                            <button
                              children
                              onClick={() => setInputUpdate(!inputUpdate)}
                            >
                              Update
                            </button>
                          </form>{' '}
                        </>
                      ) : (
                        <>
                          <p className="text-xl">
                            {' '}
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
                                <button onClick={() => setIdCmt(comment)}>
                                  ...
                                </button>
                              </Popover>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <span className="flex flex-col gap-3">
                    <Rate
                      disabled
                      className="text-black"
                      defaultValue={comment.rating}
                    />
                    <span className=" flex flex-col gap-2  ">
                      <p className="text-3xl">{comment.content}</p>
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
    const commnet = { content, shoeId, rating }
    dispatch(createCommnets(commnet as any))
    if (Loading === 'fulfilled') {
      setIsModalOpen(false)
      reset()
      setRating(null)
    }
  }

  return (
    <>
      <Collapse
        className="w-[380px]"
        items={items}
        defaultActiveKey={['1']}
        onChange={onChange}
      />

      <ModalCustom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="flex flex-col gap-10">
          <span className="text-center">
            <h1 className="text-xl">Write a Review</h1>
            <p className="text-gray-400">
              Share your thoughts with the community.
            </p>
          </span>
          {accessToken && (
            <>
              <div className="flex gap-5">
                <Image width={80} src={shoe.image} />
                <p>{shoe.name}</p>
              </div>
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <span>
                  <h2 className="mb-3">Overall rating *</h2>
                  <Rate
                    value={rating}
                    allowClear
                    onChange={handleRateChange}
                    className="text-black text-3xl"
                  />
                </span>
                <div className="border-t-[1px] "></div>
                <p>Your Review *</p>
                <input
                  className="h-[100px] p-2 rounded-md border border-black text-3xl outline-none"
                  type="text"
                  {...register('content', { required: true })}
                />
                {errors.content && (
                  <span className="text-red-500 font-bold ">
                    This field is required
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
                Describe what you liked, what you didn't like and other key
                things shoppers should know. Minimum 30 characters.
              </p>
            </>
          )}
          {!accessToken && (
            <>
              <Link to={'/signin'}>
                <h1 className="font-bold text-2xl text-center underline text-black">
                  You need to signin
                </h1>
              </Link>
            </>
          )}
        </div>
      </ModalCustom>
    </>
  )
}

export default Colspace
