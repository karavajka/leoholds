import { types, getRoot } from 'mobx-state-tree';

const API_BASE_URL = 'https://graphql.contentful.com';
const API_SPACE_ID = 'fvvee9f7jis0';
const API_TOKEN = 'pegKIqK-Acqf8h9fn8nYNKcWn9_7GMN47QiWTYtpJpQ';

const Collection = types
  .model('Collection', {
    isLoading: types.optional(types.boolean, false),
    id: types.maybeNull(types.string),
    listIds: types.optional(types.array(types.string), []),
    errors: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    async fetchCollection(idCollection) {
      const { sets_db } = getRoot(self);

      self.isLoading = true;
      self.errors = false;

      if (idCollection !== self.id) {
        self.clearListIds();
        self.id = idCollection;

        const queryParam = self.makeQueryParam(idCollection);
        const query = self.makeQuery(queryParam);

        const response = await fetch(
          `${API_BASE_URL}/content/v1/spaces/${API_SPACE_ID}/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({ query }),
          }
        );

        if (response.ok) {
          const { data } = await response.json();

          // console.log("data:", data)
          let itemsArray;
          if (queryParam === 'structureCollection')
            itemsArray = data.structureCollection.items;
          if (queryParam === 'lSetCollection')
            itemsArray = data.lSetCollection.items;

          itemsArray.forEach((item) => {
            sets_db.put(item);
            self.pushToList(item.id);
          });
        } else self.setErrors();
      }
      self.stopLoading();
    },

    pushToList(id) {
      self.listIds.push(id);
    },

    clearListIds() {
      self.listIds = [];
    },

    stopLoading() {
      self.isLoading = false;
    },

    setErrors() {
      self.errors = true;
    },

    makeQueryParam(type) {
      if (type === 'structures') return 'structureCollection';
      if (type === 'lcollection') return 'lSetCollection';
    },

    makeQuery(queryParam) {
      return `
              {
                ${queryParam} {
                  items {
                    id
                    title
                    imagesCollection {
                      items {
                        url
                      }
                    }
                    price
                    priceOptions
                    description
                  }
                }
              }
            `;
    },
  }))
  .views((self) => ({}));

export { Collection };
