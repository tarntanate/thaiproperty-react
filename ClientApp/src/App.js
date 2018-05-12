import React from 'react';
import { Route } from 'react-router';

// Components
import Layout from './components/Layout';
import PostList from './components/PostList/Post';

// Containers as route
import Home from './containers/Home';
import ProjectOnMap from './containers/ProjectOnMap';
import Project from './containers/Project';

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/projectonmap" component={ProjectOnMap} />
    <Route path="/project/:id" component={Project} />
    <Route path="/post/:id" component={Project} />
    <Route path="/postlist" component={PostList} />
  </Layout>
);
