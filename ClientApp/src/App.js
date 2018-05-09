﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

// Containers as route
import Home from './containers/Home';
import ProjectOnMap from './containers/ProjectOnMap';
import Project from './containers/Project';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/projectonmap" component={ProjectOnMap} />
    <Route path="/project/:id" component={Project} />
  </Layout>
);
