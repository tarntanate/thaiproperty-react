import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { projectsReducer } from '../reducers/ProjectList';
import { postsReducer } from '../reducers/PostList';
import throttle from 'lodash/throttle';

export default function configureStore(history, initialState) {
  // In development, use the browser's Redux dev tools extension if installed
  const isDevelopment = process.env.NODE_ENV === 'development';
  const enhancers = [];
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  // Configure Redux middlewares
  const middleware = [thunk, routerMiddleware(history)];
  if (isDevelopment) {
    middleware.push(logger);
  }

  const reducers = {
    projects: projectsReducer,
    posts: postsReducer,
  };

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

  store.subscribe(throttle(()=> {
    // do something each time state changes
    // but wrap inside throttle function to avoid calling too often
    // console.log('state changed...', store.getState());
  }, 1000));

  return store;
}
