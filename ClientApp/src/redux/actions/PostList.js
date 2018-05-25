import { getApiServerUrl, ConsoleColor } from '../../config.js';

// action types
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_PROJECTS_ERROR';

// action creators
export const actionCreators = {
  // 'requestPostList' is a thunk action creator which is a function that returns a function (require thunk middleware)
  // it is the same as return (dispatch, getState) => {}
  requestPostList: limit => async (dispatch, getState) => {
    if (limit === 0) { return; }
    
    dispatch({
      type: LOAD_POSTS_REQUEST
    });

    let apiUrl = `${getApiServerUrl()}/posts`;
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
        type: LOAD_POSTS_SUCCESS,
        data
      });
    } catch (err) {
      dispatch({
        type: LOAD_POSTS_ERROR,
        errorMessage: err.message ? `ไม่สามารถดึงข้อมูลได้ (${err.message})` : 'Error fetching data',
      });
    }
  },
};