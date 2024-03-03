import { Button, ConfigProvider } from "antd";
import { ICategory } from "../../../common/category";
import { IProduct } from "../../../common/products";
import style from "./index.module.scss";
import clsx from "clsx";
import ModalCustom from "../../Modal";
import { useState } from "react";
import { Image } from "antd";
import Colspace from "./Colspace";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
interface Props {
  shoe: IProduct;
  category: ICategory;
}
const sizesS = [
  { size: "EU 40" },
  { size: "EU 41" },
  { size: "EU 42" },
  { size: "EU 43" },
  { size: "EU 44" },
  { size: "EU 45" },
  { size: "EU 46" },
  { size: "EU 47" },
  { size: "EU 48" },
  { size: "EU 49" },
  { size: "EU 50" },
  { size: "EU 51" },
  { size: "EU 52" },
];
const InfoShoe = (props: Props) => {
  const { shoe, category } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 18,
              textHoverBg: "red",
            },
          },
        }}
      >
        <div className={clsx("flex flex-col gap-6", style.containerInfo)}>
          <div>
            <h2 className="text-black text-2xl">{shoe.name}</h2>
            <p>{category.name}</p>
            <h3 className="my-10 text-xl">{shoe.price}</h3>
          </div>
          <span className="flex justify-between cursor-pointer text-xl text-gray-400">
            <p>Select size</p>
            <Link to={"/sizeguide"}>
              <p>Size guide</p>
            </Link>
          </span>
          <div className={style.sizes}>
            {sizesS.map((item) => {
              return (
                <Button
                  onClick={() => console.log(item.size)}
                  key={item.size}
                  className={clsx(style.button, "hover:border-black")}
                >
                  {item.size}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <button
              onClick={() => console.log("hello")}
              className="w-[100%] py-4 bg-black font-bold text-white rounded-full hover:bg-opacity-65 "
            >
              Add to Bag
            </button>{" "}
            <button className="w-[100%] py-4 border flex items-center justify-center border-[#CACACB] hover:border-black font-bold  rounded-full hover:bg-opacity-65 ">
              Favourite
              <p className="mt-1 px-3">
                <CiHeart />
              </p>
            </button>
          </div>
          <p>{shoe.description}</p>
          <p
            className=" border-b-2 border-b-black w-[170px] font-bold text-lg cursor-pointer hover:opacity-70"
            onClick={() => showModal()}
          >
            View product detail
          </p>
          <Colspace shoe={shoe}></Colspace>

          <ModalCustom
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <Image width={70} src={shoe.image} />
                <span>
                  <p>{shoe.name}</p>
                  <p>{shoe.price}</p>
                </span>
              </div>
              <h2 className="text-2xl ">{category?.name}</h2>
              <p>{shoe.description}</p>
              <p>
                <p className="font-bold text-xl mb-3">Benefits</p>
                {shoe.benefits}
              </p>
            </div>
          </ModalCustom>
        </div>
      </ConfigProvider>
    </>
  );
};

export default InfoShoe;
