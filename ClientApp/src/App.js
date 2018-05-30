import React from 'react';
// import { Route } from 'react-router';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Containers as route
import PostDetail from './containers/PostDetail';
import ProjectsOnMap from './containers/ProjectsOnMap';
import PostList from './containers/PostList';

export default (props) => (
    <Router>
        <Layout location={props.location}>
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/projects/map" component={ProjectsOnMap} />
            <Route path="/list/:categoryName/:rent?" component={PostList} />
            <Route exact path="/" component={PostList} />
        </Layout>
    </Router>
);
