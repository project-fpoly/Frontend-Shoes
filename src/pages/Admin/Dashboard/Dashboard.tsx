import { Spin } from 'antd'
import {
  useGetAnalyticsQuery,
  useGetAnalystQuery,
} from '../../../services/analytic'
import { BarChartSimple } from './components/bar-chart'
import { MonthlyRevenue } from './components/monthly-revenue'
import { ProductAnalytic } from './components/product-analytic'
import CardOne from './components/Cart/CardOne'
import CardFour from './components/Cart/CardFour'
import CardThree from './components/Cart/CardThree'

const FeatureDashboard = () => {
  const {
    data: dataAnalytics,
    isLoading: loadingTotalMoneys,
    isError: errorAnalytics,
  } = useGetAnalyticsQuery()
  const {
    data: dataAnalytics2,
    isLoading: loadingTotalMoneys2,
    isError: errorAnalytics2,
  } = useGetAnalystQuery()

  if (loadingTotalMoneys || loadingTotalMoneys2) return <Spin />

  if (errorAnalytics || errorAnalytics2) return <div>error</div>

  if (!dataAnalytics || !dataAnalytics2) return <Spin />

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-40">
        {/* <CardTwo data={dataAnalytics2?.['doanh thu tháng này']} /> */}
        <ProductAnalytic
          dataAnalytics2={dataAnalytics2}
          dataAnalytics={dataAnalytics}
        />
        <CardOne data={dataAnalytics2?.['doanh thu tháng này']} />
        <CardThree data={dataAnalytics} data2={dataAnalytics2} />
        <CardFour data={dataAnalytics.users} />
      </div>

      <MonthlyRevenue data={dataAnalytics2} />

      <BarChartSimple data={dataAnalytics} />
    </>
  )
}

export default FeatureDashboard
