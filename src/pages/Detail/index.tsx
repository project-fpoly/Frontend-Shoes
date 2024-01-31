import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryById, fetchProductById } from "../../features/product";
import { AppDispatch } from "../../redux/store";
import InfoShoe from "../../components/Detail/InfoShoe";
import Slide from "../../components/Detail/Slide";
import { IStateProduct } from "../../common/redux/type";
import LoadingProduct from "../../components/Loading/LoadingProduct";

const DetailShoe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shoe = useSelector((state: IStateProduct) => state.product.product);
  const Loading = useSelector((state: IStateProduct) => state.product.loading);

  const category = useSelector(
    (state: IStateProduct) => state.product.category
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductById(+id!));
    dispatch(fetchCategoryById(+id!));
  }, [id]);

  if (Loading === "pending") {
    return (
      <div className="flex justify-center items-center mt-36">
        <LoadingProduct></LoadingProduct>
      </div>
    );
  }
  return (
    <>
      <div className="flex  justify-center mt-52 gap-28">
        <Slide shoe={shoe}></Slide>
        <InfoShoe shoe={shoe} category={category}></InfoShoe>
      </div>
    </>
  );
};

export default DetailShoe;
