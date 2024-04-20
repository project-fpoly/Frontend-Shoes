import clsx from "clsx"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface IFormInput {
  userName: string
  deliveryAddress: string
  date: string
  phoneNumbers: string,
  gender: string
}
const AccoutDetails = () => {
  const user = useSelector((state: any) => state.auth.user)
  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>()
  // const preUserName = watch('userName')

  const [openUserName, setOpenUseName] = useState(false)
  const [openAddress, setOpenAddress] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [openGender, setOpenGender] = useState(false)

  // const predeliveryAddress = watch('deliveryAddress')

  // const prephoneNumbers = watch('phoneNumbers')
  useEffect(() => {
    setValue('userName', user.userName)
    setValue('deliveryAddress', user.deliveryAddress)
    setValue('date', user.dateOfBirth)
    setValue('gender', user.gender)
    setValue('phoneNumbers', user.phoneNumbers)
  }, [user])

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

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
                  <button onClick={() => setOpenUseName(!openUserName)} className="absolute right-[5%] top-[51%] "><MdOutlineCancel /></button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>UserName</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("userName")} />
                  <button onClick={() => setOpenUseName(!openUserName)} className="absolute right-[5%] top-[51%] "><FaEdit /></button>
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
                  <button onClick={() => setOpenAddress(!openAddress)} className="absolute right-[5%] top-[51%] "><MdOutlineCancel /></button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Delivery Address</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("deliveryAddress")} />
                  <button onClick={() => setOpenAddress(!openAddress)} className="absolute right-[5%] top-[51%] "><FaEdit /></button>
                </div>
              </>
            )}
          </div >
          <div className="flex flex-col gap-3 relative w-[250px]">
            <label>Phone Number</label>
            <input disabled className=" px-2 h-[50px] outline-none opacity-55  rounded-lg border border-black" {...register("phoneNumbers")} />
          </div>
          <div  >
            {openDate ? (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Date of birth</label>
                  <input className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("date")} />
                  <button onClick={() => setOpenDate(!openDate)} className="absolute right-[5%] top-[51%] "><MdOutlineCancel /></button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Date of birth</label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("date")} />
                  <button onClick={() => setOpenDate(!openDate)} className="absolute right-[5%] top-[51%] "><FaEdit /></button>
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
                  <button onClick={() => setOpenGender(!openGender)} className="absolute right-[5%] top-[51%] "><MdOutlineCancel /></button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3 relative w-[250px]">
                  <label>Gender </label>
                  <input disabled className=" px-2 h-[50px] outline-none  rounded-lg border border-black" {...register("gender")} />
                  <button onClick={() => setOpenGender(!openGender)} className="absolute right-[5%] top-[51%] "><FaEdit /></button>
                </div>
              </>
            )}
          </div >
        </div>
      </form>
    </>
  )
}

export default AccoutDetails