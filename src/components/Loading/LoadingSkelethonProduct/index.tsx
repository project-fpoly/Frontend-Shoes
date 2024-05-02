import { Skeleton } from 'antd'
import style from './index.module.scss'
const LoadingSkelethon = () => {
  return (
    <div className={style.containerSkelethon}>
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>{' '}
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>{' '}
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>{' '}
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>{' '}
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>{' '}
      <div>
        <div className="w-[451px] h-[220px] bg-[#e5e7eb] mb-5 rounded-md"></div>
        <Skeleton className="w-[335px]" paragraph={{ rows: 2 }} />
      </div>
    </div>
  )
}

export default LoadingSkelethon
