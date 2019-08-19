/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../../Redux/Actions/notifications';

const {
  get, snooze, getConfigs, getProfile
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

  componentWillReceiveProps({ data, configs }) {
    if (!_.isEmpty(data)) this.setState({ notifications: data.data });
    else {
      this.setState({ notifications: [] });
      document.getElementsByClassName('notifications-container')[0].style.height = '100px';
      document.getElementsByClassName('space-notifications')[0].style.display = 'none';
    }
    if (!_.isEmpty(configs)) {
      const { config: { isSnoozed } } = configs;
      this.setState({ isSnoozed });
      document.getElementById('get-notifications').checked = !isSnoozed;
      if (isSnoozed || _.isEmpty(data)) {
        document.getElementsByClassName('notifications-container')[0].style.height = '100px';
        document.getElementsByClassName('space-notifications')[0].style.display = 'none';
      } else document.getElementsByClassName('notifications-container')[0].style.height = '300px';
    } else {
      this.setState({ isSnoozed: false });
      document.getElementsByClassName('space-notifications')[0].style.display = 'none';
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
        : '100px';
      document.getElementsByClassName('space-notifications')[0].style.display = !_.isEmpty(notifications)
        ? 'block'
        : 'none';
    } else {
      snoozeNotifications('snooze', token);
      document.getElementsByClassName('notifications-container')[0].style.height = '100px';
      document.getElementsByClassName('space-notifications')[0].style.display = 'none';
    }
  };

  render() {
    const { state } = this;
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
                  <div key={notification.id} className="notifications-item">
                    {notification.message}
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
        <div className="space space-notifications">mar k all as read</div>
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
  getProfile: PropTypes.func
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
    getProfile
  })(Notifications);
