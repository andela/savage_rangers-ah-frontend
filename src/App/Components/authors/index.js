import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';
import { connect } from 'react-redux';
import Pagination from 'react-pagination-library';
import { toast, ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import action from '../../../Redux/Actions/authors';
import compareSubscription from '../../../Helpers/compareSubscription';
import Loader from '../Common/loader';

import FollowActions from '../../../Redux/Actions/Follow';

const { unfollow, follow } = FollowActions;

let paginate;
export class DisplayAuthors extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    props.getAuthors(0);
  }

  changeCurrentPage = (numPage) => {
    const page = numPage - 1;
    paginate = page > 0 ? `${page}0` : page;
    this.props.getAuthors(Number(paginate));
    this.forceUpdate();
  };

  UNSAFE_componentWillReceiveProps({ authorReducer }) {
    if (authorReducer.follow) {
      this.props.getAuthors(authorReducer.paginationDetails.currentPage);

      toast.success('🦄 Followed successfully!');
    } else if (authorReducer.unfollow) {
      this.props.getAuthors(authorReducer.paginationDetails.currentPage);
      toast.success('🦄 Unfollowed successfully!');
    }
  }

  render() {
    const { props: { authorReducer, follow: followAction, unfollow: unfollowAction } } = this;
    const decoded = jwtDecode(localStorage.getItem('token'));
    if (authorReducer.authors) {
      const authors = authorReducer.authors.map(author => (
        <div key={author.id} className="col">
          <div className="d-flex flex-column flex-md-row flex-lg-row author-card__container">
            <div className="d-flex justify-content-center justify-content-md-start justify-content-lg-start author-card__left">
              <ReactImageFallback
                src={author.profileImage}
                fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
                className="rounded user-image"
                width="200"
                height="200"
              />
            </div>
            <div className="w-100 d-flex flex-column justify-content-between author-card__right">
              <p className="username align-self-center align-self-md-start align-self-lg-start align-self-xl-start">
                {author.username || 'unknown user'}
              </p>
              <p className="bio align-self-center align-self-md-start align-self-lg-start align-self-xl-start">
                {author.bio || 'no bio available '}
              </p>
              <div className="stats d-flex justify-content-center justify-content-md-start justify-content-lg-start">
                <span className="articles">
                  articles:
                  {author.Articles.length || 'No data'}
                </span>
                <span className="followers">
                  followers:
                  {author.followers.length || 'No data'}
                </span>
              </div>
              <div className="action-buttons d-flex justify-content-center justify-content-md-start justify-content-lg-start">
                <button type="button" className="btn profile__button">
                  view profile
                </button>
                {compareSubscription(decoded.user.username, author.followers, 'follower') ? (
                  <button
                    id="view-unfollow-button"
                    type="button"
                    className="follow__button u-unfollow"
                    onClick={() => unfollowAction(author.username)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    id="view-follow-button"
                    type="button"
                    className="follow__button"
                    onClick={() => followAction(author.username)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ));

      return (
        <div>
          <Navbar />
          <div className="container">
            <div className="col search-bar__container d-flex flex-column flex-md-row flex-lg-row justify-content-between">
              <h1>Authors</h1>
              <div className="search">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {authors}
          </div>
          <div className="pagination-center">
            <Pagination
              className="align-content-center"
              currentPage={authorReducer.paginationDetails.currentPage}
              totalPages={authorReducer.paginationDetails.pages}
              changeCurrentPage={this.changeCurrentPage}
            />
          </div>
          <ToastContainer />
          <Footer />
        </div>
      );
    }

    return <Loader />;
  }
}
export const mapStateToProps = ({ authorReducer }) => ({ authorReducer });
export const mapDispatchToProps = dispatch => ({
  getAuthors: offset => dispatch(action(offset)),
  follow: username => dispatch(follow(username)),
  unfollow: username => dispatch(unfollow(username))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(DisplayAuthors);
