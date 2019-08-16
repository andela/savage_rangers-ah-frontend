import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import compare from '../../../Helpers/compareSubscription';

export default function Following(props) {
  const {
    follower: { followers },
    following,
    unfollow,
    follow,
    owner
  } = props;

  return !_.isEmpty(followers) ? (
    <div>
      {followers.map(follower => (
        <div key={follower.follower} className="row follower_container p-2 mb-2">
          <ReactImageFallback
            src={follower.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="col-2"
          />
          <div className="col-2">
            <a href={follower.follower} className="col-2 follower_container_username">
              {`@${follower.follower}`}
            </a>
            {/*  eslint-disable-next-line no-nested-ternary */}
            {owner === true ? (
              compare(follower.follower, following, 'following') ? (
                <button
                  type="button"
                  className="btn follower_container_unfollow w-1 m-2 p-1"
                  onClick={() => unfollow(follower.follower)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn follower_container_follow w-1 m-2 p-1"
                  onClick={() => follow(follower.follower)}
                >
                  Follow
                </button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    'No follower'
  );
}

Following.propTypes = {
  follower: PropTypes.object.isRequired,
  following: PropTypes.array.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired
};
