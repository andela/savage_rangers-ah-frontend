import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
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
    const { state: { isSnoozed } } = this;
    const {
      get: getNotifications,
      getConfigs: getNotificationsConfigs,
      getProfile: getUserProfile
    } = this.props;
    if (token) {
      getNotificationsConfigs(token);
      getNotifications(token);
      getUserProfile(token);
      document.getElementById('get-notifications').checked = !isSnoozed;
    }
  }

  componentWillReceiveProps({ data, configs }) {
    if (!isEmpty(data)) this.setState({ notifications: data.data });
    else {
      this.setState({ notifications: [] });
    }
    if (!isEmpty(configs)) {
      const { config: { isSnoozed } } = configs;
      this.setState({ isSnoozed });
      document.getElementById('get-notifications').checked = !isSnoozed;
    } else {
      this.setState({ isSnoozed: false });
    }
  }

  snooze = () => {
    const token = localStorage.getItem('token');
    const { state: { isSnoozed } } = this;
    const { snooze: snoozeNotifications } = this.props;
    this.setState({ isSnoozed: !document.getElementById('get-notifications').checked });
    if (isSnoozed) {
      snoozeNotifications('unsnooze', token);
    } else {
      snoozeNotifications('snooze', token);
    }
  };

  render() {
    const { state: { notifications, isSnoozed } } = this;
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
          {!isEmpty(notifications)
            ? (!isSnoozed
                && notifications.map(notification => (
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
            : (!isSnoozed && (
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
        {!isEmpty(notifications) ? (
          <div className="space space-notifications">mark all as read</div>
        ) : (
          ''
        )}
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

export const mapStateToProps = ({ notifications: { data, configs }, authReducer: { user } }) => ({
  data,
  configs,
  user
});
export default connect(mapStateToProps,
  {
    get,
    snooze,
    getConfigs,
    getProfile
  })(Notifications);
