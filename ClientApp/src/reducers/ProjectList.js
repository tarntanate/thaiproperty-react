import { API_BASE_URL } from '../config.js';

export const requestProjectList = 'REQUEST_PROJECT_LIST_FROM_API';
export const receivedProjectList = 'RECEIVE_PROJECT_LIST_FROM_API';
const initialState = { projects: [], isLoading: false };

export const actionCreators = {
  requestProjectList: limitResult => async (dispatch, getState) => {
    if (limitResult === 0) {
      // useless to call API, so just don't dispatch action
      return;
    }
    dispatch({ type: requestProjectList });

    let url = `${API_BASE_URL}/Project/GetAllProjectsWithAvgPrice`;
    if (limitResult) {
      url = url + `?limitResult=${limitResult}`;
    }
    console.debug('Requesting API:', url);
    const response = await fetch(url);
    const data = await response.json();

    // after getting data from await, then dispatch a new action with data received from API
    dispatch({ type: receivedProjectList, data });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;
  if (!process.env) {
    console.debug('action.type:', action.type);
  }
  // console.log('state: ', state);

  if (action.type === requestProjectList) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === receivedProjectList) {
    return {
      ...state,
      // We filtered only the projects that have location from the API
      projectList: action.data,
      // projectList: action.data.filter(project => project.location.lat != null),
      isLoading: false,
    };
  }

  // if action type is not specified, just return current state
  return state;
};
