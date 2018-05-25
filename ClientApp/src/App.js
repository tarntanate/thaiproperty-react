import React from 'react';
import { Route } from 'react-router';

// Components
import Layout from './components/Layout';

// Containers as route
import Home from './containers/Home';
import ProjectsOnMap from './containers/ProjectsOnMap';
import PostList from './containers/PostList';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/projects/map" component={ProjectsOnMap} />
    <Route path="/list/:id" component={PostList} />
  </Layout>
);
