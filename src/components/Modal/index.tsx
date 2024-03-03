import { Modal } from "antd";
import React, { ReactNode } from "react";

import "./index.scss";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  children: ReactNode;
}
const ModalCustom: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal className="h-[700px]" open={isModalOpen} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default ModalCustom;
