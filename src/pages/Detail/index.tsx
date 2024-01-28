import { useParams } from "react-router-dom";

const DetailShoe = () => {
  const { id } = useParams();
  console.log(id);

  return <></>;
};

export default DetailShoe;
