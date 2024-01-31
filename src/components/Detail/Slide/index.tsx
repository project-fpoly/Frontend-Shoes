import { IProduct } from "../../../common/products";
import { Image } from "antd";

interface Props {
  shoe: IProduct;
}

const Slide = (props: Props) => {
  const { shoe } = props;
  return (
    <>
      <Image
        className="rounded-lg"
        width={553}
        height={668}
        preview={false}
        src={"/src/assets/air-jordan-1-low-se-shoes-ZbxSRp.jpg"}
      />
    </>
  );
};

export default Slide;
