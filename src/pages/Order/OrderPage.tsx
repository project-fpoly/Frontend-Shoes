/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tabs, TabsProps } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUsers } from "../../features/order";
import { AppDispatch, RootState } from "../../redux/store";
import OrderItem from "./OrderItem";

export default function OrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrderByUsers());
  }, [dispatch]);

  const { orders } = useSelector((state: RootState) => state.order);

  const dataGet = (data: string) =>
    orders?.filter((item: any) => item.isDelivered === data);
  const dâta1 = dataGet("Chờ xác nhận");
  const dâta2 = dataGet("Chờ lấy hàng");
  const dâta3 = dataGet("Đang giao hàng");
  const dâta4 = dataGet("Đã giao hàng");
  const dâta5 = dataGet("Đã huỷ");

  const items: TabsProps["items"] = orders && [
    {
      key: "0",
      label: "Chờ xác nhận",
      children: <OrderItem data={dâta1} />,
    },
    {
      key: "Chờ lấy hàng",
      label: "Chờ lấy hàng",
      children: <OrderItem data={dâta2} />,
    },
    {
      key: "Đang giao hàng",
      label: "Đang giao hàng",
      children: <OrderItem data={dâta3} />,
    },
    {
      key: "Đã giao hàng",
      label: "Đã giao hàng",
      children: <OrderItem data={dâta4} />,
    },
    {
      key: "Đã huỷ",
      label: "Đã hủy",
      children: <OrderItem data={dâta5} />,
    },
  ];

  return (
    <div className="mt-20 px-10">
      <Tabs items={items} />
    </div>
  );
}
