import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
const Setting = () => {
  return (
    <div>
      <h1 className="text-3xl mb-8">Setting</h1>
      <Tabs
        tabPosition={'left'}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </div>
  )
}

export default Setting