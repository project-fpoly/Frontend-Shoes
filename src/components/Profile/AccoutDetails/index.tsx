import clsx from "clsx"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { AppDispatch } from "../../../redux/store";
import { updateUserClient } from "../../../features/user";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IFormInput {
  userName: string
  deliveryAddress: string
  dateOfBirth: string
  phoneNumbers: string,
  gender: string
}
const AccoutDetails = () => {
  const user = useSelector((state: any) => state.user.user)
  const loading = useSelector((state: any) => state.user.loading)

  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>()
  const [openUserName, setOpenUseName] = useState(false)
  const [OpenPhoneNumber, setOpenPhoneNumber] = useState(false)
  const [openAddress, setOpenAddress] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [openGender, setOpenGender] = useState(false)

  const preUserName = watch('userName')
  const preUserDate = watch('dateOfBirth')
  const predeliveryAddress = watch('deliveryAddress')
  const prephoneNumbers = watch('phoneNumbers')
  const prepGender = watch('gender')
  useEffect(() => {
    setValue('userName', user.userName)
    setValue('deliveryAddress', user.deliveryAddress)
    setValue('dateOfBirth', user.dateOfBirth)
    setValue('gender', user.gender)
    setValue('phoneNumbers', user.phoneNumbers)
  }, [user])
  const dispact = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispact(updateUserClient({
      newUser: data,
      id: user._id
    }))

  }

  return (
    <>
      <h1 className="text-3xl mb-5">Account Details </h1>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="grid grid-cols-3 gap-5 ">
          <div  >
            {openUserName ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>UserName</label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("userName")} />
                  <span onClick={() => {
                    setOpenUseName(!openUserName)
                    setValue('userName', user.userName)

                  }} className="absolute right-[5%] cursor-pointer top-[51%] "><MdOutlineCancel /></span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>UserName</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("userName")} />
                  <span onClick={() => setOpenUseName(!openUserName)} className="absolute cursor-pointer right-[5%] top-[51%] "><FaEdit /></span>
                </div>
              </>
            )}
          </div >
          <div>
            {openAddress ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Delivery Address</label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("deliveryAddress")} />
                  <span onClick={() => {
                    setOpenAddress(!openAddress)
                    setValue('deliveryAddress', user.deliveryAddress)
                  }} className="absolute right-[5%] cursor-pointer top-[51%] "><MdOutlineCancel /></span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Delivery Address</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("deliveryAddress")} />
                  <span onClick={() => setOpenAddress(!openAddress)} className="absolute cursor-pointer right-[5%] top-[51%] "><FaEdit /></span>
                </div>
              </>
            )}
          </div >
          <div  >
            {OpenPhoneNumber ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Phone Number</label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("phoneNumbers")} />
                  <span onClick={() => {
                    setOpenPhoneNumber(!OpenPhoneNumber)
                    setValue('phoneNumbers', user.phoneNumbers)
                  }} className="absolute right-[5%] cursor-pointer top-[51%] "><MdOutlineCancel /></span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Phone Number</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("phoneNumbers")} />
                  <span onClick={() => setOpenPhoneNumber(!OpenPhoneNumber)} className="absolute cursor-pointer right-[5%] top-[51%] "><FaEdit /></span>
                </div>
              </>
            )}
          </div >
          <div  >
            {openDate ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Date of birth</label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("dateOfBirth")} />
                  <span onClick={() => {
                    setOpenDate(!openDate)
                    setValue('dateOfBirth', user.dateOfBirth)
                  }} className="absolute right-[5%] cursor-pointer top-[51%] "><MdOutlineCancel /></span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Date of birth</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("dateOfBirth")} />
                  <span onClick={() => setOpenDate(!openDate)} className="absolute cursor-pointer right-[5%] top-[51%] "><FaEdit /></span>
                </div>
              </>
            )}
          </div >
          <div  >
            {openGender ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Gender </label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("gender")} />
                  <span onClick={() => {
                    setOpenGender(!openGender)
                    setValue('gender', user.gender)
                  }} className="absolute right-[5%] cursor-pointer top-[51%] "><MdOutlineCancel /></span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Gender </label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("gender")} />
                  <span onClick={() => setOpenGender(!openGender)} className="absolute cursor-pointer right-[5%] top-[51%] "><FaEdit /></span>
                </div>
              </>
            )}
          </div>
        </div>
        {preUserName === user.userName && preUserDate === user.dateOfBirth && prephoneNumbers === user.phoneNumbers && predeliveryAddress === user.deliveryAddress && prepGender === user.gender ?
          <>
            <p onClick={() => setOpenGender(!openGender)} className=" w-[65px] cursor-pointer opacity-35 rounded-lg bg-black  px-3 py-1 text-white right-[5%] top-[51%] mt-10 ">SAVE </p>
          </>
          :
          <>
            <button onClick={() => setOpenGender(!openGender)} className="cursor-pointer rounded-lg bg-black  px-3 py-1 text-white right-[5%] top-[51%] mt-10 ">
              {loading === 'pending' ?
                <>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                </>
                :
                'SAVE'
              }
            </button>
          </>
        }
      </form>
    </>
  )
}

export default AccoutDetails