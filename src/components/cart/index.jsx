import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, index, onSetSumm }) => {
  console.log(item);
  return (
    <li>
      <Link to={item.link}>{item.title}</Link>
      <div>
        {item.priceOptions.map((option) => (
          <div key={option.number}>
            <span>
              {option.number === 'all'
                ? 'Весь набір: '
                : `Зачіпка №${option.number}: `}
            </span>
            <span>{option.price}грн.</span>
          </div>
        ))}
      </div>
    </li>
  );
};

const Cart = ({ cart }) => {
  const [summ, setSumm] = useState(0);

  useEffect(() => {
    onSetSumm();
  });

  function onSetSumm() {
    let total = 0;
    cart.itemsList.map((item) =>
      item.priceOptions.forEach((option) => {
        total = total + +option.price;
      })
    );
    console.log(total);
    setSumm(total);
  }

  return (
    <div>
      Cart
      <ul>
        {cart.itemsList.map((item, index) => (
          <CartItem
            key={index}
            index={index}
            item={item}
            onSetSumm={onSetSumm}
          />
        ))}
      </ul>
      <h3>Сума: </h3>
      <div>{summ}</div>
    </div>
  );
};

export default inject('cart')(observer(Cart));
