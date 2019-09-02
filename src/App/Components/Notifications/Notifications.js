/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../../Redux/Actions/notifications';

const {
  get, snooze, getConfigs, getProfile, markAsRead, markAllAsRead
} = actions;

export class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isSnoozed: true
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { state } = this;
    const {
      get: getNotifications,
      getConfigs: getNotificationsConfigs,
      getProfile: getUserProfile
    } = this.props;
    if (token) {
      getNotificationsConfigs(token);
      getNotifications(token);
      getUserProfile(token);
      document.getElementById('get-notifications').checked = !state.isSnoozed;
    }
  }

  componentWillReceiveProps({ data: { data }, configs }) {
    if (data && !_.isEmpty(data.filter(item => item.type === 'inApp'))) {
      this.setState({ notifications: data.filter(item => item.type === 'inApp') });
      document.getElementsByClassName('notifications-container')[0].style.height = '300px';
    } else {
      this.setState({ notifications: [] });
      document.getElementsByClassName('notifications-container')[0].style.height = '60px';
    }
    if (!_.isEmpty(configs)) {
      const { config: { isSnoozed } } = configs;
      this.setState({ isSnoozed });
      document.getElementById('get-notifications').checked = !isSnoozed;
    } else {
      this.setState({ isSnoozed: false });
    }
  }

  snooze = () => {
    const token = localStorage.getItem('token');
    const { state } = this;
    const { notifications } = state;
    const { snooze: snoozeNotifications } = this.props;

    this.setState({ isSnoozed: !document.getElementById('get-notifications').checked });

    if (state.isSnoozed) {
      snoozeNotifications('unsnooze', token);
      document.getElementsByClassName('notifications-container')[0].style.height = !_.isEmpty(notifications)
        ? '300px'
        : '60px';
    } else {
      snoozeNotifications('snooze', token);
      document.getElementsByClassName('notifications-container')[0].style.height = '60px';
    }
  };

  markAsRead = (id) => {
    const { markAsRead: markNotificationAsRead, get: getNotifications } = this.props;
    const token = localStorage.getItem('token');

    markNotificationAsRead(token, id).then(getNotifications(token));
  };

  markAllAsRead = () => {
    const { markAllAsRead: markAllNotificationsAsRead, get: getNotifications } = this.props;
    const { state } = this;
    const token = localStorage.getItem('token');

    markAllNotificationsAsRead(token, state.notifications).then(getNotifications(token));
  };

  render() {
    const { state } = this;
    console.log(state);
    return localStorage.getItem('token') ? (
      <div>
        <div className="notifications-header border-bottom">
          <p className="notifications-header-title">Notifications</p>
          <label className="switch notifications-header-snoozer">
            <input type="checkbox" id="get-notifications" onClick={this.snooze} />
            <span className="slider round" />
          </label>
        </div>
        <div className="notifications-container">
          {!_.isEmpty(state.notifications)
            ? (!state.isSnoozed
                && state.notifications
                && state.notifications.map(notification => (
                  <div
                    key={notification.id}
                    className="notifications-item"
                    onClick={() => this.markAsRead(notification.id)}
                  >
                    <Link to={notification.url} className="link-custom">
                      {notification.message}
                    </Link>
                  </div>
                ))) || (
                <div className="notifications-snoozed">
                  {' '}
                  you have snoozed notifications
                  <i className="fas fa-bell-slash" />
                  {' '}
                </div>
            )
            : (!state.isSnoozed && (
            <div className="notifications-empty">No notifications found. All clear</div>
            )) || (
            <div className="notifications-snoozed">
              {' '}
                  you have snoozed notifications
              <i className="fas fa-bell-slash" />
              {' '}
            </div>
            )}
        </div>
        {(!_.isEmpty(state.notifications) && !state.isSnoozed && (
          <div className="space space-notifications" onClick={this.markAllAsRead}>
            Mark all as read
          </div>
        ))
          || ''}
      </div>
    ) : (
      ''
    );
  }
}

Notifications.propTypes = {
  data: PropTypes.object,
  configs: PropTypes.object,
  get: PropTypes.func,
  snooze: PropTypes.func,
  getConfigs: PropTypes.func,
  getProfile: PropTypes.func,
  markAsRead: PropTypes.func,
  markAllAsRead: PropTypes.func
};

export const mapStateToProps = state => ({
  data: state.notifications.data,
  configs: state.notifications.configs,
  user: state.authReducer.user
});

export default connect(mapStateToProps,
  {
    get,
    snooze,
    getConfigs,
    getProfile,
    markAsRead,
    markAllAsRead
  })(Notifications);
