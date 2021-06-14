import { types } from "mobx-state-tree";

const Item = types
.model("Item", {
  id: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  priceOptions: types.optional(types.array(types.frozen()), []),
  link: types.frozen(),
  image: types.frozen(),
})
.actions(self => ({
  putOptions(options) {
    self.priceOptions = options
  }
}))


const Cart = types
  .model("Cart", {
    isLoading: types.optional(types.boolean, false),
    itemsList: types.optional(types.array(Item), []),
    errors: types.optional(types.boolean, false),

  })
  .actions(self => ({

    addToCart(item: typeof Item) {
      return self.itemsList.push(item);
    },

    deleteFromCart(itemIndex, optionNumber) {

      const options = self.itemsList[itemIndex].priceOptions.filter(
        ({ number }) => number !== optionNumber
      );

      console.log('options:', options)

      self.itemsList[itemIndex].putOptions(options)
    },


  })).views(self => ({}));

  export { Cart };

