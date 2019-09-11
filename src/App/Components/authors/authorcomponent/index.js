<div key={author.id} className="card card-style ">
          <ReactImageFallback
            src={author.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="image"
          />
          <p className="card-text text-style text-style-username">
            {author.username || 'unknown user'}
          </p>
          <p className="card-text text-style">{author.bio || 'no bio available '}</p>
          <div className="text-style">
            <div className="stat-Container article">
              {' '}
              articles:
              {author.Articles.length || 'No data'}
            </div>
            <div className="stat-Container follower">
              {' '}
              followers:
              {author.followers.length || 'No data'}
            </div>
          </div>
          <button
            id="view-profile-button"
            type="submit"
            name="submit"
            className="btn btn-block col-sm-2 common-form-button  profile-button"
          >
            view Profile
          </button>
          {compareSubscription(decoded.user.username, author.followers, 'follower') ? (
            <button
              id="view-unfollow-button"
              type="submit"
              name="submit"
              className="btn btn-block col-sm-2 common-form-button  unfollow-button "
              onClick={() => unfollowAction(author.username)}
            >
              {' '}
              unfollow
            </button>
          ) : (
            <button
              id="view-follow-button"
              type="submit"
              name="submit"
              className="btn btn-block col-sm-2 common-form-button  follow-button "
              onClick={() => followAction(author.username)}
            >
              follow
            </button>
          )}
        </div>