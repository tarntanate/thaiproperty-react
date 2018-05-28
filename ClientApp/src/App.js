import React from 'react';
// import { Route } from 'react-router';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Containers as route
import Home from './containers/Home';
import ProjectsOnMap from './containers/ProjectsOnMap';
import PostList from './containers/PostList';

export default (props) => (
    <Router>
        <Layout location={props.location}>
            <Route path="/projects/map" component={ProjectsOnMap} />
            <Route path="/list/:categoryName/:rent?" component={PostList} />
            <Route exact path="/" component={PostList} />
        </Layout>
    </Router>
);
