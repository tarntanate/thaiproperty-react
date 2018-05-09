import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../config.js';

// action types
export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_ERROR = 'LOAD_PROJECTS_ERROR';

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
      type: LOAD_PROJECTS_REQUEST
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
            type: LOAD_PROJECTS_SUCCESS,
            data
          });
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_PROJECTS_ERROR,
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