/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import actions from '../../../../Redux/Actions/notifications';
import defaultData from '../../../../configs/urls';
import Triangle from '../Triangle';

const { show, hide } = actions;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      profile: {},
      notifications: [],
      notificationsBubble: ''
    };
  }

  componentWillReceiveProps({
    isShown, profile, configs, data
  }) {
    this.setState({ isShown });
    if (!_.isEmpty({ ...profile, ...configs })) this.setState({ profile });
    else this.setState({ profile: {} });
    if (!_.isEmpty(data)) {
      this.setState({ notifications: data });
      document.getElementsByClassName('notify-bubble')[0].style.display = 'block';
      if (data.length < 10) {
        this.setState({ notificationsBubble: `${data.length}` });
      } else this.setState({ notificationsBubble: '9+' });
    } else document.getElementsByClassName('notify-bubble')[0].style.display = 'none';
  }

  showNotifications = () => {
    const { state } = this;
    const { show: showNotifications, hide: hideNotifications } = this.props;
    if (state.isShown) {
      return hideNotifications();
    }
    return showNotifications();
  };

  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <ul className="navbar-nav">
          <li className="dropdown notify-container" id="notify-container">
            <img
              src={
                state.profile
                && state.profile.profileImage
                && state.profile.profileImage.substr(0, 4) === 'http'
                  ? state.profile.profileImage
                  : defaultData.defaultUserProfileImage
              }
              alt=""
              width="50"
              height="50"
              // rounded-circle profile-img
              className={
                state.notifications.length > 0
                  ? 'rounded-circle profile-img-notify'
                  : 'rounded-circle profile-img'
              }
              id="nav-profile-img"
              onClick={this.showNotifications}
            />
            <Triangle direction="up" />
            <span className="notify-bubble">{state.notificationsBubble}</span>
          </li>
          <li className="nav-item dropdown nav-item-custom">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {state.profile ? state.profile.username : 'username'}
            </a>
            <div
              className="dropdown-menu dropdown-menu-custom"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item dropdown-item-custom" href="#">
                Action
              </a>
              <a className="dropdown-item dropdown-item-custom" href="#">
                Another action
              </a>
              <a className="dropdown-item dropdown-item-custom" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  isShown: PropTypes.bool,
  show: PropTypes.func,
  hide: PropTypes.func,
  data: PropTypes.array,
  configs: PropTypes.object,
  profile: PropTypes.object
};

export const mapStateToProps = state => ({
  isShown: state.notifications.isShown,
  data: state.notifications.data.data,
  configs: state.notifications.configs,
  profile: state.notifications.profile.profile
});

export default connect(mapStateToProps,
  { show, hide })(Profile);
