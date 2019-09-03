/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import actions from '../../../../Redux/Actions/notifications';
import defaultData from '../../../../configs/urls';
import TriangularPopup from '../TriangularPopup';

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
    if (!isEmpty({ ...profile, ...configs })) this.setState({ profile });
    else this.setState({ profile: {} });
    if (!isEmpty(data)) {
      this.setState({ notifications: data });
      if (data.length < 10) {
        this.setState({ notificationsBubble: `${data.length}` });
      } else this.setState({ notificationsBubble: '9+' });
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

  render() {
    const {
      state: {
        profile, notifications, notificationsBubble, isShown
      }
    } = this;
    return (
      <React.Fragment>
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
            <TriangularPopup direction="up" className={isShown ? 'show' : 'hide'} />
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
              <a className="dropdown-item dropdown-item-custom" href="/profile">
                Profile
              </a>
              <a className="dropdown-item dropdown-item-custom" href="/">
                Logout
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

export const mapStateToProps = ({
  notifications: {
    isShown,
    data: { data },
    configs,
    profile: { profile }
  }
}) => ({
  isShown,
  data,
  configs,
  profile
});

export default connect(mapStateToProps,
  { show, hide })(Profile);
