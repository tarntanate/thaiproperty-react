import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionCreators, requestProjectList, receivedProjectList } from '../../reducers/ProjectList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ProjectList Reducer', () => {
  beforeEach(() => {});

  it('Should get data from api as it should', () => {
    const limitResult = 5;
    const store = mockStore();

    return store.dispatch(actionCreators.requestProjectList(limitResult)).then(() => {
      // return of async actions
      var result = store.getActions();
      // console.log(result);
      expect(result[0].type).toEqual(requestProjectList);
      expect(result[1].type).toEqual(receivedProjectList);
      expect(result[1].data.length).toEqual(limitResult);
    });
  });

  it('Data should match with snapshot', () => {
    const limitResult = 1;
    const store = mockStore();

    return store.dispatch(actionCreators.requestProjectList(limitResult)).then(() => {
      // return of async actions
      var result = store.getActions();
      console.debug('First data item is\n', result[1].data[0]);
      expect(result[0].type).toEqual(requestProjectList);
      expect(result[1].type).toEqual(receivedProjectList);
      expect(result[1].data.length).toEqual(limitResult);
      expect(result[1].data[0]).toMatchSnapshot('ProjectData');
    });
  });

  afterEach(() => {
    // Should clear any mocking data
  });
});
