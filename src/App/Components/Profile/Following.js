import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';

export default function Following(props) {
  const {
    following: { following },
    unfollow,
    owner
  } = props;

  return !_.isEmpty(following) ? (
    <div key="kkkk">
      {following.map(follow => (
        <div key={follow.following} className="row follower_container p-2 mb-2">
          <ReactImageFallback
            src={follow.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="col-2"
          />
          <div className="col-2">
            <a href={follow.following} className="col-2 follower_container_username">
              {`@${follow.following}`}
            </a>
            {owner && (
              <button
                type="button"
                className="btn follower_container_unfollow w-1 m-2 p-1"
                onClick={() => unfollow(follow.following)}
              >
                Unfollow
              </button>
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
  following: PropTypes.object.isRequired,
  unfollow: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired
};
