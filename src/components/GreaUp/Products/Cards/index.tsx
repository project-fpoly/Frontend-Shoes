import { IProduct } from "../../../../common/products";
import { Image } from "antd";
import style from "./index.module.scss";
type Props = {
  shoes: IProduct[];
};

const Card = (props: Props) => {
  const { shoes } = props;

  return (
    <>
      <div className={style.cardContainer}>
        {shoes.map((item, index) => {
          return (
            <div key={index + 1}>
              <Image width={320} src={item.image} />
              <p>{item.name}</p>
              <h2>{item.price}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
