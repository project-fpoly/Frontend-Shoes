import { BarChartOutlined } from '@ant-design/icons'
import { Card, Col, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import dayjs from 'dayjs'
import { getChart } from '../../../services/dashboard'

const VI_DEFAULT_DF = 'YYYY-MM-DD'
const { RangePicker } = DatePicker
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']
const BarCompopent = ({ id }: { id: string }) => {
  const [chart, setChart] = useState<any[]>([])
  const [config, setConfig] = useState<any>()
  const [timeRangeState, setTimeRangeState] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().add(-6, 'd'), dayjs()])
  useEffect(() => {
    getChart(
      id,
      timeRangeState[0].format('YYYY-MM-DD'),
      timeRangeState[1].format('YYYY-MM-DD'),
    ).then((resp) => {
      const data = resp.data[0]
      setConfig(data.config)
      setChart(data.data.data)
    })
  }, [id, timeRangeState])
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  const onTimeRangeChange = (values: any) => {
    setTimeRangeState([values[0], values[1]])
  }
  return (
    <Col span={chart.length > 7 ? 24 : 12} key={id}>
      <Card
        title={config?.name}
        extra={
          <>
            <RangePicker
              format={VI_DEFAULT_DF}
              style={{ width: 220 }}
              defaultValue={[dayjs().add(-7, 'd'), dayjs()]}
              value={timeRangeState}
              onChange={onTimeRangeChange}
            />
          </>
        }
      >
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            height={300}
            data={chart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <Bar dataKey="value" fill={getRandomColor()} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Col>
  )
}

export default BarCompopent
