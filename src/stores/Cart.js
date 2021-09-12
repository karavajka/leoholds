import { types } from 'mobx-state-tree';

const Item = types
  .model('Item', {
    id: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    priceOptions: types.optional(types.array(types.frozen()), []),
    link: types.frozen(),
    image: types.frozen(),
    action_id: types.maybeNull(types.number),
  })
  .actions((self) => ({
    putOptions(options) {
      self.priceOptions = options;
    },
  }));

const Cart = types
  .model('Cart', {
    isLoading: types.optional(types.boolean, false),
    itemsList: types.optional(types.array(Item), []),
    errors: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    addToLocalStorage() {
      const stringifyList = JSON.stringify(self.itemsList);
      localStorage.setItem('leoholds_cart', stringifyList);
      localStorage.setItem('leoholds_cart_items', self.itemsList.length);
    },

    getFromLocalStorage() {
      return JSON.parse(localStorage.getItem('leoholds_cart'));
    },

    putToCart(items: array) {
      items.forEach((item) => {
        self.addToCart(item);
      });
    },

    addToCart(item: typeof Item) {
      const existingItem = self.itemsList.find(
        ({ action_id }) => action_id === item.action_id
      );

      if (existingItem) return;

      self.itemsList.push(item);
      self.addToLocalStorage();
    },

    deleteFromCart(actionId) {
      self.itemsList = self.itemsList.filter(
        ({ action_id }) => action_id !== actionId
      );

      self.addToLocalStorage();
    },

    updateCartItem(actionId, optionAmount) {
      const existingItem = self.itemsList.find(
        ({ action_id }) => action_id === actionId
      );

      if (existingItem) {
        const priceOptions = existingItem.priceOptions[0];

        const newPriceOptions = {
          number: priceOptions.number,
          price: priceOptions.price,
          amount: optionAmount,
        };

        const index = self.itemsList.indexOf(existingItem);

        if (index !== -1) {
          self.itemsList[index].priceOptions[0] = newPriceOptions;
          self.addToLocalStorage();
        }
      }
    },
  }))
  .views((self) => ({}));

export { Cart };
