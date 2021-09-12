async function getCollectionPage({ collection }, match) {
  const currentCollectionId = match.params.idCollection;
  const storeCollectionId = collection.id;
  if (currentCollectionId !== storeCollectionId)
    await collection.fetchCollection(currentCollectionId);
}

async function getSetPage({ sets_db, collection }, match) {
  const currentSetId = match.params.id;
  const storeSet = sets_db.get(currentSetId);

  if (!storeSet || storeSet.id !== currentSetId) {
    const currentCollectionId = match.params.idCollection;
    await collection.fetchCollection(currentCollectionId);
  }
}

function getCart({ cart }) {
  if (localStorage.leoholds_cart_items > 0) {
    const listItems = cart.getFromLocalStorage();

    cart.putToCart(listItems);
  }
}

export { getCollectionPage, getSetPage, getCart };
