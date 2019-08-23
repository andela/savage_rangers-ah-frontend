/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Welcome from '../TestRedux';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentWillMount() {
    const { data } = this.props;
    if (data && data.user) {
      this.setState({ user: data.user });
    } else {
      this.setState({ user: {} });
    }
  }

  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <div>
          <h1>Authors Heaven</h1>
          <p>This is the home page of authors heaven v 1.0.0</p>
        </div>
        <div>
          <h2>User credentials</h2>
          <p>
            <strong>Picture: </strong>
            <img src={state.user.profileImage} alt="Profile" />
          </p>
          <p>
            <strong>Username: </strong>
            {state.user.username}
          </p>
          <p>
            <strong>Email: </strong>
            {state.user.email}
          </p>
        </div>
        <Welcome />
      </React.Fragment>
    );
  }
}

Home.defaultProps = { data: {} };

Home.propTypes = { data: propTypes.object };

export const mapStateToProps = state => ({ data: state.passwordReset.data });

export default connect(
  mapStateToProps,
  {}
)(Home);
