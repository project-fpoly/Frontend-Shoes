import React from "react";
import style from "./index.module.scss";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const Cart = (props: Props) => {
  return (
    <div className="shopping-cart mt-[100px] w-[70%] mx-auto">
      <div className="grid grid-cols-3 gap-6">
        <div className="shopping-cart-bag col-span-2">
          <h2 className="text-3xl font-semibold">Bag</h2>
          <div className="py-3">
            <div className="cart-item grid grid-cols-3">
              <figure className="col-span-1">
                <Link to={"/"}>
                  <img src="https://picsum.photos/200" alt="" />
                </Link>
              </figure>
              <div className="cart-item-content col-span-2 px-2">
                <div className="flex flex-col grow">
                  <div className="flex flex-nowrap">
                    <div>
                      <h2 className="cart-item-content font-semibold">
                        Product 1
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Atque, architecto.
                      </p>
                      <div className="flex">
                        <div className="cart-item-content-size">
                          <label htmlFor="">Size</label>
                          <select name="size" id="" className="px-2 ml-1">
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                          </select>
                        </div>
                        <div className="cart-item-content-quanlity ml-2">
                          <label htmlFor="">Quanlity</label>
                          <select name="quanlity" id="" className="px-2 ml-1">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="text-xl font-semibold">
                          3.000.000 <span className="font-light">VND</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-content-action">
                    <ul>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-5" />
        </div>
        <div className="shopping-cart-summary col-span-1">
          <h2 className="text-3xl font-semibold">Summary</h2>
          <div>
            <div className="text-lg font-normal">
              <div className="flex justify-between items-center my-5">
                <div>Subtotal</div>
                <div>
                  3.000.000 <span className="font-light">VND</span>
                </div>
              </div>
              <div className="flex justify-between items-center my-5">
                <div>Estimated Delivery & Handling</div>
                <div className="font-light">Free</div>
              </div>
              <hr />
              <div className="flex justify-between items-center my-5">
                <div>Total</div>
                <div>
                  3.000.000 <span className="font-light">VND</span>
                </div>
              </div>
              <hr />
            </div>
            <div className="mt-5">
              <Button
                style={{ background: "rgb(17, 17, 17)" }}
                block
                className={style.button_checkout}
              >
                <Link to={"./guest_checkout"}>
                  <p>Guset Checkout</p>
                </Link>
              </Button>
              <Button
                style={{ background: "rgb(17, 17, 17)" }}
                block
                className={style.button_checkout}
              >
                Member Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="favourites">
        <h2 className="text-3xl font-semibold">Favourites</h2>
        <p className="text-lg">Want to view your favourites?</p>
        <Link to={"/"} className="underline text-lg text-gray-500">
          Join us
        </Link>{" "}
        or{" "}
        <Link to={"/"} className="underline text-lg text-gray-500">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Cart;
