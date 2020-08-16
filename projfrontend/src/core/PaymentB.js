/** @format */

import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/CartHelper';
import { isAuthenticated } from '../auth/helper';
import { createOrder } from './helper/OrderHelper';
import { getMeToken, processPayment } from './helper/paymentHelper';
import DropIn from 'braintree-web-drop-in-react';
import { Link } from 'react-router-dom';

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      //console.log('INFORMATIONs', info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken: clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className='btn btn-block btn-success' onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please add item to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log('PAYMENT SUCCESS');
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log('Did we got crash?');
          });
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ ...info, success: false, loading: false });
          console.log('PAYMENT FAILED');
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h1>Your bill is ${getAmount()}</h1>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentB;
