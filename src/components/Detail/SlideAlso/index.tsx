import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { IProduct } from "../../../common/products";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
interface Props {
  shoes: IProduct[];
}
const SlideAlso = ({ shoes }: Props) => {
  return (
    <>
      <h1 className="ml-8 my-5 text-2xl font-bold">You Might Also Like</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className={style.swiper}
      >
        {shoes.map((shoe, index) => {
          return (
            <SwiperSlide className="mb-10 flex flex-col gap-5" key={index + 1}>
              <Link to={`/detail/${shoe.id}`}>
                <img
                  className="rounded-lg"
                  width={459}
                  height={400}
                  src={"/src/assets/air-jordan-1-low-se-shoes-ZbxSRp.jpg"}
                  alt="BigCo Inc. logo"
                />
                <h2 className="font-bold">{shoe.name}</h2>
                <p>{shoe.price}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default SlideAlso;
