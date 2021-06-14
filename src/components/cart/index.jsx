import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const PriceOption = ({ option, removeOption }) => {
  function onRemoveOption() {
    removeOption(option);
  }
  return (
    <div>
      <span>
        {option.number === 'all'
          ? 'Весь набір: '
          : `Зачіпка №${option.number}: `}
      </span>
      <span>{option.price}грн.</span>
      <button type="button" onClick={onRemoveOption}>
        Видалити
      </button>
    </div>
  );
};

const CartItem = ({ item, index, cart }) => {
  const [currentItem, setCurrentItem] = useState({});
  const [currentOptions, setcurrentOptions] = useState([]);
  console.log(item);

  useEffect(() => {
    setCurrentItem(item);
    setcurrentOptions(item.priceOptions);
  }, [item]);

  function removeOption(option) {
    cart.deleteFromCart(index, option.number);
    const options = currentOptions.filter(
      (item) => item.number !== option.number
    );
    setcurrentOptions(options);
  }

  return (
    currentOptions.length > 0 && (
      <li>
        {currentItem.link && (
          <Link to={currentItem.link}>{currentItem.title}</Link>
        )}
        <div>
          {currentOptions.map((option) => (
            <PriceOption
              key={option.number}
              option={option}
              removeOption={removeOption}
            />
          ))}
        </div>
      </li>
    )
  );
};

const Cart = ({ cart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [summ, setSumm] = useState(0);

  useEffect(() => {
    if (cart.itemsList.length > 0) {
      setCartItems(cart.itemsList);
      onSetSumm();
    }
  }, [cart.itemsList]); // eslint-disable-line

  function onSetSumm() {
    let total = 0;
    cart.itemsList.map((item) =>
      item.priceOptions.forEach((option) => {
        let optionPrice = +option.price * option.amount;
        total = total + optionPrice;
      })
    );
    console.log(total);
    setSumm(total);
  }

  return (
    <div>
      <h1>Кошик</h1>
      <ul>
        {cartItems.map((item, index) => (
          <CartItem key={index} index={index} item={item} cart={cart} />
        ))}
      </ul>
      <h3>Сума: </h3>
      <div>{summ}</div>
    </div>
  );
};

export default inject('cart')(observer(Cart));
