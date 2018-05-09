import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

// Containers as route
import Home from './containers/Home';
import ProjectList from './containers/ProjectList';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/projectlist" component={ProjectList} />
  </Layout>
);
