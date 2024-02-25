import { useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import "./index.scss";
import { Rate } from "antd";
import ModalCustom from "../../../Modal";
import { IProduct } from "../../../../common/products";
import { Image } from "antd";
import { Input } from "antd";

const comments = [
  {
    id: 1,
    name: "Chi thanh",
    title: "Fresh and funky looking creps",
    dateCmt: "15 Dec 2023",
    content:
      "Nice kicks! Wasn’t sure about the fact it says initiator on the tongue because that’s not my vibe",
    start: 4,
  },
  {
    id: 2,
    name: "ayarisd417411298",
    title: "very comfortable",
    dateCmt: "29 Oct 2023",
    content: "My new favorite shoes. They are super comfortable, I love them😍",
    start: 4,
  },
  {
    id: 3,
    name: "John906380018",
    title: "Really nice shoe",
    dateCmt: "05 Oct 2023",
    content:
      "Very comfortable shoe. I needed a comfortable shoe to walk in and this is it.",
    start: 2,
  },
];

const Colspace = ({ shoe }: { shoe: IProduct }) => {
  const { TextArea } = Input;

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
              defaultValue={5}
            />
            <p className="text-[17px]">{`${comments.length} Starts`}</p>
          </p>
          <p
            onClick={() => handleShowModal()}
            className="text-black text-2xl font-bold cursor-pointer border-b-black border-b-[1px] w-[170px] hover:opacity-70"
          >
            Write a review
          </p>
          <div className="flex flex-col gap-6">
            {comments.map((comment, index) => {
              return (
                <div key={index + 1} className="flex flex-col gap-3">
                  <p className="text-xl">{comment.title}</p>
                  <span className="flex gap-3">
                    <Rate
                      disabled
                      className="text-black"
                      defaultValue={comment.start}
                    />
                    <span className="flex text-gray-500">
                      <p>{comment.name}</p> - <p>{comment.dateCmt}</p>
                    </span>
                  </span>
                  <p>{comment.content}</p>
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
          <div className="flex gap-5">
            <Image width={80} src={shoe.image} />
            <p>{shoe.name}</p>
          </div>
          <span>
            <h2 className="mb-3">Overall rating *</h2>
            <Rate defaultValue={5} className="text-black text-3xl" />
          </span>

          <div className="border-t-[1px] "></div>
          <p>Your Review *</p>
          <TextArea className="outline-none" rows={5} />
          <p>
            Describe what you liked, what you didn't like and other key things
            shoppers should know. Minimum 30 characters.
          </p>
        </div>
      </ModalCustom>
    </>
  );
};

export default Colspace;
