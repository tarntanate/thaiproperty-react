import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as ProjectList from '../reducers/ProjectList';
import throttle from 'lodash/throttle';

export default function configureStore(history, initialState) {
  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const reducers = {
    projectList: ProjectList.reducer,
  };

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

  store.subscribe(throttle(()=> {
    // do something each time state changes
    // but wrap inside throttle function to avoid calling too often
    console.log(store.getState());
  }, 1000));

  return store;
}
