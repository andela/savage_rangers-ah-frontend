import React, { Component } from 'react';
import propTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import Rater from 'react-rater';
import _ from 'underscore';
import countRating from '../../../Helpers/countRating';
import profileActions from '../../../Redux/Actions/Profile';
import NavBar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import UpdateProfileForm from './UpdateProfileForm';
import Bookmark from './BookMark';
/**
 * User's registration component
 *
 * @export
 * @class Profile
 * @extends {Component}
 * @author Alain burindi
 */

const {
  getProfile, getFolowers, getFollowing, updateProfile, getBoooMarks
} = profileActions;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.validator = new SimpleReactValidator({ locale: 'en' });
  }

  async componentDidMount() {
    const {
      getProfile: getProfileData,
      getFolowers: getFolowersData,
      getFollowing: getFollowingData,
      getBoooMarks: getBoooMarksData
    } = this.props;
    getProfileData();
    getFolowersData();
    getFollowingData();
    getBoooMarksData();
  }

  /**
   * will be executed whenever a new prop is added to the component
   *
   * @param {*} { user, error }
   * @memberof Profile
   */
  async componentWillReceiveProps({ profile, updated }) {
    const { Articles, ...temporally } = profile;
    const { getProfile: getProfileData } = this.props;
    this.setState({ temporally });
    if (updated) {
      getProfileData();
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

  render() {
    const {
      profile, follower, following, bookmarks
    } = this.props;
    console.log(bookmarks);

    const { temporally } = this.state;

    return !_.isEmpty(profile) ? (
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
                  <i
                    className="fa fa-user-edit m-3 float-right"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    aria-hidden="true"
                    style={{ color: 'white' }}
                  />
                  {' '}
                </div>
                <div className="profile-container__details m-4">
                  <p className="text-center">{`@${profile.username}`}</p>
                  <p>
                    <i className="fa fa-map-marker-alt mr-3" aria-hidden="true" />
                    <span className="text-primary">{profile.address || 'empty'}</span>
                  </p>
                  <p>
                    <i className="fa fa-phone-square mr-3" aria-hidden="true" />
                    {profile.phoneNumber || 'empty'}
                  </p>
                  <p>
                    bio: &lsquo;&lsquo;
                    {profile.bio || 'empty'}
                    &rsquo;&rsquo;
                  </p>
                  <p>
                    <i className="fa fa-venus-mars mr-3" aria-hidden="true" />
                    {profile.gender || 'empty'}
                  </p>
                  <p>
                    <i className="fa fa-envelope-square mr-3" aria-hidden="true" />
                    {profile.email || 'empty'}
                  </p>
                </div>
              </div>
              <div className="row mr-2 text-center">
                <div className="col-4 mt-3">
                  <p>Articles</p>
                  <p>{profile.Articles.length}</p>
                </div>
                <div className="col-4 mt-3">
                  <p>Following</p>
                  <p>{numeral(following ? following.following.length : 0).format('0a')}</p>
                </div>
                <div className="col-4 mt-3">
                  <p>Followers</p>
                  <p>{numeral(follower ? follower.followers.length : 0).format('0a')}</p>
                </div>
              </div>
            </div>
            <UpdateProfileForm
              profile={temporally}
              onChange={this.onChange}
              submitProfile={this.submitProfile}
              validator={this.validator}
            />
            <div className="col-8 mt-5">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link tabMenu-link1" data-toggle="tab" href="#home">
                    Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tabMenu-link2 active" data-toggle="tab" href="#menu1">
                    Bookmarks
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link tabMenu-link3" data-toggle="tab" href="#menu2">
                    Followers
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div id="home" className="container tab-pane fade">
                  {profile.Articles.map(article => (
                    <div key={article.id} className="row single-article mt-4">
                      <div className="single-article-header mt-3 row col-12">
                        <p
                          className="col-11"
                          style={{ fontFamily: 'lato', fontSize: '22px', color: 'black' }}
                        >
                          {moment(article.createdAt).format('MMM YYYY')}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {`${article.readTime} min read`}
                        </p>

                        <div className="btn-group dropleft">
                          <i
                            className="fa fa-ellipsis-v mt-1 ml-5"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontSize: '23px', color: 'black' }}
                          />

                          <div className="dropdown-menu mt-4">
                            <a className="dropdown-item" href={`articles/${article.slug}/edit`}>
                              Edit
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="/delete">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <ReactImageFallback
                        src={article.coverImage}
                        fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
                        className="img-fluid w-100 single-article-image"
                        style={{ width: '150px', height: '370px' }}
                      />
                      <h2 className="m-3 single-article-title" style={{ fontFamily: 'lato' }}>
                        {article.title}
                      </h2>
                      <p className="m-1 col-12" style={{ fontFamily: 'STSong', fontSize: '22px' }}>
                        {`${article.body.substring(0, 170)}...`}
                      </p>

                      <div className="row ml-4 mt-4 col-12">
                        <Rater
                          total={5}
                          rating={article.rating !== 0 ? countRating(article.rating.statistics) : 0}
                          interactive
                        />
                        <p className="ml-5 mb-4">
                          [
                          {article.rating.allUsers || 0}
/
                          {article.statistics.stats.reads}
]
                        </p>
                        <p className="single-article-status">
                          Status:
                          {' '}
                          <span
                            className={`${
                              article.status === 'published' ? 'text-success' : 'text-danger'
                            }`}
                          >
                            {article.status}
                          </span>
                          {' '}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div id="menu1" className="container tab-pane active">
                  <Bookmark data={bookmarks} />
                </div>

                <div id="menu2" className="container tab-pane fade">
                  <h3>Menu 2</h3>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      ''
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
  getBoooMarks: propTypes.func.isRequired,
  updated: propTypes.bool,
  bookmarks: propTypes.object,
  updateProfile: propTypes.func.isRequired
};
export const mapStateToProps = state => ({
  profile: state.profile.data,
  follower: state.profile.follower,
  following: state.profile.following,
  updated: state.profile.updated,
  bookmarks: state.profile.bookmarks
});

export default connect(mapStateToProps,
  {
    getProfile,
    getFolowers,
    getFollowing,
    updateProfile,
    getBoooMarks
  })(Profile);
