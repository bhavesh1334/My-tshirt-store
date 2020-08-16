/** @format */

import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError({ error: data.error });
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  console.log('API IS ', API);
  return (
    <Base
      title='Welcome to Tshirt Store'
      description='Here you can get collection of tees far from your imagination'>
      <div className='row text-center'>
        <h1 className='text-white'> T-shirts</h1>
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div key={index} className='col-4 mb-4'>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
