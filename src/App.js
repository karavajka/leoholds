import React, { useEffect } from "react";
import { withRouter, matchPath } from "react-router-dom";

import Routes from './routes';
import { ROUTES} from "./utils/constants";
import * as mountApi from "./routes/routerApiMount";
import * as unmountApi from "./routes/routerApiUnmount";

const route = (pathname, loader, exact = false) => [
  {
    path: pathname,
    exact
  },
  loader
];

const routes = [
  route(ROUTES.setPage, mountApi.getSetPage),
  route(ROUTES.collectionPage, mountApi.getCollectionPage),
]

const App = ({ history, stores }) => {
  function mount() {
    for (const [config, load] of routes) {
      const match = matchPath(history.location.pathname, config);
      if (match) {
        load(stores, match);

        return () => {
          unmountApi[load.name] && unmountApi[load.name](stores, match);
        };
      }
    }
  }

  useEffect(mount, [mount]);

  return <Routes />
}

export default withRouter(App);
