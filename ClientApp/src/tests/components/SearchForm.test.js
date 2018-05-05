import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import SearchForm from '../../components/Shared/SearchForm';

// Mocking objects
const mockStore = configureMockStore();
const store = mockStore({});

describe('SearchForm Components', () => {
  it('Should renders correctly', () => {
    const tree = renderer
      .create(<Provider store = {store}>
                <SearchForm />
              </Provider>)
      .toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
  });
});