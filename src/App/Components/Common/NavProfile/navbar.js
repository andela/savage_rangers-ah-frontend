/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLogo from './navLogo';
import NavLinks from './navLinks';
import Profile from './Profile';
import Notifications from '../../Notifications/Notifications';
import notificationActions from '../../../../Redux/Actions/notifications';
import homeActions from '../../../../Redux/Actions/home';

const { getCategories } = homeActions;

const { hide } = notificationActions;

export class Navbar extends Component {
  static propTypes = {
    hide: PropTypes.func.isRequired,
    isShown: PropTypes.bool,
    getCategories: PropTypes.func,
    categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = { isShown: false };
  }

  componentDidMount() {
    const { getCategories: getNavCategories } = this.props;
    getNavCategories();
  }

  componentWillReceiveProps({ isShown }) {
    this.setState({ isShown });
  }

  hideNotificationsComponent = () => {
    const { props } = this;
    const { hide: hideNotifications } = props;
    hideNotifications();
  };

  render() {
    const { state: { isShown } } = this;
    const { categories } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <NavLogo />
        <h3 id="web-name">Authors-Haven</h3>
        <div className="nav-categories">
          {categories
            ? categories.map((category, index) => (
              <div key={category.id} className="nav-categories__item">
                {category.name}
                <span className="hidden-span">__</span>
                <span className={`hidden-span__${index}`}> | </span>
                <span className="hidden-span">__</span>
              </div>
            ))
            : ''}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onMouseOver={this.hideNotificationsComponent}
        >
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse nav-links-container" id="navbarNavAltMarkup">
          {!localStorage.getItem('token') ? <NavLinks /> : <Profile />}
        </div>
        <div className={isShown ? 'notifications show' : 'notifications hide'} id="notifications">
          <Notifications />
        </div>
      </nav>
    );
  }
}

export const mapStateToProps = ({ notifications: { isShown }, home: { categories } }) => ({
  isShown,
  categories
});

export default connect(mapStateToProps,
  { hide, getCategories })(Navbar);
