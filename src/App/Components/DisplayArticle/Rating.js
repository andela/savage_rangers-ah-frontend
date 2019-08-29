/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import TriangularPopup from '../Common/TriangularPopup';
import actions from '../../../Redux/Actions/articleRatings';

const { showUsersForRating } = actions;

export class Rating extends Component {
  static propTypes = {
    rating: PropTypes.number,
    percentage: PropTypes.number,
    stats: PropTypes.array,
    areUsersShown: PropTypes.bool,
    showUsersForRating: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { page: 1, showUsers: false };
  }

  showOrHide = () => {
    const { props: { areUsersShown, showUsersForRating: showUsers_ } } = this;
    if (!areUsersShown) {
      const { state: { showUsers } } = this;
      this.setState({ showUsers: !showUsers });
      showUsers_(!areUsersShown);
    }
  };

  hide = () => {
    const { props: { areUsersShown, showUsersForRating: showUsers_ } } = this;
    this.setState({ showUsers: false });
    showUsers_(!areUsersShown);
  };

  gotoNextPage = () => {
    const { state: { page } } = this;
    this.setState({ page: page + 1 });
  };

  gotoPrevPage = () => {
    const { state: { page } } = this;
    this.setState({ page: page - 1 });
  };

  render() {
    const {
      props: { rating, percentage, stats },
      state: { page, showUsers }
    } = this;
    const pages = parseFloat(stats[rating - 1].users[0]);
    const users = stats[rating - 1].users[page];
    return (
      <React.Fragment>
        <div className="rating" onClick={this.showOrHide}>
          <div className="rating__number">{rating}</div>
          <div className="rating__star">
            <i className="fas fa-star" />
          </div>
          <div className="rating__fill">
            <div className={`fill fill--${rating}`} style={{ width: `${percentage}%` }}>
              _
            </div>
          </div>
        </div>
        <div className="rating__users" style={{ display: showUsers ? 'block' : 'none' }}>
          <i className="fas fa-times-circle rating-close-button" onClick={this.hide} />
          <TriangularPopup direction="left" className="custom-triangle-rating" />
          {users
            && users.map(user => (
              <div key={user.id} className="rating__users__user">
                <div className="rating__users__user--username">
                  <a href={`/profile/${user.username}`}>{user.username}</a>
                </div>
                <div className="rating__users__user--rating">{rating}</div>
                <div className="rating__users__user--star">
                  <i className="fas fa-star" />
                </div>
              </div>
            ))}
          {isEmpty(users) ? (
            <div className="no-users">
              No users for this rating
              {' '}
              <i className="fas fa-user-times" />
            </div>
          ) : (
            ''
          )}
          {pages > 1 ? (
            <div className="rating__users__pagination">
              {page !== 1 ? (
                <div className="rating__users__pagination--left" onClick={this.gotoPrevPage}>
                  <i className="fas fa-arrow-left" />
                </div>
              ) : (
                ''
              )}
              <div className="rating__users__pagination--mid rounded-circle">{page}</div>
              {page !== pages ? (
                <div className="rating__users__pagination--right" onClick={this.gotoNextPage}>
                  <i className="fas fa-arrow-right" />
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ articleRatings }) => ({ areUsersShown: articleRatings.areShown });

export default connect(mapStateToProps,
  { showUsersForRating })(Rating);
