import React from "react";
import { Switch, Route } from "react-router-dom";

import Page from "../components/Page";
import Layout from '../layouts/index';
import Collection from "../components/collection";
import Main from "../components/Main";
import { ROUTES } from "../utils/constants";

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path={ROUTES.root} component={Page} />
      <Route exact path="/main" component={Main} />
      <Route exact path={ROUTES.collectionPage} component={Collection} />
    </Switch>
  </Layout>
)

export default Routes;
