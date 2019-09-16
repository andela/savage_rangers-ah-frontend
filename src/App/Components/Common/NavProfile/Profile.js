/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ReactImageFallback from 'react-image-fallback';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import actions from '../../../../Redux/Actions/notifications';
import defaultData from '../../../../configs/urls';
import TriangularPopup from '../TriangularPopup';
import IoNotification from '../../Notifications/IoNotification';
import Signout from '../../../../Redux/Actions/signout';
import 'react-toastify/dist/ReactToastify.css';

const {
  show, hide, get, markAsRead
} = actions;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('token');
    this.state = {
      isShown: false,
      profile: {},
      notifications: [],
      notificationsBubble: '',
      isSnoozed: false
    };
  }

  componentWillReceiveProps({
    isShown, profile, configs, data, logout, logoutError
  }) {
    if (logout) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    if (logoutError) {
      toast.warn(logoutError.message);
    }
    this.setState({ isShown });
    if (!isEmpty({ profile }) && !isEmpty(configs)) {
      this.setState({ profile, isSnoozed: configs.config.isSnoozed });
    } else this.setState({ profile: {} });
    if (data && !isEmpty(data.filter(item => item.type === 'inApp'))) {
      const notifications = data.filter(item => item.type === 'inApp');
      this.setState({ notifications });
      if (notifications.length < 10) {
        this.setState({ notificationsBubble: `${notifications.length}` });
      } else this.setState({ notificationsBubble: '9+' });
    } else {
      this.setState({ notifications: [] });
    }
  }

  componentDidUpdate({ io }) {
    const { state: { profile, isSnoozed } } = this;
    const { props: { io: newIo } } = this;
    const { get: getNotifications } = this.props;
    const token = localStorage.getItem('token');
    if (io && profile && newIo.userId === profile.id && !isSnoozed && !isEqual(io, newIo)) {
      toast.success(<IoNotification
        message={`${newIo.message}`}
        link={`${newIo.url}`}
        id={`${newIo.id}`}
        markAsRead={this.markIoNotificationAsRead}
      />,
      { className: 'io-container', closeButton: false });
      getNotifications(token);
    }
  }

  showNotifications = () => {
    const { state: { isShown } } = this;
    const { show: showNotifications, hide: hideNotifications } = this.props;
    if (isShown) {
      return hideNotifications();
    }
    return showNotifications();
  };

  markIoNotificationAsRead = (id) => {
    const { markAsRead: markNotificationAsRead, get: getNotifications } = this.props;
    const token = localStorage.getItem('token');

    markNotificationAsRead(token, id).then(getNotifications(token));
  };

  render() {
    const {
      state: {
        profile, notifications, notificationsBubble, isShown
      }
    } = this;
    const { Signout } = this.props;
    return (
      <React.Fragment>
        <ToastContainer autoClose={false} />
        <ul className="navbar-nav">
          <li className="dropdown notify-container" id="notify-container">
            <ReactImageFallback
              src={profile ? profile.profileImage : ''}
              fallbackImage={defaultData.defaultUserProfileImage}
              alt="profile image"
              className={
                notifications.length > 0
                  ? 'rounded-circle profile-img-notify'
                  : 'rounded-circle profile-img'
              }
              onClick={this.showNotifications}
            />
            <TriangularPopup
              direction="up"
              className={
                isShown
                  ? 'custom-triangle-notifications show'
                  : 'custom-triangle-notifications hide'
              }
            />
            <span className={isEmpty(notifications) ? 'notify-bubble hide' : 'notify-bubble show'}>
              {notificationsBubble}
            </span>
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
              {profile ? profile.username : 'username'}
            </a>

            <div
              className="dropdown-menu dropdown-menu-custom"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item dropdown-item-custom" href="/articles">
                Articles
              </a>
              <a className="dropdown-item dropdown-item-custom" href="/authors">
                Authors
              </a>
              {this.token && (
                <div>
                  <a
                    className="dropdown-item dropdown-item-custom"
                    href={`/profile/${localStorage.getItem('username')}`}
                  >
                    Profile
                  </a>
                  <a className="dropdown-item dropdown-item-custom" href="/articles/new">
                    New article
                  </a>
                  <a
                    className="dropdown-item dropdown-item-custom"
                    href="#"
                    onClick={() => Signout(this.token)}
                  >
                    Logout
                  </a>
                </div>
              )}
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
  get: PropTypes.func,
  hide: PropTypes.func,
  data: PropTypes.array,
  configs: PropTypes.object,
  profile: PropTypes.object,
  markAsRead: PropTypes.func,
  io: PropTypes.object,
  logout: PropTypes.object,
  Signout: PropTypes.func,
  logoutError: PropTypes.object
};

export const mapStateToProps = state => ({
  isShown: state.notifications.isShown,
  data: state.notifications.data.data,
  configs: state.notifications.configs,
  profile: state.notifications.profile.profile,
  io: state.notifications.io,
  logout: state.Signout.logout,
  logoutError: state.Signout.logoutError
});

export default connect(mapStateToProps,
  {
    show,
    hide,
    get,
    markAsRead,
    Signout
  })(Profile);
