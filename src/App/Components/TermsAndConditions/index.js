import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import terms from '../../../Redux/Actions/terms';

export class TermsAndConditions extends Component {
  componentDidMount() {
    const { getTerms } = this.props;
    getTerms();
  }

  render() {
    const { termsAndConditionReducer: { termsAndConditions } } = this.props;
    return (
      <div className="">
        <Navbar />
        <div className="position-relative fixed-top navigation-info">
          <span>Terms and Conditions</span>
        </div>
        <div className="container termsAndConditions ">
          <div className="content">{termsAndConditions || 'Loading, please wait...'}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
TermsAndConditions.propTypes = {
  getTerms: propTypes.func.isRequired,
  termsAndConditionReducer: propTypes.object
};
export const mapStateToProps = ({ termsAndConditionReducer }) => ({ termsAndConditionReducer });
export const mapDispatchToProps = dispatch => ({ getTerms: () => dispatch(terms()) });

export default connect(mapStateToProps,
  mapDispatchToProps)(TermsAndConditions);
