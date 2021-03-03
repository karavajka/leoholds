import { types } from "mobx-state-tree";

import { Set} from "./Set";

const SetsDB = types
  .model("SetsDB", {
    list: types.optional(types.map(Set), {})
  })
  .actions(self => ({
    put(set) {
      let newSet = { ...set };
      const oldSet = self.get(set.id);

      if (oldSet) {
        newSet = Object.assign(oldSet, newSet);
      }
      return self.list.put(newSet);
    },

    get(id) {
      return self.list.get(id.toString());
    },

    byIds(ids) {
      return ids.map(self.get);
    },
  }))
  .views(self => ({}));

  export { SetsDB };
