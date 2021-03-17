import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

const SetPage = (props) => {
  const [page, setPage] = useState([]);

  useEffect(() => {
  }, []);
console.log(props);

const set = props.sets_db.get(props.match.params.id);
console.log('set', set);

    return(
      <div>
        <div>{set.title}</div>
        <div>price: {set.price}</div>
        {set.priceOptions && <div>price option: {set.priceOptions}</div>}
        {set.description && <div>{set.description}</div>}
        <img src={set.imagesCollection.items[0].url} alt="" />
      </div>
    )
}

export default inject("sets_db")(observer(SetPage));