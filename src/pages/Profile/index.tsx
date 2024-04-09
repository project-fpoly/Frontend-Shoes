// import { ConfigProvider, Tabs } from 'antd';
// import './profile.css';

import NavProfile from "../../components/Profile/Nav"

// const onChange = (key: any) => {
//   console.log(key);
// };
// const items = [
//   {
//     key: '1',
//     label: 'Profile',
//     children: 'Content of Tab Pane 1',
//   },
//   {
//     key: '2',
//     label: 'Order',
//     children: 'Content of Tab Pane 2',
//   },
//   {
//     key: '3',
//     label: 'Favorites',
//     children: 'Content of Tab Pane 3',
//   }, {
//     key: '4',
//     label: 'Settings',
//     children: 'Content of Tab Pane 4',
//   },
// ];
const Profile = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <NavProfile></NavProfile>
      </div>
    </>
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Tabs: {
    //         itemSelectedColor: 'black',
    //         itemHoverColor: '0C0C0C',
    //         inkBarColor: 'black'
    //       },
    //     },
    //   }}
    // >
    //   <Tabs className='flex mt-10 justify-center gap-10 items-center' defaultActiveKey="1" items={items} onChange={onChange} />
    // </ConfigProvider>
  )

}
export default Profile