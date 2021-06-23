import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const PriceOption = ({
  option,
  removeOption,
  changeAmount,
  link,
  linkTitle,
}) => {
  const [amount, setAmount] = useState(option.amount);

  function onRemoveOption() {
    removeOption(option);
  }

  function getSum() {
    const price = +option.price;
    return price * amount;
  }

  function onChange(event) {
    setAmount(event.target.value.trim());
    changeAmount(event.target.value.trim());
  }

  return (
    <>
      <span className="item-name">
        {link && <Link to={link}>{linkTitle}</Link>}
        {option.number === 'all' ? 'Весь набір' : `Зачіпка №${option.number}`}
      </span>
      <span className="price">{option.price}грн.</span>

      <span className="amount">
        <input
          type="number"
          min="1"
          max="50"
          defaultValue={option.amount}
          onChange={onChange}
        />
      </span>

      <span className="sum">{getSum()} грн.</span>
      <span className="adds">
        <button
          className="btn-delete"
          type="button"
          title="Видалити"
          onClick={onRemoveOption}
        />
        <i className="fa-solid fa-xmark"></i>
      </span>
    </>
  );
};

const CartItem = ({ item, index, cart, changeSum }) => {
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

  function changeOptionAmount(optionAmount) {
    cart.updateCartItem(index, optionAmount);
    changeSum();
  }

  return (
    currentOptions.length > 0 && (
      <li>
        <span className="nomber">{index + 1}.</span>

        {currentOptions.map((option) => (
          <PriceOption
            key={option.number}
            option={option}
            removeOption={removeOption}
            changeAmount={changeOptionAmount}
            link={currentItem.link}
            linkTitle={currentItem.title}
          />
        ))}
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

  function changeSum() {
    setCartItems(cart.itemsList);
    onSetSumm();
  }

  return (
    <div>
      <h1>Кошик</h1>
      <ul className="cart-list">
        <li>
          <span className="nomber" />
          <div className="item-name">
            <strong>Найменування</strong>
          </div>
          <div className="price">
            <strong>Ціна</strong>
          </div>
          <div className="amount">
            <strong>Кількість</strong>
          </div>
          <div className="sum">
            <strong>Сума</strong>
          </div>
          <div className="adds" />
        </li>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            index={index}
            item={item}
            cart={cart}
            changeSum={changeSum}
          />
        ))}
      </ul>
      <div className="total-price">
        <h3>
          <strong>Загальна сума: </strong>
        </h3>
        <div>{summ} грн.</div>
      </div>
    </div>
  );
};

export default inject('cart')(observer(Cart));
