import React, { useState, Fragment } from 'react';
import { observer, inject } from 'mobx-react';

import { is } from '../../utils/global';

const PriceCheckbox = ({
  option,
  index,
  setSelectedAll,
  isSelectedAll,
  onSelectedPriceOptions,
  selectedPriceOptions,
  removeError,
}) => {
  function onCheckOption(e) {
    const { price, number } = e.target.dataset;
    removeError();

    if (isSelectedAll) setSelectedAll(false);

    onSelectedPriceOptions({ number: number, price: price, amount: 1 });
  }

  return (
    <>
      <input
        className="hidden-input"
        type="radio"
        id={`${option}-${index}`}
        data-price={option}
        data-number={index + 1}
        value={option}
        name="option"
        onChange={onCheckOption}
        defaultChecked={isSelectedAll && false}
      />
      <label className={`price-checkbox-label`} htmlFor={`${option}-${index}`}>
        {index + 1}
      </label>
    </>
  );
};

const SetPage = (props) => {
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [selectedPriceOptions, setSelectedPriceOptions] = useState([]);
  const [isError, setIsError] = useState(false);

  function removeError() {
    setIsError(false);
  }

  function onSelectedPriceOptions(value) {
    setIsError(false);
    setSelectedPriceOptions(value);
  }

  function getPriceValue(set) {
    if (isSelectedAll) return `${set.price} грн. за весь набір`;
    if (!isSelectedAll && is(selectedPriceOptions.length, 0))
      return `${set.price} грн.`;
    if (!isSelectedAll) {
      return `${selectedPriceOptions.price} грн. за зачіпку`;
    }
  }

  function onSubmit() {
    const link = props.location.pathname;
    const set = props.sets_db.get(props.match.params.id);
    const priceOptions = !set.priceOptions
      ? { number: 'all', price: set.price, amount: 1 }
      : selectedPriceOptions;

    if (priceOptions.number) {
      const data = {
        id: set.id,
        priceOptions: [priceOptions],
        image: set.imagesCollection.items[0].url,
        link: link,
        title: set.title,
      };

      props.cart.addToCart(data);
      clearInputs();
    } else setIsError(true);
  }

  function clearInputs() {
    setSelectedPriceOptions([]);
  }

  function onCheckOption(e) {
    const { price, number } = e.target.dataset;

    if (is(number, 'clear-options')) {
      isSelectedAll && setSelectedAll(false);
      return;
    } else {
      removeError();
      if (e.target.checked) setSelectedAll(true);

      onSelectedPriceOptions({ number: number, price: price, amount: 1 });
    }
  }

  const set = props.sets_db.get(props.match.params.id);

  if (props.collection.isLoading) return 'Loading...';

  if (!set && !props.collection.isLoading) return 'Not found';

  const arrayOfPriceOptions = set.priceOptions && set.priceOptions.split(', ');

  return (
    <div className="set">
      <h1>{set.title}</h1>
      <div className="set__content">
        <div className="set__image-wrapper">
          <img src={set.imagesCollection.items[0].url} alt={set.title} />
        </div>
        <div className="set__info">
          <div className="set__info--price">ціна: {getPriceValue(set)}</div>

          {set.priceOptions && (
            <fieldset className="set__info--price-option">
              <legend className={`${isError ? 'error' : ''}`}>
                виберіть зачіпку:
              </legend>
              {arrayOfPriceOptions.map((option, index) => (
                <PriceCheckbox
                  key={index}
                  option={option}
                  index={index}
                  setSelectedAll={setSelectedAll}
                  isSelectedAll={isSelectedAll}
                  onSelectedPriceOptions={onSelectedPriceOptions}
                  selectedPriceOptions={selectedPriceOptions}
                  removeError={removeError}
                />
              ))}
              <input
                className="hidden-input"
                type="radio"
                id="all"
                data-price={set.price}
                data-number="all"
                value={set.price}
                name="option"
                onChange={onCheckOption}
              />
              <label className="price-checkbox-label wide" htmlFor="all">
                весь набір
              </label>
            </fieldset>
          )}
          {/* Input & label to clear selectedPriceOptions */}
          <input
            className="hidden-input"
            type="radio"
            id="clear-options"
            data-price="clear-options"
            data-number="clear-options"
            value="clear-options"
            name="option"
            onChange={onCheckOption}
          />
          <button
            className="btn-primary with-out-paddigs"
            type="button"
            onClick={onSubmit}
          >
            <label htmlFor="clear-options" className="clear-option-label">
              В кошик
            </label>
          </button>
        </div>
      </div>
      {set.description && <div>{set.description}</div>}
    </div>
  );
};

export default inject('sets_db', 'collection', 'cart')(observer(SetPage));
