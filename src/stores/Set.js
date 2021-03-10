import { types } from "mobx-state-tree";

const Set = types
  .model("Set", {
    isLoading: false,
    id: types.optional(types.identifier, "set"),
    title: types.maybeNull(types.string),
    imagesCollection: types.frozen(),
    // imageList: types.optional(types.array(types.string), []),
    price: types.maybeNull(types.number),
    priceOptions: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
  })
  .actions(self => ({
  }))
  .views(self => ({}));

export { Set };
