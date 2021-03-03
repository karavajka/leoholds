import { types, getRoot } from "mobx-state-tree";

const API_BASE_URL = 'https://graphql.contentful.com';
const API_SPACE_ID = 'fvvee9f7jis0';
const API_TOKEN = 'pegKIqK-Acqf8h9fn8nYNKcWn9_7GMN47QiWTYtpJpQ';

const query = `
  {
    structureCollection {
      items {
        id
        title
        imageCollection {
          items {
            url
          }
        }
        price
        priceOptionsText
        description
      }
    }
  }
`

const Collection = types
  .model("Collection", {
    isLoading: types.optional(types.boolean, false),
    id: types.maybeNull(types.string),
    listIds: types.optional(types.array(types.string), []),
  })
  .actions(self => ({

    async fetchCollection(idCollection) {
      const { sets_db } = getRoot(self);
      self.isLoading = true;
      self.id = idCollection;

      const response = await fetch(`${API_BASE_URL}/content/v1/spaces/${API_SPACE_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      })
  
      if (response.ok) {
        const { data } = await response.json();

        console.log("data:", data.structureCollection.items)
        data.structureCollection.items.forEach(item => {
          sets_db.put(item);
          self.pushToList(item.id);
        });
      }
      self.stopLoading()
    },

    pushToList(id) {
      self.listIds.push(id);
    },

    stopLoading() {
      self.isLoading = false;
    },

  }))
  .views(self => ({}));

  export { Collection };
