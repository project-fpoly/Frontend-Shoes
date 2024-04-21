import { Checkbox, ConfigProvider } from "antd"

const Privacy = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black'
          },
        }}
      >
        <div className="flex flex-col gap-8 max-w-[350px]">
          <p className="text-2xl ">Privacy
          </p>
          <p>Nike Run Club and Nike Training Club</p>
          <p>Use my workout data to give me adaptive training plans, personalised product recommendations and special event invitations.</p>
          <Checkbox checked={true}>
            Use workout data
          </Checkbox>
        </div>
      </ConfigProvider>
    </>
  )
}

export default Privacy
