import React from 'react';
import { shallow } from '../../enzyme';
import {
  TermsAndConditions,
  mapDispatchToProps,
  mapStateToProps
} from '../Components/TermsAndConditions';

describe('Terms and conditions', () => {
  const defaultProps = {
    getTerms: jest.fn(),
    termsAndConditionReducer: { termsAndConditions: '' }
  };

  const renderTermsAndCondition = (args) => {
    const final = { ...defaultProps, ...args };
    const terms = shallow(<TermsAndConditions {...final} />);
    return terms;
  };
  it('renders the content form', () => {
    const wrapper = renderTermsAndCondition();
    mapStateToProps({});
    mapDispatchToProps(jest.fn()).getTerms({});
    expect(wrapper.find('.content').length).toBe(1);
  });
});
