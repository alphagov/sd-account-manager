import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import Landing from './components/Landing';

const Routes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Container>
          <Route exact path="/" component={Landing} />
        </Container>
      </Fragment>
    </BrowserRouter>
  );
};

export default Routes;
