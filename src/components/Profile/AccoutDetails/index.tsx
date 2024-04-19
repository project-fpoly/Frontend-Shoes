import clsx from "clsx"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

interface IFormInput {
  userName: string
  deliveryAddress: string
  date: string
  phoneNumbers: string
}
const AccoutDetails = () => {
  const user = useSelector((state: any) => state.auth.user)
  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>()
  const preUserName = watch('userName')


  const predeliveryAddress = watch('deliveryAddress')

  const prephoneNumbers = watch('phoneNumbers')
  useEffect(() => {
    setValue('userName', user.userName)
    setValue('deliveryAddress', user.deliveryAddress)
    setValue('date', user.dateOfBirth)
    setValue('phoneNumbers', user.phoneNumbers)
  }, [user])

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <>
      <h1 className="text-3xl mb-5">Account Details </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div className="flex flex-col gap-3">
            <label>UserName</label>
            <input className="w-[300px] px-2 h-[50px] outline-none rounded-lg border border-black" {...register("userName")} />
          </div>
          <div className="flex flex-col gap-3">
            <label>Date of birth</label>
            <input disabled className="w-[300px] opacity-80 px-2 h-[50px] outline-none rounded-lg border border-gray-400" {...register("date")} />
          </div>
          <div className="flex flex-col gap-3">
            <label>UserName</label>
            <input className="w-[300px] px-2 h-[50px] outline-none rounded-lg border border-black" {...register("phoneNumbers")} />
          </div>
          <div className="flex flex-col gap-3">
            <label>Shiping address</label>
            <input className="w-[300px] px-2 h-[50px] outline-none rounded-lg border border-black" {...register("deliveryAddress")} />
          </div>
        </div>
        {(preUserName === user.userName && predeliveryAddress === user.deliveryAddress && prephoneNumbers === user.phoneNumbers) ? (
          <button disabled className={clsx('p-3 border flex opacity-30 items-end border-black rounded-lg ')}>Save a</button>
        ) : (
          <>
            <button className={clsx('p-3 border flex items-end hover:bg-black hover:text-white border-black rounded-lg ')}>Save</button>
          </>
        )}
      </form >
    </>
  )
}

export default AccoutDetails