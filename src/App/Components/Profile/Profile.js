import React, { Component } from 'react';
import propTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import numeral from 'numeral';
import _ from 'underscore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import profileActions from '../../../Redux/Actions/Profile';
import NavBar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import UpdateProfileForm from './UpdateProfileForm';
import Bookmark from './BookMark';
import Followers from './Follower';
import Following from './Following';
import Loader from '../Common/loader';
import compare from '../../../Helpers/compareSubscription';
import SingleArticle from './SingleArticle';
/**
 * User's registration component
 *
 * @export
 * @class Profile
 * @extends {Component}
 * @author Alain burindi
 */

const {
  getProfile,
  getFolowers,
  getFollowing,
  updateProfile,
  getBookMarks,
  removeBookmark,
  unfollow,
  follow,
  deleteArticle
} = profileActions;

export class Profile extends Component {
  constructor(props) {
    super(props);
    const { history: { location: { pathname } } } = this.props;
    this.state = { username: pathname.split('/')[2] };
    console.log(this.state.username)
    this.validator = new SimpleReactValidator({ locale: 'en' });
  }

  async componentDidMount() {
    const {
      getProfile: getProfileData,
      getFolowers: getFolowersData,
      getFollowing: getFollowingData,
      getBookMarks: getBookMarksData
    } = this.props;
    const { username } = this.state;
    getProfileData(username);
    getFolowersData(username);
    getFollowingData(username);
    getBookMarksData(username);
  }

  /**
   * will be executed whenever a new prop is added to the component
   *
   * @param {*} { user, error }
   * @memberof Profile
   */
  async componentWillReceiveProps({
    profile,
    updated,
    remove,
    unfollowed,
    followed,
    deleted,
    deleteFailed
  }) {
    const { Articles, ...temporally } = profile;
    const {
      getProfile: getProfileData,
      getBookMarks: getBookMarksData
    } = this.props;
    const { username } = this.state;
    this.setState({ temporally });
    if (updated) {
      getProfileData();
    } else if (remove) {
      toast.success('🦄 Successfully removed!');
      getBookMarksData(username);
    } else if (unfollowed) {
      toast.success('🦄 Unfollowed successfully !');
      this.getNewData(username);
    } else if (followed) {
      toast.success('🦄 Followed successfully !');
      this.getNewData(username);
    } else if (deleted) {
      toast.success('🦄 Deleted successfully !');
      getProfileData();
      this.forceUpdate();
    } else if (deleteFailed) {
      toast.error('Failed to delete please reload the page!');
      getProfileData(username);
    }
  }

  /**
   *handles the ochange event from input fields
   *and modify the state accordingly
   * @memberof UpdateProfile
   */
  onChange = async (event) => {
    const { target } = event;
    event.preventDefault();
    if (target.name === 'profileImage') {
      this.setState((prevState) => {
        const { temporally } = prevState;
        return { temporally: { ...temporally, [target.name]: target.files[0] } };
      });
    } else {
      this.setState((prevState) => {
        const { temporally } = prevState;
        return { temporally: { ...temporally, [target.name]: target.value } };
      });
    }
  };

  getNewData = (username) => {
    const {
      getFollowing: getFollowingData,
      getFolowers: getFolowersData
    } = this.props;
    getFollowingData(username);
    getFolowersData(username);
    this.forceUpdate();
  };

