async function getCollectionPage({ collection }, match) {
  const currentCollectionId = match.params.idCollection;
  const storeCollectionId = collection.id;
  if (currentCollectionId !== storeCollectionId ) await collection.fetchCollection(currentCollectionId);
}

export {
  getCollectionPage,
};
