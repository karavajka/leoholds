import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from '../components/Page';
import Layout from '../layouts/index';
import Collection from '../components/collection';
import SetPage from '../components/set';
import Cart from '../components/cart';
import { ROUTES } from '../utils/constants';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path={ROUTES.root} component={Page} />
      <Route exact path={ROUTES.collectionPage} component={Collection} />
      <Route exact path={ROUTES.setPage} component={SetPage} />
      <Route exact path={ROUTES.checkout} component={Cart} />
    </Switch>
  </Layout>
);

export default Routes;
