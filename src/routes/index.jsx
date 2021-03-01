import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "../components/Main";

import Page from "../components/Page";
import Layout from '../layouts/index';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Page} />
      <Route exact path="/main" component={Main} />
    </Switch>
  </Layout>
)

export default Routes;
