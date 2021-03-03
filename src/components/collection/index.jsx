import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

const SetCard = ({set}) => (
  <div>
    <div>
      <img src={set.imageCollection.items[0].url} alt={set.tittle} />
    </div>
    <div>
      <div>{set.title}</div>
      <div>{set.price} грн</div>
    </div>
  </div>
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
    <div>Collection
      {setsList.map((set, index) => <SetCard key={index} set={set} />)}
    </div>
  )
}

export default inject("collection", "sets_db")(observer(Collection));
