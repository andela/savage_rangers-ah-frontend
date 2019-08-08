/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import propTypes from 'prop-types';
// import { connect } from 'react-redux';
import queryString from 'query-string';
// import actions from '../../../Redux/Actions/profileActions';

// const { getProfile } = actions;

export class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', profileImage: '' };
  }

  componentDidMount() {
    // const { state, props } = this;
    // const { getProfile: profile } = props;
    const { token, username, profileImage } = queryString.parse(window.location.search);
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
        <h1>
          <center id="redirect-text">Redirection Page</center>
        </h1>
        <div>
          <h2>User credentials</h2>
          <p>
            <strong>Picture: </strong>
            <img src={state.profileImage} alt="Profile" />
          </p>
          <p>
            <strong>Username: </strong>
            {state.username}
          </p>
        </div>
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
