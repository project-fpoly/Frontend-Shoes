import React from 'react'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  { title: '3.5', dataIndex: 'address', key: '1' },
  { title: '4', dataIndex: 'address', key: '2' },
  { title: '4.5', dataIndex: 'address', key: '3' },
  { title: '5', dataIndex: 'address', key: '5' },
  { title: '5.5', dataIndex: 'address', key: '6' },
  { title: '6', dataIndex: 'address', key: '7' },
  { title: '6.5', dataIndex: 'address', key: '8' },
  { title: '7.5', dataIndex: 'address', key: '8' },
  { title: '8', dataIndex: 'address', key: '8' },
  { title: '8.5', dataIndex: 'address', key: '8' },
  { title: '9', dataIndex: 'address', key: '8' },
  { title: '9.5', dataIndex: 'address', key: '8' },
  { title: '10', dataIndex: 'address', key: '8' },
  { title: '10.5', dataIndex: 'address', key: '8' },
  { title: '11', dataIndex: 'address', key: '8' },
  { title: '11.5', dataIndex: 'address', key: '8' },
  { title: '12', dataIndex: 'address', key: '8' },
  { title: '12.5', dataIndex: 'address', key: '8' },
  { title: '13', dataIndex: 'address', key: '8' },
  { title: '13.5', dataIndex: 'address', key: '8' },
  { title: '14', dataIndex: 'address', key: '8' },
  { title: '15.5', dataIndex: 'address', key: '8' },
  { title: '16', dataIndex: 'address', key: '8' },
  { title: '17.5', dataIndex: 'address', key: '8' },
  { title: '18', dataIndex: 'address', key: '8' },
  { title: '18.5', dataIndex: 'address', key: '8' },
  { title: '19', dataIndex: 'address', key: '8' },
  { title: '20', dataIndex: 'address', key: '8' },
  { title: '21', dataIndex: 'address', key: '8' },
  { title: '21.5', dataIndex: 'address', key: '8' },
  { title: '22', dataIndex: 'address', key: '8' },
]

const data: DataType[] = [
  {
    key: '1',
    name: "US – Women's",
    age: 32,
    address: '5',
  },
  {
    key: '2',
    name: 'UK',
    age: 40,
    address: '3',
  },
  {
    key: '3',
    name: 'CM/JP',
    age: 40,
    address: '31',
  },
  {
    key: '4',
    name: 'EU',
    age: 40,
    address: '32',
  },
]

const SizeGuide: React.FC = () => (
  <>
    <div className="mt-32 ">
      <div className="flex flex-col px-[200px] gap-5">
        <span className="flex flex-col gap-5">
          <h1 className="text-5xlxl font-bold">Size guide</h1>
          <p>Find your correct size in the chart below.</p>
          <p>Scroll horizontally to see more sizes.</p>
        </span>

        <h1 className="text-3xl font-bold">Size guide</h1>
        <Table
          className="w-[1000px]"
          columns={columns}
          dataSource={data}
          scroll={{ x: 2000 }}
        />
      </div>
    </div>
  </>
)

export default SizeGuide
