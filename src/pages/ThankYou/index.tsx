import React from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const searchParams = new URLSearchParams(location.search);
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_CardType = searchParams.get('vnp_CardType');
    const vnp_PayDate = searchParams.get('vnp_PayDate');    
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
  return (
    <div className="flex items-center mx-auto justify-center h-screen">
    <div className="p-1 rounded shadow-lg min-w-96 bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
      <div className="flex flex-col items-center p-4 space-y-2 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-bold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Thank You !</h1>
            <div className='min-w-60'>
                <h2>Thông tin đơn hàng</h2>
                <p><b>OrderInfo: </b>{vnp_TxnRef}</p>
                <p><b>BankCode:</b> {vnp_BankCode}</p>
                <p><b>Amount:</b> {vnp_Amount}</p>
                <p><b>CardType:</b> {vnp_CardType}</p>
                <p><b>PayDate:</b> {vnp_PayDate}</p>
                <p><b>Status:</b> {vnp_TransactionStatus==="00" && "Thành công !"}</p>
            </div>
        <a
          className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <button onClick={()=>accessToken?navigate('../../order'):navigate('../../order/guest')} className="text-sm font-medium">
            order
            
          </button>
        </a>
      </div>
    </div>
  </div>
  )
}

export default ThankYou