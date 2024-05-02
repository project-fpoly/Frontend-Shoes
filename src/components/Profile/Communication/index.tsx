import { Checkbox, ConfigProvider } from 'antd'

const Communication = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
          },
        }}
      >
        <div className="flex flex-col gap-8 max-w-[350px]">
          <p className="text-2xl ">Communication Preferences</p>
          <p>General Communication</p>
          <p>Get updates on products, offers and your Member benefits.</p>
          <Checkbox checked={true}>Yes send me email</Checkbox>
        </div>
      </ConfigProvider>
    </>
  )
}

export default Communication
