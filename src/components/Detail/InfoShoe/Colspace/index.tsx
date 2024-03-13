import { useState } from "react"; import { useForm, SubmitHandler } from 'react-hook-form';
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import "./index.scss";
import { Rate } from "antd"; import { Button } from 'antd';
import ModalCustom from "../../../Modal";
import { IProduct } from "../../../../common/products";
import { Image } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IStateCmt, IStateProduct } from "../../../../common/redux/type";
import { Avatar, Popover } from 'antd';
import { Link } from "react-router-dom";
import user from "../../../../features/user";
import { AppDispatch } from "../../../../redux/store";
import { createCommnets } from "../../../../features/comment";
const Colspace = ({ shoe }: { shoe: IProduct }) => {

  const commnets = useSelector((state: IStateCmt) => state.comment.comments);
  const dispatch = useDispatch<AppDispatch>();
  const Loading = useSelector((state: IStateCmt) => state.comment.loading);
  const { TextArea } = Input
  const accessToken = localStorage.getItem('accessToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items: CollapseProps["items"] = [
    {
      key: "1",
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
      key: "2",
      label: <h1 className=" text-xl font-bold">Reviews</h1>,
      children: (
        <div className="flex flex-col gap-5">
          <p className="flex gap-5">
            <Rate
              disabled
              className="text-black text-[15px] mt-1 "
              defaultValue={1.5}
            />
            <p className="text-[17px]">{`${commnets.length} Starts`}</p>
          </p>
          <p
            onClick={() => handleShowModal()}
            className="text-black text-2xl font-bold cursor-pointer border-b-black border-b-[1px] w-[170px] hover:opacity-70"
          >
            Write a review
          </p>
          <div className="flex flex-col gap-8  ">
            {commnets.map((comment, index) => {
              const { content } = comment
              return (
                <div key={index + 1} className="flex flex-col gap-5 cursor-pointer">
                  <div className="flex gap-5">
                    <Popover content={content} >
                      {/* <Avatar src={comment.userId?.avt['url'] ? comment.userId?.avt['url'] : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsignalvnoise.com%2Fposts%2F3104-behind-the-scenes-reinventing-our-default-profile-pictures&psig=AOvVaw1UBZDw2SCoh2glXQQC-xJ_&ust=1710421128654000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNizp7Kl8YQDFQAAAAAdAAAAABAI'} /> */}
                    </Popover>
                    <p className="text-xl"> {comment.userId["userName"]}</p>
                  </div>

                  <span className="flex flex-col gap-3">
                    <Rate
                      disabled
                      className="text-black"
                      defaultValue={comment.rating}
                    />
                    <span className=" flex gap-5 text-gray-500 " >
                      <p className="">{comment.content}</p>
                      <p>{comment.createdAt}</p>
                    </span>
                  </span>
                </div>

              );
            })}
          </div>
        </div>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  type FormValues = {
    content: string;
  };
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


  const { _id: shoeId } = shoe;
  const userId = localStorage.getItem('userID');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { content } = data;
    const commnet = { content, shoeId }
    dispatch(createCommnets(commnet as any));
    if (Loading === 'fulfilled') {
      setIsModalOpen(false);

    }
  };

  return (
    <>
      <Collapse
        className="w-[380px]"
        items={items}
        defaultActiveKey={["1"]}
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
          {(accessToken) && (
            <>
              <div className="flex gap-5">
                <Image width={80} src={shoe.image} />
                <p>{shoe.name}</p>
              </div>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <span>
                  <h2 className="mb-3">Overall rating *</h2>
                  <Rate className="text-black text-3xl" />
                </span>
                <div className="border-t-[1px] "></div>
                <p>Your Review *</p>
                <input className="h-[100px] p-2 rounded-md border border-black text-3xl outline-none" type="text" {...register('content', { required: true })} />
                {errors.content && <span className="text-red-500 font-bold ">This field is required</span>}

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded w-[100px]">
                  {Loading === 'pending' ? 'Loading...' : 'Send'}
                </button>
              </form>
              <p>
                Describe what you liked, what you didn't like and other key things
                shoppers should know. Minimum 30 characters.
              </p>
            </>
          )}
          {(!accessToken) && (
            <>
              <Link to={'/signin'}>
                <h1 className="font-bold text-2xl text-center underline text-black">You need to signin</h1>
              </Link>
            </>
          )}

        </div>
      </ModalCustom>
    </>
  );
};

export default Colspace;
