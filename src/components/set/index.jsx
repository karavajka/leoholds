import React, { useState, Fragment } from "react";
import { observer, inject } from "mobx-react";

const PriceCheckbox = ({option, index, onSetSelectedAll, isSelectedAll, onSelectedPriceOptions}) => {
  const [isSelected, setSelected] = useState(false);

  function onCheckOption(e) {
    console.log(e.target.dataset.price, e.target.checked);
    const {price, number} = e.target.dataset

    if(!e.target.checked && isSelectedAll)  onSetSelectedAll(false);
    
    setSelected(!isSelected);
    onSelectedPriceOptions({number: number, price: price});
  }

  return (
    <>
      <input className="hidden-input" 
        type="checkbox" 
        id={`${option}-${index}`} 
        data-price={option}
        data-number={index+1} 
        onChange={onCheckOption} 
        checked={isSelectedAll || isSelected}  />
      <label className="price-checkbox-label" htmlFor={`${option}-${index}`}>{index + 1}</label>
    </>
  )
}

const SetPage = (props) => {
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [selectedPriceOptions, setSelectedPriceOptions] = useState([]);
  const [isError, setIsError] = useState(false);
 
  function onSetSelectedAll(value) {
    setSelectedAll(value);
  }

  function toggleSelestedAll() {
    setSelectedAll(!isSelectedAll);
    setIsError(false);
  }

  function onSelectedPriceOptions(value) {
    setIsError(false);
    let existingPriceOptions = [];
    
    if (selectedPriceOptions.find(option => option.number === value.number)) {
      existingPriceOptions = selectedPriceOptions.filter(option => option.number !== value.number);
     
      return setSelectedPriceOptions(existingPriceOptions);
    }

    existingPriceOptions = [...selectedPriceOptions, value];
    setSelectedPriceOptions(existingPriceOptions);
  }

  function getPriceValue(set) {
    if (isSelectedAll) return `${set.price} за весь набір`;
    if (!isSelectedAll && selectedPriceOptions.length === 0) return `${set.price} за набір`;
    if (!isSelectedAll) {
      let sum = 0;
      selectedPriceOptions.forEach( option => {
        sum = sum + +option.price
      })
      return sum;
    }
  }

  function onSubmit() {
    const link = props.location.pathname;
    const set = props.sets_db.get(props.match.params.id);
    const priceOptions = !set.priceOptions || (set.priceOptions && isSelectedAll) ? [{ number: 'all', price: set.price }] : selectedPriceOptions;

    if (priceOptions.length > 0) {
      const data = {
        setId: set.id,
        priceOption: priceOptions,
        setImage: set.imagesCollection.items[0].url,
        link: link
      };
      console.log('submit data:', data);
    } else setIsError(true);
  }

  const set = props.sets_db.get(props.match.params.id);

  if (props.collection.isLoading) return 'Loading...'

  if(!set && !props.collection.isLoading) return 'Not found'

  const arrayOfPriceOptions = set.priceOptions && set.priceOptions.split(', ');

    return(
      <div className="set">
        <h1>{set.title}</h1>
        <div className="set__content">
          <div className="set__image-wrapper">
            <img src={set.imagesCollection.items[0].url} alt={set.title} />
          </div>
          <div className="set__info">
            <div className="set__info--price">ціна: {getPriceValue(set)}</div>

            {set.priceOptions && <fieldset className="set__info--price-option">
              <legend className={`${isError ? 'error' : ''}`}>виберіть зачіпку:</legend> 
              {arrayOfPriceOptions.map((option, index) => (
                <PriceCheckbox key={index} 
                  option={option} 
                  index={index} 
                  onSetSelectedAll={onSetSelectedAll} 
                  isSelectedAll={isSelectedAll}
                  onSelectedPriceOptions={onSelectedPriceOptions}
                />
              ))}
              <button className={`btn-checkbox-label${isSelectedAll ? ' active' : ''}`} 
                type="button" 
                onClick={toggleSelestedAll}
              >
                весь набір
              </button>
            </fieldset>}
            <button className="btn-primary" type="button" onClick={onSubmit}>В кошик</button>
          </div>
        </div>
        {set.description && <div>{set.description}</div>}
      </div>
    )
}

export default inject("sets_db", "collection")(observer(SetPage));
