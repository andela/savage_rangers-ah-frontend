/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import propTypes from 'prop-types';
// import { connect } from 'react-redux';
import queryString from 'query-string';
// import actions from '../../../Redux/Actions/profileActions';

export class redirect extends Component {
  componentDidMount() {
    // const { state, props } = this;
    // const { getProfile: profile } = props;
    const { token, username, profileImage } = queryString.parse(
      window.location.search
    );
    localStorage.setItem('token', token);
    this.setState({ username, profileImage });
    // profile(state.token, state.username);
  }

  // componentWillReceiveProps({ userProfile }) {
  //   this.setState({ userProfile });
  //   console.log(this.state);
  // }

  render() {
    const { state } = this;
    return (
      <div>
        <center id="redirect-text">Redirection Page</center>
      </div>
    );
  }
}

// Redirect.propTypes = {
//   getProfile: propTypes.func.isRequired,
//   userProfile: propTypes.object.isRequired
// };

// export const mapStateToProps = state => ({ userProfile: state.passwordReset.userProfile });

export default Redirect;
