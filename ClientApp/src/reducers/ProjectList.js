import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../config.js';

export const requestProjectList = 'REQUEST_PROJECT_LIST_FROM_API';
export const receivedProjectList = 'RECEIVED_PROJECT_LIST_FROM_API';
export const errorReceivingProjectList = 'ERROR_RECEIVE_PROJECT_LIST_FROM_API';
export const initialState = { projects: [], isLoading: false, errorMessage: null };

export const actionCreators = {
  requestProjectList: limitResult => async (dispatch, getState) => {
    if (limitResult === 0) {
      // useless to call API, so just don't dispatch action
      return;
    }
    dispatch({ type: requestProjectList });

    var apiServer = API_BASE_URL_PROD;
    if ((process.env && process.env.NODE_ENV === 'development') || process.env.NODE_ENV === 'test') {
      apiServer = API_BASE_URL_DEV;
    }

    let apiUrl = `${apiServer}/Project/GetAllProjectsWithAvgPrice`;
    if (limitResult) {
      apiUrl = apiUrl + `?limitResult=${limitResult}`;
    }
    console.debug('Requesting API:', apiUrl);
    await fetch(apiUrl)
      .then(
        response => {
          // console.log('response=', response);
          response.json().then(data => {
            // after getting data from await, then dispatch a new action with data received from API
            dispatch({ type: receivedProjectList, data });
          });
        },
        errorFromResponse => {
          console.error('Error fetching api:', errorFromResponse);
          dispatch({ type: errorReceivingProjectList, errorMessage: errorFromResponse });
        },
      )
      .catch(errorFromCatch => {
        console.error('errorFromCatch=', errorFromCatch);
        dispatch({ type: errorReceivingProjectList, errorMessage: errorFromCatch });
      });
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

  if (action.type === errorReceivingProjectList) {
    return {
      ...state,
      errorMessage: 'Cannot fetch data from API',
      isLoading: false,
    };
  }

  // if action type is not specified, just return current state
  return state;
};
