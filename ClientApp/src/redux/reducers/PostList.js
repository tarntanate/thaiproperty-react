import { LOAD_POSTS_SUCCESS, LOAD_POSTS_REQUEST, LOAD_POSTS_ERROR } from '../actions/PostList';

// initial state
const initialState = {
  posts: [],
  isLoading: false,
  errorMessage: null
};

export const postsReducer = (state = initialState, action) => {
  if (!process.env) {
    // log action except under test environment
    console.debug('action.type:', action.type);
  }

  if (action.type === LOAD_POSTS_REQUEST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOAD_POSTS_SUCCESS) {
    return {
      ...state,
      // We filtered only the projects that have location from the API
      posts: action.data,
      // projectList: action.data.filter(project => project.location.lat != null),
      isLoading: false,
    };
  }

  if (action.type === LOAD_POSTS_ERROR) {
    console.log(action);
    return {
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
    };
  }

  // if action type is not specified, just return current state
  return state;
};