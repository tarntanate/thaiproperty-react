import { getApiServerUrl, ConsoleColor } from '../../config.js';

// action types
export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_ERROR = 'LOAD_PROJECTS_ERROR';

// action creators
export const actionCreators = {
  // 'requestProjectList' is a thunk action creator which is a function that returns a function (require thunk middleware)
  // it is the same as return (dispatch, getState) => {}
  requestProjectList: limit => async (dispatch, getState) => {
    if (limit === 0) {
      // useless to call API, so just don't dispatch action
      return;
    }
    dispatch({
      type: LOAD_PROJECTS_REQUEST
    });

    let apiUrl = `${getApiServerUrl()}/projects/withAvgPrice`;
    if (limit) {
      apiUrl = apiUrl + `?limit=${limit}`;
    }
    console.debug(`%c Requesting API: ${apiUrl}`, ConsoleColor.REQUEST);
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok) {
        // throw an exception which will go into the catch exception section
        throw Error('Server Error: ' + response.status + ' - ' + response.statusText);
      }
      dispatch({
        type: LOAD_PROJECTS_SUCCESS,
        data
      });
    } catch (err) {
      dispatch({
        type: LOAD_PROJECTS_ERROR,
        errorMessage: err.message ? `ไม่สามารถดึงข้อมูลได้ (${err.message})` : 'Error fetching data',
      });
    }

    
    // return result
    //   .then(handleErrors)
    //   .then(response => {
    //     // console.log('response=', response);
    //     response.json().then(data => {
    //       // after getting data from await, then dispatch a new action with data received from API
    //       dispatch({
    //         type: LOAD_PROJECTS_SUCCESS,
    //         data
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     // Tutorial here https://egghead.io/lessons/javascript-redux-displaying-error-messages
    //     dispatch({
    //       type: LOAD_PROJECTS_ERROR,
    //       errorMessage: err.message ? `ไม่สามารถดึงข้อมูลได้ (${err.message})` : 'Error fetching data',
    //     });
    //   });
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