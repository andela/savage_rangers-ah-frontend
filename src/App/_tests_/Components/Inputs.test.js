import React from 'react';
import { shallow } from '../../../enzyme';
import Input from '../../Components/Inputs';

const props = {
  className: '',
  inputMode: '',
  onChange: jest.fn(),
  autoComplete: '',
  required: false
};

describe('Input component', () => {
  const component = shallow(<Input {...props} />);
  it('renders the input component', () => {
    expect(component).toMatchSnapshot();
  });
});
