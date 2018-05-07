import {
  API_BASE_URL_DEV,
  API_BASE_URL_PROD
} from '../config.js';

// action types
export const requestProjectList = 'REQUEST_PROJECT_LIST_FROM_API';
export const receivedProjectList = 'RECEIVED_PROJECT_LIST_FROM_API';
export const errorReceivingProjectList = 'ERROR_RECEIVE_PROJECT_LIST_FROM_API';

// initial state
export const initialState = {
  projects: [],
  isLoading: false,
  errorMessage: null
};

// action creators
export const actionCreators = {
  // 'requestProjectList' is a thunk action creator is a function that returns a function
  // it is the same as return (dispatch, getState) => {}
  requestProjectList: limitResult => async (dispatch, getState) => {
    if (limitResult === 0) {
      // useless to call API, so just don't dispatch action
      return;
    }
    dispatch({
      type: requestProjectList
    });

    var apiServer = API_BASE_URL_PROD;
    if ((process.env && process.env.NODE_ENV === 'development') || process.env.NODE_ENV === 'test') {
      apiServer = API_BASE_URL_DEV;
    }

    let apiUrl = `${apiServer}/Project/GetAllProjectsWithAvgPrice`;
    if (limitResult) {
      apiUrl = apiUrl + `?limitResult=${limitResult}`;
    }
    console.debug('Requesting API:', apiUrl);
    const result = fetch(apiUrl);
    return result
      .then(handleErrors)
      .then(response => {
        // console.log('response=', response);
        response.json().then(data => {
          // after getting data from await, then dispatch a new action with data received from API
          dispatch({
            type: receivedProjectList,
            data
          });
        });
      })
      .catch(err => {
        dispatch({
          type: errorReceivingProjectList,
          errorMessage: `ไม่สามารถดึงข้อมูลได้ (${err.message})`,
        });
      });
  },
};

const handleErrors = (response) => {
  // handle server response with non Ok status
  console.log('response=',response);
  if (!response.ok) {
    // throw an exception which will go into the catch exception section
    throw Error('Server Error: ' + response.status + ' - ' + response.statusText);
  }
  return response;
}

export const reducer = (state, action) => {
  state = state || initialState;
  if (!process.env) {
    console.debug('action.type:', action.type);
  }

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