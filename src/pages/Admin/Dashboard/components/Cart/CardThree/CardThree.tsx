import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { SearchOutlined } from '@ant-design/icons'
import {
  Button as ButtonAnt,
  Drawer,
  Input,
  InputRef,
  Select,
  Space,
} from 'antd'

import { useRef, useState } from 'react'

import type { FilterConfirmProps } from 'antd/es/table/interface'
import { ColumnType } from 'antd/lib/table'
import Highlighter from 'react-highlight-words'

import { arrayIcons } from './icons'

import { v4 as uuid } from 'uuid'

import { useAppDispatch } from '../../../../../../redux/hook'
import { useGetAnalystMonthQuery } from '../../../../../../services/analytic'
import { renderOrderStatus } from '../../../utils/order-status'
import CardOne from '../CardOne'
import CardTwo from '../CardTwo'
import { IAnalytics } from '../../../../../../types/analytic'

interface CardThreeProps {
  data: IAnalytics
  data2: any
}

type DataIndex = keyof any

const CardThree = ({ data, data2 }: CardThreeProps) => {
  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [index2, setIndex2] = useState(0)
  const [statusOrder, setStatusOrder] = useState('pending')
  const searchInput = useRef<InputRef>(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const { data: dataAnalytics3, isError: errorAnalytics3 } =
    useGetAnalystMonthQuery()
  const dataAhihih = [
    {
      name: dataAnalytics3?.orders[0].analytics[0].name,
      'tuần 1':
        dataAnalytics3?.orders[0].analytics[0].analytics[index].totalRevenue,
      'tuần 2':
        dataAnalytics3?.orders[0].analytics[0].analytics[1].totalRevenue,
      'tuần 3':
        dataAnalytics3?.orders[0].analytics[0].analytics[2].totalRevenue,
      'tuần 4':
        dataAnalytics3?.orders[0].analytics[0].analytics[3].totalRevenue,
    },
    {
      name: dataAnalytics3?.orders[0].analytics[1].name,
      'tuần 1':
        dataAnalytics3?.orders[0].analytics[1].analytics[index].totalRevenue,
      'tuần 2':
        dataAnalytics3?.orders[0].analytics[1].analytics[1].totalRevenue,
      'tuần 3':
        dataAnalytics3?.orders[0].analytics[1].analytics[2].totalRevenue,
      'tuần 4':
        dataAnalytics3?.orders[0].analytics[1].analytics[3].totalRevenue,
    },
    {
      name: dataAnalytics3?.orders[0].analytics[2].name,
      'tuần 1':
        dataAnalytics3?.orders[0].analytics[2].analytics[index].totalRevenue,
      'tuần 2':
        dataAnalytics3?.orders[0].analytics[2].analytics[1].totalRevenue,
      'tuần 3':
        dataAnalytics3?.orders[0].analytics[2].analytics[2].totalRevenue,
      'tuần 4':
        dataAnalytics3?.orders[0].analytics[2].analytics[3].totalRevenue,
    },
    {
      name: dataAnalytics3?.orders[0].analytics[3].name,
      'tuần 1':
        dataAnalytics3?.orders[0].analytics[3].analytics[index].totalRevenue,
      'tuần 2':
        dataAnalytics3?.orders[0].analytics[3].analytics[1].totalRevenue,
      'tuần 3':
        dataAnalytics3?.orders[0].analytics[3].analytics[2].totalRevenue,
      'tuần 4':
        dataAnalytics3?.orders[0].analytics[3].analytics[3].totalRevenue,
    },
    {
      name: dataAnalytics3?.orders[0].analytics[4].name,
      'tuần 1':
        dataAnalytics3?.orders[0].analytics[4].analytics[index].totalRevenue,
      'tuần 2':
        dataAnalytics3?.orders[0].analytics[4].analytics[1].totalRevenue,
      'tuần 3':
        dataAnalytics3?.orders[0].analytics[4].analytics[2].totalRevenue,
      'tuần 4':
        dataAnalytics3?.orders[0].analytics[4].analytics[3].totalRevenue,
    },
  ]

  const handleChange = (value: string) => {
    setIndex(Number(value))
  }

  const handleChange2 = (value: string) => {
    setIndex2(Number(value))
  }

  const dataAnalyticMonth = (dataAnalytics3?.orders[1]?.analytics[0] as any)
    ? (dataAnalytics3?.orders[1]?.analytics[0] as any)[statusOrder].map(
        (item: any) => ({
          name: `tháng ${item.month}`,
          'Doanh thu': item.totalRevenue,
        }),
      )
    : []

  const handleChangeAnalyticMonth = (value: string) => {
    setStatusOrder(value)
  }

  if (errorAnalytics3) return <div>error</div>

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    // setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm mã đơn hàng`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <ButtonAnt
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </ButtonAnt>
          <ButtonAnt
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Làm mới
          </ButtonAnt>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={
            text ? text.toString().substring(text.length - 8) : ''
          }
        />
      ) : (
        text.substring(text.length - 8)
      ),
  })

  return (
    <>
      <div
        className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <div className="mt-4">
          <div>
            <h4 className="text-title-md font-bold text-black">
              {data.countOrderStatus[3].value}
            </h4>
            <span className="text-sm font-medium">Đơn hàng đã hoàn thành</span>
          </div>

          <span className="hidden grid-cols-[9fr,1fr] text-right mt-2 items-center gap-1 text-sm font-medium text-meta-3">
            2.59%
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          </span>
        </div>
      </div>

      <Drawer
        title="Thống kê đơn hàng"
        open={isModalOpen}
        placement="right"
        width={1200}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="grid grid-cols-4 gap-5 w-full">
          {data &&
            data.countOrderStatus.map((orderStatus, index) => (
              <div
                key={uuid()}
                className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  {arrayIcons[index]?.icon}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div className="">
                    <h4 className="text-title-md font-bold text-black  ">
                      {data?.moneyOrderStatus[index]?.value?.toLocaleString()}{' '}
                      VND
                    </h4>
                    <span className="text-base font-medium">
                      {orderStatus.value} đơn{' '}
                      {renderOrderStatus(orderStatus.name).toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          <CardTwo
            price={data2?.['doanh thu tháng này']['tổng doanh thu']}
            title={''}
            isCurrency={true}
          />

          <CardOne data={data2?.['doanh thu tháng này']} />

          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between items-center">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {arrayIcons[index].icon}
              </div>
              <Select
                defaultValue="0"
                style={{ width: 120 }}
                onChange={handleChange2}
                options={[
                  { value: '0', label: 'Ngày' },
                  { value: '1', label: 'Tuần' },
                  { value: '2', label: 'Tháng' },
                ]}
              />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div className="">
                <span className="text-base font-medium invisible">
                  Lorem ipsum
                </span>
                <h4 className="text-title-md font-bold text-black  ">
                  {data.moneys[index2].value.toLocaleString()} VND
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 h-full rounded-sm border grid gap-6 grid-cols-1 border-stroke bg-white pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-black   mb-4">
              Doanh thu hàng tuần trong tháng
            </h3>
            <Select
              defaultValue="0"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: '0', label: 'Tuần 1' },
                { value: '1', label: 'Tuần 2' },
                { value: '2', label: 'Tuần 3' },
                { value: '3', label: 'Tuần 4' },
              ]}
            />
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={200} data={dataAhihih}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {index === 0 && (
                <Bar
                  dataKey="tuần 1"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              )}
              {index === 1 && (
                <Bar
                  dataKey="tuần 2"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              )}
              {index === 2 && (
                <Bar
                  dataKey="tuần 3"
                  fill="#b4ae36"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              )}
              {index === 3 && (
                <Bar
                  dataKey="tuần 4"
                  fill="#e333c2"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full mt-6 h-full rounded-sm border grid grid-cols-1 border-stroke bg-white pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-black   mb-4">
              Doanh thu hàng tháng
            </h3>
            <Select
              defaultValue="pending"
              style={{ width: 220 }}
              onChange={handleChangeAnalyticMonth}
              options={[
                { value: 'pending', label: 'Chờ xác nhận' },
                { value: 'confirmed', label: 'Chờ lấy hàng' },
                { value: 'delivered', label: 'Đang giao hàng' },
                { value: 'done', label: 'Đã giao hàng' },
                { value: 'canceled', label: 'Hủy đơn hàng' },
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataAnalyticMonth}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Doanh thu"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Drawer>
    </>
  )
}

export default CardThree
