import React, { useState, useEffect, Fragment } from "react";
import { observer, inject } from "mobx-react";

const PriceCheckbox = ({option, index, onSetSelectedAll, isSelectedAll}) => {
  const [isSelected, setSelected] = useState(false);

  function onCheckOption(e) {
    console.log(e.target.dataset.price, e.target.checked);

    if(!e.target.checked && isSelectedAll) {
      onSetSelectedAll(false);
    }
    setSelected(!isSelected);
  }

  return (
    <>
    <input className="hidden-input" 
      type="checkbox" 
      id={`${option}-${index}`} 
      data-price={option} 
      onChange={onCheckOption} 
      checked={isSelectedAll || isSelected}  />
    <label className="price-checkbox-label" htmlFor={`${option}-${index}`}>{index + 1}</label></>
  )
}

const SetPage = (props) => {
  const [isSelectedAll, setSelectedAll] = useState(false);
  
  useEffect(() => {
  }, []);
  console.log(props);

  function onSetSelectedAll(value) {
    setSelectedAll(value);
  }

  function toggleSelestedAll() {
    setSelectedAll(!isSelectedAll);
  }

  const set = props.sets_db.get(props.match.params.id);
  const arrayOfPriceOptions = set.priceOptions.split(', ');
  
  console.log('set', set);

    return(
      <div className="set">
        <h1>{set.title}</h1>
        <div className="set__content">
          <div className="set__image-wrapper">
            <img src={set.imagesCollection.items[0].url} alt={set.title} />
          </div>
          <div className="set__info">
            <div className="set__info--price">ціна: {set.price}</div>

            {set.priceOptions && <fieldset className="set__info--price-option">
              <legend>виберіть зачіпку:</legend> 
                {arrayOfPriceOptions.map((option, index) => (
                  <PriceCheckbox key={index} 
                    option={option} 
                    index={index} 
                    onSetSelectedAll={onSetSelectedAll} 
                    isSelectedAll={isSelectedAll}
                  />
                ))}
                  <button className={`btn-checkbox-label${isSelectedAll ? ' active' : ''}`} type="button" onClick={toggleSelestedAll}>весь набір</button>
            </fieldset>}
            <button className="btn-primary" type="button">В кошик</button>
          </div>
        </div>
        {set.description && <div>{set.description}</div>}
      </div>
    )
}

export default inject("sets_db")(observer(SetPage));