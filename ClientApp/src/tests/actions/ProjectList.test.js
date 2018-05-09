// Testing ProjectList Action Creators
import {
  actionCreators
} from '../../redux/actions/ProjectList';

describe('ProjectList Actions', () => {
  it('Request action creator should return a function', () => {
    const result = actionCreators.requestProjectList();

    // console.info('typeof actionResult=', typeof result);
    expect(typeof result).toEqual('function');
  });
});