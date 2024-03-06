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
import useLocalStorage from "../../../hooks";

interface Props {
  shoe: IProduct;
  category: ICategory;
}
const InfoShoe = (props: Props) => {
  const { shoe, category } = props;
  const [size, setSize] = useState("");

  const [cart, setCart] = useLocalStorage<IProduct[]>("cart", []);
  const { sizes, ...shoeCart } = shoe;

  const addToCart = () => {
    const updatedCart = cart?.map((item: IProduct) => {
      if (item._id == shoe._id) {
        // If product with the same ID already exists, increase its quantity
        return { ...item, quantity: item?.quantity! + 1 };
      }
      return item;
    });

    // If the product was not found in the cart, add it with quantity 1
    if (!updatedCart?.find((item: IProduct) => item._id === shoe._id)) {
      updatedCart?.push({ ...shoe, quantity: 1 });
    }
    setCart(updatedCart);
  };
  const storedData = localStorage.getItem("cart");
  console.log(JSON.parse(storedData));

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
        <div
          className={clsx("flex flex-col gap-6 w-[500px]", style.containerInfo)}
        >
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
            {shoe?.sizes?.map((item) => {
              return (
                <Button
                  onClick={() => setSize(item.name)}
                  key={item.name}
                  className={clsx(style.button, "hover:border-black")}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <button
              onClick={() => addToCart()}
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
                <Image width={70} src={shoe?.image!} />
                <span>
                  <p>{shoe.name}</p>
                  <p>{shoe.price}</p>
                </span>
              </div>
              <h2 className="text-2xl ">{category?.name}</h2>
              <p>{shoe.description}</p>
              <p>
                <p className="font-bold text-xl mb-3">Benefits</p>
                {shoe.stock_status}
              </p>
            </div>
          </ModalCustom>
        </div>
      </ConfigProvider>
    </>
  );
};

export default InfoShoe;
