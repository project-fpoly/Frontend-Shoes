import React, { useState } from 'react';
import { ConfigProvider, MenuProps } from 'antd';
import { FaRegUser } from "react-icons/fa";
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const Setting = () => {
  const items: MenuProps['items'] = [
    {
      label: <Link to={'/profile/setting'}><p className='text-[20px] '>Account Detail</p></Link>,
      key: 'Account Detail',
      icon: <FaRegUser size='20' />
      
    }

  ];
  const [current, setCurrent] = useState('Account Detail');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (

    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: '#001529',
            itemHoverBg: 'gray'
          },
        },
      }}
    >
      <div>
        <h1 className="text-3xl mb-8">Setting</h1>
        <div className='flex gap-20 min-h-[500px]'>
          <Menu className='flex flex-col gap-5 w-[20%] ' onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
          <div className='w-[70%]'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Setting