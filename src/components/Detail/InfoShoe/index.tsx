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
import "./button.scss";
interface Props {
  shoe: IProduct;
  category: ICategory;
}
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
            <Button className={clsx(style.button, "hover:border-black ")}>
              EU 40
            </Button>
            <Button className={style.button}>EU 40.5</Button>
            <Button className={style.button}>EU 41</Button>
            <Button className={style.button}>EU 41.5</Button>
            <Button className={style.button}>EU 42</Button>
            <Button className={style.button}>EU 42.5</Button>
            <Button className={style.button}>EU 43</Button>
            <Button className={style.button}>EU 43.5</Button>
            <Button className={style.button}>EU 44</Button>
            <Button className={style.button}>EU 44.5</Button>
            <Button className={style.button}>EU 45</Button>
            <Button className={style.button}>EU 45.5</Button>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <button className="w-[100%] py-4 bg-black font-bold text-white rounded-full hover:bg-opacity-65 ">
              Add to Bag
            </button>{" "}
            <button className="w-[100%] py-4 border border-[#CACACB] hover:border-black font-bold  rounded-full hover:bg-opacity-65 ">
              Add to Bag
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
              <h2 className="text-2xl ">{category.name}</h2>
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
