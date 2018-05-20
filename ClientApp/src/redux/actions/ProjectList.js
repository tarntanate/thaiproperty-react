import { getApiServerUrl } from '../../config.js';

// action types
export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_ERROR = 'LOAD_PROJECTS_ERROR';

// action creators
export const actionCreators = {
  // 'requestProjectList' is an action creator which is a function that returns a function (require thunk)
  // it is the same as return (dispatch, getState) => {}
  requestProjectList: limitResult => async (dispatch, getState) => {
    if (limitResult === 0) {
      // useless to call API, so just don't dispatch action
      return;
    }
    dispatch({
      type: LOAD_PROJECTS_REQUEST
    });

    let apiUrl = `${getApiServerUrl()}/Project/GetAllProjectsWithAvgPrice`;
    if (limitResult) {
      apiUrl = apiUrl + `?limitResult=${limitResult}`;
    }
    console.debug(`%c Requesting API: ${apiUrl}`,'color: #3366aa; font-weight: bold');
    
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
        // Tutorial here https://egghead.io/lessons/javascript-redux-displaying-error-messages
        dispatch({
          type: LOAD_PROJECTS_ERROR,
          errorMessage: err.message ? `ไม่สามารถดึงข้อมูลได้ (${err.message})` : 'Error fetching data',
        });
      });
  },
};

const handleErrors = (response) => {
  // handle server response with non Ok status
  // console.log('response=',response);
  if (!response.ok) {
    // throw an exception which will go into the catch exception section
    throw Error('Server Error: ' + response.status + ' - ' + response.statusText);
  }
  return response;
}