import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import Follow from './Follow';
import urls from '../../../configs/urls';

const { defaultUserProfileImage } = urls;

export default function Follower(props) {
  const { followers, following, owner } = props;
  return !isEmpty(followers) ? (
    <div>
      {followers.map(follower => (
        <div key={follower.follower} className="row follower_container p-2 mb-2">
          <ReactImageFallback
            src={follower.profileImage}
            fallbackImage={defaultUserProfileImage}
            className="col-2"
          />
          <div className="col-2">
            <a href={follower.follower} className="col-2 follower_container_username">
              {`@${follower.follower}`}
            </a>
            {owner === true && (
              <Follow
                user={{ toCheck: follower.follower, toFollow: follower.follower }}
                users={following}
                compareName="following"
                className={{
                  unfollow: 'follower_container_unfollow p-1 m-2',
                  follow: 'follower_container_follow p-1 m-2'
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    'No follower'
  );
}

Follower.propTypes = {
  followers: PropTypes.array,
  following: PropTypes.array,
  owner: PropTypes.bool
};