  submitProfile = (event) => {
    event.preventDefault();
    const { updateProfile: updateProfileAction } = this.props;
    const { temporally } = this.state;
    if (this.validator.allValid()) {
      updateProfileAction(temporally);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  removeBookmark = (slug) => {
    const { removeBookmark: removeBookmarkAction } = this.props;
    removeBookmarkAction(slug);
  };

  unfollow = (username) => {
    const { unfollow: unfollowAction } = this.props;
    unfollowAction(username);
  };

  render() {
    const {
      profile,
      follower,
      following,
      bookmarks,
      owner,
      follow: followAction,
      deleteArticle: deleteArticleAction
    } = this.props;

    const { temporally } = this.state;
    return !_.isEmpty(profile) && follower && bookmarks && following ? (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-container row p-0" style={{ marginTop: '48px' }}>
                <div className="profile-container__cover">
                  <ReactImageFallback
                    src={profile.profileImage}
                    fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
                    className="profile-container__cover--image"
                  />
                  {owner === true && (
                    <i
                      className="fa fa-user-edit m-3 float-right"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      aria-hidden="true"
                      style={{ color: 'white' }}
                    />
                  )}
                  {' '}
                </div>
                <div className="profile-container__details m-4">
                  <p className="text-center">{`@${profile.username}`}</p>
                  {profile.address && (
                    <p>
                      <i className="fa fa-map-marker-alt mr-3" aria-hidden="true" />
                      <span className="text-primary">{profile.address}</span>
                    </p>
                  )}

                  {profile.phoneNumber && (
                  <p>
                    <i className="fa fa-phone-square mr-3" aria-hidden="true" />
                    {profile.phoneNumber}
                  </p>
                  )}
                  <p className="profile-container__details-bio">
                    {profile.bio}
                  </p>
                  {profile.gender && (
                    <p>
                      <i className="fa fa-venus-mars mr-3" aria-hidden="true" />
                      {profile.gender}
                    </p>
                  )}

                  <p>
                    <i className="fa fa-envelope-square mr-3" aria-hidden="true" />
                    {profile.email}
                  </p>
                </div>
              </div>
              <div className="row mr-2 text-center">
                <div className="profile-stat col-4 mt-3">
                  <p>Articles</p>
                  <p>{profile.Articles.length}</p>
                </div>
                <div className="profile-stat col-4 mt-3">
                  <p>Following</p>
                  <p>{numeral(following ? following.following.length : 0).format('0a')}</p>
                </div>
                <div className="profile-stat col-4 mt-3">
                  <p>Followers</p>
                  <p>{numeral(follower ? follower.followers.length : 0).format('0a')}</p>
                </div>
              </div>
              <div className="row ">
                {/* eslint-disable-next-line no-nested-ternary */}
                {!owner ? (
                  compare(localStorage.getItem('username'), follower.followers, 'follower') ? (
                    <button
                      type="button"
                      className="btn col-12 profile-follow unfollow w-1 m-2 p-2"
                      onClick={() => this.unfollow(profile.username)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn col-12 profile-follow follow w-1 m-2 p-2"
                      onClick={() => followAction(profile.username)}
                    >
                      Follow
                    </button>
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
            <UpdateProfileForm
              profile={temporally}
              onChange={this.onChange}
              submitProfile={this.submitProfile}
              validator={this.validator}
            />
            <div className="col-md-8 mt-5 profile_tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link tabMenu-link1 tab-link active"
                    data-toggle="tab"
                    href="#home"
                  >
                    Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tabMenu-link2 tab-link" data-toggle="tab" href="#menu1">
                    Bookmarks
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tabMenu-link3 tab-link" data-toggle="tab" href="#menu2">
                    Followers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tabMenu-link3 tab-link" data-toggle="tab" href="#menu3">
                    Following
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div id="home" className="container tab-pane active">
                  {profile.Articles.map(article => (
                    (article.status === 'draft'
                    && owner) ? (
                      <SingleArticle
                        article={article}
                        owner={owner}
                        deleteArticleAction={deleteArticleAction}
                      />
                      ) : (article.status !== 'draft') && (
                        <SingleArticle
                          article={article}
                          owner={owner}
                          deleteArticleAction={deleteArticleAction}
                        />
                      )
                  ))}
                </div>

                <div id="menu1" className="container tab-pane fade">
                  <Bookmark data={bookmarks} remove={this.removeBookmark} owner={owner} />
                </div>

                <div id="menu2" className="container tab-pane fade">
                  <Followers
                    follower={follower}
                    unfollow={this.unfollow}
                    following={following.following}
                    follow={followAction}
                    owner={owner}
                  />
                </div>
                <div id="menu3" className="container tab-pane fade">
                  <Following unfollow={this.unfollow} following={following} owner={owner} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    ) : (
      <Loader />
    );
  }
}

Profile.propTypes = {
  getProfile: propTypes.func.isRequired,
  profile: propTypes.object,
  follower: propTypes.object,
  following: propTypes.object,
  getFolowers: propTypes.func.isRequired,
  getFollowing: propTypes.func.isRequired,
  getBookMarks: propTypes.func.isRequired,
  updated: propTypes.bool,
  bookmarks: propTypes.object,
  updateProfile: propTypes.func.isRequired,
  remove: propTypes.bool,
  history: propTypes.object,
  unfollowed: propTypes.bool,
  followed: propTypes.bool,
  deleted: propTypes.bool,
  deleteFailed: propTypes.bool,
  removeBookmark: propTypes.func.isRequired,
  unfollow: propTypes.func.isRequired,
  follow: propTypes.func.isRequired,
  owner: propTypes.bool,
  deleteArticle: propTypes.func
};
export const mapStateToProps = state => ({
  user: state.authReducer.user,
  owner: state.profile.owner,
  profile: state.profile.data,
  follower: state.profile.follower,
  following: state.profile.following,
  updated: state.profile.updated,
  bookmarks: state.profile.bookmarks,
  remove: state.profile.remove,
  unfollowed: state.profile.unfollow,
  followed: state.profile.follow,
  deleted: state.profile.deleted,
  deleteFailed: state.profile.deleteFailed
});

export default connect(mapStateToProps,
  {
    getProfile,
    getFolowers,
    getFollowing,
    updateProfile,
    getBookMarks,
    removeBookmark,
    unfollow,
    follow,
    deleteArticle
  })(Profile);
