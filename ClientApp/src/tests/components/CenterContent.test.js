import React from 'react';
import renderer from 'react-test-renderer';
import { render, shallow } from 'enzyme';
import { CenterContent } from '../../components/Shared/CenterContent';

describe('CenterContent Components', () => {
  it('Should renders match snapshot', () => {
    const component = renderer
      .create(<CenterContent usePanel><h2>Inside Content</h2></CenterContent>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Should renders correctly without \'panel\' className when without usePanel', () => {
    let component = render(<CenterContent><h2>Inside Content</h2></CenterContent>);
    expect(component.hasClass('panel')).toEqual(false);
  });
  
  it('Should renders correctly with bootstrap className \'panel\' with usePanel', () => {
    let component = render(<CenterContent usePanel><h2>Inside Content</h2></CenterContent>);
    expect(component.hasClass('panel')).toEqual(true);
  });

  it('Shallow rendering', () => {
    let componentFromShallow = shallow(<CenterContent usePanel><h2>Inside Content</h2></CenterContent>);
    console.log('componentFromShallow');
    console.log(componentFromShallow);
  });
});