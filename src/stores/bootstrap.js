import { types } from "mobx-state-tree";

import * as Stores from "./";

const RootStore = types.model("RootStore", {
  set: types.optional(Stores.Set, {}),
  sets_db: types.optional(Stores.SetsDB, {}),
  collection: types.optional(Stores.Collection, {}),
  cart: types.optional(Stores.Cart, {}),
});

function createStores({ snapshot, ...deps }): IRootStoreType {
  return RootStore.create(snapshot, deps);
}

export { createStores };
