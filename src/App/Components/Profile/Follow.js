import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import compare from '../../../Helpers/compareSubscription';
import profileActions from '../../../Redux/Actions/Profile';

const { follow, unfollow } = profileActions;

export function Follow(props) {
  const {
    follow: followAction,
    unfollow: unfollowAction,
    user,
    users,
    compareName,
    className
  } = props;
  return compare(user.toCheck, users, compareName) ? (
    <button
      type="button"
      className={`btn unfollow ${className.unfollow}`}
      onClick={() => unfollowAction(user.toFollow)}
    >
      Unfollow
    </button>
  ) : (
    <button
      type="button"
      className={`btn follow ${className.follow}`}
      onClick={() => followAction(user.toFollow)}
    >
      Follow
    </button>
  );
}

Follow.propTypes = {
  user: propTypes.object,
  follow: propTypes.func.isRequired,
  unfollow: propTypes.func.isRequired,
  users: propTypes.array,
  compareName: propTypes.string
};
export default connect(null,
  { follow, unfollow })(Follow);
