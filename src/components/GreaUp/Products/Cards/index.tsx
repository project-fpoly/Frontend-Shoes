import { IProduct } from "../../../../common/products";
import style from "./index.module.scss";
import { Link } from "react-router-dom";

type Props = {
  shoes: IProduct[];
};

const Card = (props: Props) => {
  const { shoes } = props;
  console.log(shoes);

  return (
    <>
      <div className={style.cardContainer}>
        {shoes.map((item, index) => {
          return (
            <div key={index + 1} className="mb-28">
              <Link className="flex flex-col gap-6" to={`/detail/${item._id}`}>
                <img
                  className={style.image}
                  src={"/src/assets/air-jordan-1-low-se-shoes-ZbxSRp.jpg"}
                  width={"100%"}
                  alt="BigCo Inc. logo"
                />
                <p>{item.name}</p>
                <h2>{item.price}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
