import { Button, Image } from 'antd';


const NikeApps = () => {
  return (
    <div>
      <p className=" text-4xl">Nike Apps</p>
      <div className='flex gap-10'>
        <div className='max-w-[350px] flex flex-col gap-5'>
          <Image
            width={300}
            src="/src/assets/nikerunclub.jpg"
          />
          <div className='flex gap-5 justify-start items-center'>
            <Image
              width={50}
              src="/src/assets/nikerunclublogo.png"
            />
            <p className='font-bold'>Nike Run Club</p>
          </div>
          <p className='text-gray-700'>Run: Find the motivation you need to run better and more often.</p>
          <Button className='w-24 rounded-xl hover:bg-black'>Dowload</Button>
        </div>
        <div className='max-w-[350px] flex flex-col gap-5'>
          <Image
            width={300}
            src="/src/assets/nikeruntraningclub.jpg"
          />
          <div className='flex gap-5 justify-start items-center'>
            <Image
              width={50}
              src="/src/assets/niketraningclublogo.png"
            />
            <p className='font-bold'>Nike Run Club</p>
          </div>
          <p className='text-gray-700'>Run: Find the motivation you need to run better and more often.</p>
          <Button className='w-24 rounded-xl hover:bg-black'>Dowload</Button>
        </div>
      </div>
    </div>
  )
}

export default NikeApps