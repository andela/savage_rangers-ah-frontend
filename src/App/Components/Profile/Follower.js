import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';

export default function Follower(props) {
  const { follower: { followers } } = props;
  return !_.isEmpty(followers) ? (
    <div>
      {followers.map(follower => (
        <div key={follower.follower} className="row m-3 follower_container">
          <ReactImageFallback
            src={follower.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="col-2"
          />
          <div className="col-2">
            <p className="col-2 follower_container_username">{`@${follower.follower}`}</p>
            <p className="btn-danger follower_container_unfollow w-1 m-2 p-1">Unfollow</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    'No follower'
  );
}

Follower.propTypes = { follower: PropTypes.object.isRequired };
