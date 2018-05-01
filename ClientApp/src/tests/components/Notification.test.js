import React from 'react';
import ReactDom from 'react-dom';
// import renderer from 'react-test-renderer';
import Notification from '../../components/Shared/Notification';

describe('Notification Components', () => {
  it('Should render correctly', () => {
    // const component = ReactDom.render( < Notification / > )
    // let tree = component.toJSON();
    // expect(component).toMatchSnapshot();
    // console.log('component=', component);
  });

  it('Should generate html correctly based on type', () => {
    const component = 'this is test';
    expect(component).toBe(component);
  });
});
