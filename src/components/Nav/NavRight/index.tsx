import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import ModalCustom from "../../Modal";
import style from "./index.module.scss";
const NavRight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const handleChange = (e: any) => {
    setValueInput(e.target.value);
    if (valueInput && valueInput != "") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-2 flex gap-3 relative">
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        className=" px-12 w-[190px] bg-[#f5f5f5] hover:bg-[#e5e5e5] rounded-full outline-none "
        placeholder="Search"
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer absolute top-[5%] left-0 hover:bg-[#e5e5e5] rounded-full p-2 "
      >
        <CiSearch size={23} />
      </button>
      <CiHeart
        className="cursor-pointer mt-1 hover:bg-[#e5e5e5] rounded-full p-2"
        size={43}
      />
      <IoBagOutline
        className="mt-1 cursor-pointer hover:bg-[#e5e5e5] rounded-full p-2 "
        size={43}
      />
      <ModalCustom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="relative">
          <input
            defaultValue={valueInput}
            className="w-[700px] p-2 px-12 outline-none bg-[#f5f5f5] hover:bg-[#e5e5e5] rounded-full z-10 "
            type="text"
          />
          <button className="cursor-pointer absolute top-[5%] left-0 hover:bg-[#e5e5e5] rounded-full p-2 z-20 ">
            <CiSearch size={23} />
          </button>
        </div>
        <div className={style.resultSearch}>ádsassdsa</div>
      </ModalCustom>
    </div>
  );
};

export default NavRight;
