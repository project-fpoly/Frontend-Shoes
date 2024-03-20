 


export const  formatCurrency = (money: number)=>{
        const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
     return   new Intl.NumberFormat('vi-VN', config).format(money);
    }