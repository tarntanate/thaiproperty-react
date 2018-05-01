import React from 'react';
import { Route } from 'react-router';
import Layout from './UI/Layout';
import Home from './components/Home';
import ProjectList from './components/ProjectList';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/projectlist" component={ProjectList} />
  </Layout>
);
