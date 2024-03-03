import { Button } from 'antd'
import { useRef } from 'react'
import { GrFavorite } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import Slider from "react-slick"

import { FaQuestionCircle } from 'react-icons/fa'
import "./style.css"

type Props = {}

const Cart = (props: Props) => {

    const ref = useRef<any>({});

    const next = () => {
        ref.current.slickNext();
    };

    const previous = () => {
        ref.current.slickPrev();
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className='shopping-cart mx-4 lg:mt-[100px] lg:w-[1200px] lg:mx-auto'>
                <div className='lg:flex lg:gap-6'>
                    <div className="shopping-cart-bag lg:w-[65%]">
                        <h2 className='text-3xl font-semibold text-center lg:text-left lg:my-4'>Bag</h2>
                        <div className='text-center mb-12 lg:hidden'>
                            <p>
                                <span className='text-[#6b7280] pr-2 mr-2 border-r-2'>1 Item</span>
                                3,179,000đ
                            </p>
                        </div>
                        <div className='cart-item flex mb-8'>
                            <figure className='w-[220px]'>
                                <Link to={'/'}>
                                    <img src="https://picsum.photos/200" alt="" />
                                </Link>
                            </figure>
                            <div className='cart-item-content flex w-full ml-4'>
                                <div className='flex flex-1 flex-col justify-between'>
                                    <div className=''>
                                        <div className='flex justify-between'>
                                            <h2 className='font-semibold text-xl'>Product 1</h2>
                                            <p className='text-xl font-semibold'>3.000.000 <span className='font-light'>đ</span></p>
                                        </div>
                                        <p className='text-lg text-[#6b7280]'>Lorem ipsum.</p>
                                        <p className='text-lg text-[#6b7280]'>White</p>
                                        <div className='flex text-lg text-[#6b7280]'>
                                            <div>
                                                <label htmlFor="">Size</label>
                                                <select name="size" id="" className='px-2 ml-1'>
                                                    <option value="38">38</option>
                                                    <option value="39">39</option>
                                                    <option value="40">40</option>
                                                    <option value="41">41</option>
                                                </select>
                                            </div>
                                            <div className="ml-2">
                                                <label htmlFor="">Quanlity</label>
                                                <select name="quanlity" id="" className='px-2 ml-1'>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='cart-item-content-action'>
                                        <ul className='flex'>
                                            <li><GrFavorite style={{ fontSize: "24px", marginRight: "12px" }} /></li>
                                            <li><RiDeleteBin6Line style={{ fontSize: "24px" }} /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="shopping-cart-summary lg:w-[35%]">
                        <h2 className='text-3xl font-semibold my-4'>Summary</h2>
                        <div>
                            <div className='text-[18px] font-semibold'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        Subtotal
                                        <FaQuestionCircle className='ml-2' />
                                    </div>
                                    <div>3.000.000 <span className='font-light'>VND</span></div>
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <div>Estimated Delivery & Handling</div>
                                    <div className='font-light'>Free</div>
                                </div>
                                <div className='hidden lg:block'><hr /></div>
                                <div className='flex justify-between items-center my-4 lg:my-5'>
                                    <div>Total</div>
                                    <div>3.000.000 <span className='font-light'>VND</span></div>
                                </div>
                                <div className='hidden lg:block'><hr /></div>
                            </div>

                            <div className='mt-5 hidden lg:block'>
                                <Button style={{ background: "rgb(17, 17, 17)" }} block className='h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700 mb-2'>
                                    <Link to={'./guest_checkout'}>
                                        <p>Guest Checkout</p>
                                    </Link>
                                </Button>
                                <Button style={{ background: "rgb(17, 17, 17)" }} block className='h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700'>
                                    Member Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="favourites my-12">
                    <h2 className='text-3xl font-semibold'>Favourites</h2>
                    <div className='flex items-center lg:block'>
                        <p className='text-lg'>Want to view your favourites?</p>
                        <Link to={'/'} className='underline text-lg text-gray-500 mx-1'>Join us</Link> or <Link to={'/'} className='underline text-lg text-gray-500 mx-1'>Sign in</Link>
                    </div>
                </div>
            </div>
            <div className='fixed z-10 bottom-0 h-[120px] w-full bg-white px-4 leading-[120px] lg:hidden'>
                <Button style={{ background: "rgb(17, 17, 17)" }} block className='h-[70px] rounded-[100px] text-xl text-white hover:!text-white hover:!border-white hover:!bg-stone-700 my-auto'>
                    <Link to={'./guest_checkout'}>
                        <p>Guest Checkout</p>
                    </Link>
                </Button>
            </div>

            <div className="favourites my-8 lg:px-8">
                <h2 className='text-3xl font-semibold mx-4'>You Might Also Like</h2>
                <div className='flex flex-row-reverse mr-4 my-4 text-[#CACACB]'>
                    <div>
                        <button className=' border rounded-full px-4 py-4 bg-[#f5f5f5]' onClick={next}>
                            <SlArrowRight />
                        </button>
                    </div>
                    <div>
                        <button className='mr-3 border rounded-full px-4 py-4 bg-[#f5f5f5]' onClick={previous}>
                            <SlArrowLeft />
                        </button>
                    </div>
                </div>
                <div className=''>
                    <Slider ref={ref} {...settings}>
                        <div>
                            <Link to={'1'}>
                                <div>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'2'}>
                                <div className='overflow-hidden w-full'>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'3'}>
                                <div className='overflow-hidden w-full'>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'4'}>
                                <div>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'5'}>
                                <div className='overflow-hidden w-full'>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'6'}>
                                <div className='overflow-hidden w-full'>
                                    <img src="https://picsum.photos/200" alt="" width="100%" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-xl'>Product 1</h2>
                                    <p className='text-lg text-[#707072]'>Lorem ipsum.</p>
                                    <p className='text-xl font-semibold mt-2 lg:mt-4'><span className='text-[#111111]'>đ</span>3.000.000</p>
                                </div>
                            </Link>
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Cart