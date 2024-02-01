import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  fetchCategoryById,
  fetchProductById,
} from "../../features/product";
import { AppDispatch } from "../../redux/store";
import InfoShoe from "../../components/Detail/InfoShoe";
import Slide from "../../components/Detail/Slide";
import { IStateProduct } from "../../common/redux/type";
import LoadingProduct from "../../components/Loading/LoadingProduct";
import SlideAlso from "../../components/Detail/SlideAlso";

const DetailShoe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shoe = useSelector((state: IStateProduct) => state.product.product);
  const shoes = useSelector((state: IStateProduct) => state.product.products);

  const Loading = useSelector((state: IStateProduct) => state.product.loading);

  const category = useSelector(
    (state: IStateProduct) => state.product.category
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductById(+id!));
    dispatch(fetchCategoryById(+id!));
  }, [id]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (Loading === "pending") {
    return (
      <div className="flex justify-center items-center mt-36">
        <LoadingProduct></LoadingProduct>
      </div>
    );
  }
  return (
    <>
      <div className="flex  justify-center mt-28 gap-28">
        <Slide shoe={shoe}></Slide>
        <InfoShoe shoe={shoe} category={category}></InfoShoe>
      </div>
      <div className="mt-10 ml-7">
        <SlideAlso shoes={shoes}></SlideAlso>
      </div>
    </>
  );
};

export default DetailShoe;
