import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

const SetCard = ({set}) => (
  <article className="collection-card">
    <div className="collection-card--content">
      <div className="collection-card__image-wrapper">
        <div className="collection-card__image">
          <img src={set.imagesCollection.items[0].url} alt={set.tittle} />
        </div>
      </div>
        <div className="collection-card__title"><h3>{set.title}</h3></div>
        <div>{set.price} грн</div>
        <div>Цена за набор</div>
        <button type="button">Купить</button>
        {set.priceOptions && <div>купить поштучно >></div>}
    </div>
  </article>
)

const Collection = (props) => {
  // const [page, setPage] = useState([]);

  useEffect(() => {
    const idCollection = props.match.params.idCollection;
    props.collection.fetchCollection(idCollection);
  }, []);

  if (props.collection.isLoading) {
    return 'Loading...'
  }

  const setsList = props.sets_db.byIds(props.collection.listIds);

  return(
    <>
      <h1>Collection</h1>
      <div className="collection-content">
        {setsList.map((set, index) => <SetCard key={index} set={set} />)}
      </div>
    </>
  )
}

export default inject("collection", "sets_db")(observer(Collection));
