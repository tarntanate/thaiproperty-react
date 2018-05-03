import configureMockStore from 'redux-mock-store';

import promiseMiddleware from 'redux-promise-middleware';
// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  actionCreators,
  requestProjectList,
  receivedProjectList,
  errorReceivingProjectList,
  reducer,
} from '../../reducers/ProjectList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const store = createStore(applyMiddleware(middlewares));
// jest.setTimeout(10000);

beforeAll(() => {
  // console.warn('MAKE SURE YOU RUN "dotnet run" AS BACKEND API BEFORN RUNNING TEST');
});

describe('ProjectList Reducer', () => {
  beforeEach(function() {
    // console.log('Before each');
    // const store = mockStore();
    // store.dispatch(actionCreators.requestProjectList(5));
  });

  // it('xxxxx', () => {
  //   const store = mockStore();
  //   const response = store.dispatch(actionCreators.requestProjectList(5)).then(result => {
  //     console.warn(result);
  //   });
  //   console.log(response);
  //   // console.log(response);
  //   // expect(response.Id).toBe(1);
  // });

  it('Should get data from api without error', () => {
    const limitResult = 5;
    const store = mockStore({ projects: [] });
    const action = store.dispatch(actionCreators.requestProjectList(limitResult)).then(result => {
      // return of async actions
      // console.log(result);
      var actualActions = store.getActions();

      console.warn('getAction=', actualActions);
      expect(actualActions[0].type).toEqual(requestProjectList);
      // expect(result[1].type).toEqual(receivedProjectList);
      // expect(result[1].data.length).toEqual(limitResult);
    });

    return action;
    // action().then(xxx => {
    //   console.warn('xxx', xxx);
    // });
    // return action(result2 => {
    //   console.log('action=', action);
    // });
    // done();
  });

  // it('Data should match with snapshot', () => {
  //   const limitResult = 1;
  //   const store = mockStore();

  //   return store.dispatch(actionCreators.requestProjectList(limitResult)).then(() => {
  //     // return of async actions
  //     var result = store.getActions();
  //     console.debug('First data item is\n', result[1].data[0]);
  //     expect(result[0].type).toEqual(requestProjectList);
  //     expect(result[1].type).toEqual(receivedProjectList);
  //     expect(result[1].data.length).toEqual(limitResult);
  //     expect(result[1].data[0]).toMatchSnapshot('ProjectData');
  //   });
  // });

  afterEach(() => {
    // Should clear any mocking data
  });
});

// describe('async actions', () => {
//   const middlewares = [promiseMiddleware()];
//   const mockStore = configureMockStore(middlewares);

//   beforeEach(() => {
//     moxios.install(instance);
//   });
//   afterEach(() => {
//     moxios.uninstall(instance);
//   });
//   it('it dispatches GET_BUCKETLISTS_FULFILLED and GET_BUCKETLISTS_PENDING on fetch bucketlists', () => {
//     const payload = {
//       bucketlists: [],
//     };
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: payload,
//       });
//     });
//     const expectedActions = ['GET_BUCKETLISTS_FULFILLED', 'GET_BUCKETLISTS_PENDING'];
//     // configure Mock store
//     const store = mockStore({ bucketlists: [] });

//     // call the getBucketLists async action creator
//     return store.dispatch(actions.getBucketLists()).then(() => {
//       const dispatchedActions = store.getActions();
//       const actionTypes = dispatchedActions.map(action => action.type);

//       expect(actionTypes).toEqual(expectedActions);
//     });
//   });
// });
