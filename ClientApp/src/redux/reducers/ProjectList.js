import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_ERROR } from '../actions/ProjectList';

// initial state
const initialState = {
  projects: [],
  isLoading: false,
  errorMessage: null
};

export const projectsReducer = (state = initialState, action) => {
  if (!process.env) {
    // log action except under test environment
    console.debug('action.type:', action.type);
  }

  if (action.type === LOAD_PROJECTS_REQUEST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOAD_PROJECTS_SUCCESS) {
    return {
      ...state,
      // We filtered only the projects that have location from the API
      projects: action.data,
      // projectList: action.data.filter(project => project.location.lat != null),
      isLoading: false,
    };
  }

  if (action.type === LOAD_PROJECTS_ERROR) {
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