import React, { useEffect, useState } from 'react';
import { Card, Space, Typography, notification, Row, Col, Select } from 'antd';
import { saleFilterProducts } from '../../services/productsQuery';
import { IProduct } from '../../common/products';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { IStateProduct } from '../../common/redux/type';
import { fetchAllProducts, fetchProductsByPriceLowOrHight } from '../../features/product';
import clsx from 'clsx';
import { GrTransaction } from 'react-icons/gr';
import Sidebar from '../../components/GreaUp/Sidebar';
import LoadingSkelethon from '../../components/Loading/LoadingSkelethonProduct';
import ListProduct from '../../components/Sale/Products';

const { Meta } = Card;

const Sale = () => {
  const dispact = useDispatch<AppDispatch>();
  const shoes = useSelector((state: IStateProduct) => state.product.products);
  const loading = useSelector((state: IStateProduct) => state.product.loading);

  const [hideFilter, setHideFilter] = useState<boolean>(true);

  useEffect(() => {
    dispact(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }));
    document.title = 'Greaup';
  }, []);

  const handleChange = (value: string) => {
    switch (value) {
      case 'Newest':
        break;
      case 'High-Low':
        dispact(fetchProductsByPriceLowOrHight('desc'));
        break;
      case 'Low-High':
        dispact(fetchProductsByPriceLowOrHight('asc'));
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-10">

      <Typography style={{ fontSize: 24, fontWeight: 500 }} className='mt-5'>Sale Shoes</Typography>

      <span className={clsx('flex gap-5 justify-end mr-5 mb-5')}>
        <p
          onClick={() => setHideFilter(!hideFilter)}
          className="flex gap-2 cursor-pointer "
          
        >
          {hideFilter ? 'Hide filter' : 'Show filter'}
          <button style={{backgroundColor:"transparent"}}>
            <GrTransaction className="mt-1" size={20} />
          </button>
        </p>

        <button style={{backgroundColor:"transparent"}}>Sort by :</button>
        <Select
          defaultValue="Options"
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            {
              value: 'Newest',
              label: 'Newest',
            },
            {
              value: 'High-Low',
              label: 'Price: High-Low',
            },
            {
              value: 'Low-High',
              label: 'Price: Low-High',
            },
          ]}
        />
      </span>
      <div className="flex">
        <div className="w-[auto] ">
          <Sidebar hideFilter={hideFilter} />
        </div>

        {loading === 'pending' ? (
          <>
            <div className="flex justify-center items-center mt-16">
              <LoadingSkelethon></LoadingSkelethon>
            </div>
          </>
        ) : (
          <>
            <div className="w-[100%]  ">
              <ListProduct
                shoes={shoes}
                hideFilter={hideFilter}
                setHideFilter={setHideFilter as any}
              ></ListProduct>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sale;
