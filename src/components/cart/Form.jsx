import React from 'react';
import { useForm } from '@formspree/react';

import { isEmpty } from '../../utils/global';

const HiddenInput = ({ item }) => {
  const options = item.priceOptions[0];
  const price = +options.price * +options.amount;
  const value = `Назва: ${item.title}, зачіпка №: ${options.number}, кількість: ${options.amount}шт., ціна:${price} грн. `;

  return (
    <>
      <input
        className="hidden-input"
        type="text"
        name={`${item.title}, №: ${options.number}`}
        value={value}
        readOnly
      />
      <input
        className="hidden-input"
        type="text"
        name={`${item.title}, №: ${options.number} link`}
        value={item.link}
        readOnly
      />
    </>
  );
};

const Form = ({ cartItems, summ }) => {
  const [state, handleSubmit] = useForm('mayadgzl');

  console.log(process.env);

  console.log(cartItems);

  if (state.succeeded) {
    return (
      <div>
        Замовлення відправлено. Найближчим часом з Вами зв'яжеться наш менеджер
        за вказаним Вами телефоном.
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!isEmpty(cartItems) &&
          cartItems.map((item, index) => (
            <HiddenInput key={index} item={item} />
          ))}
        {!isEmpty(cartItems) && (
          <input
            className="hidden-input"
            type="text"
            name="Загальна сума"
            value={`Загальна сума: ${summ} грн.`}
            readOnly
          />
        )}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Телефон</label>
          <input id="phone" type="text" name="tel" />
        </div>

        <div className="input-group">
          <label htmlFor="message">Повідомлення</label>
          <textarea
            type="text"
            id="message"
            name="massage"
            placeholder="Додайте повідомлення"
          />
        </div>
        <button
          className="btn-primary"
          type="submit"
          disabled={state.submitting}
        >
          Підтвердити
        </button>
      </form>
    </div>
  );
};

export default Form;
