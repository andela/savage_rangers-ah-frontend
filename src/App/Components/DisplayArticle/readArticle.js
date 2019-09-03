/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import jwt from 'jwt-decode';
import ReadArticleActions from '../../../Redux/Actions/readArticleActions';
import PopularArticleAction from '../../../Redux/Actions/readPopularActions';
import CommentAction from '../../../Redux/Actions/getAllComments';
import ArticleNotFound from '../ArticleNotFound/ArticleNotFound';
import BreadCrumb from './breadCrumb';
import ArticleBody from './articleBody';
import Loader from '../Common/loader';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import BottomPopular from '../Popular/bottom-popular';
import bookmarkActions from '../../../Redux/Actions/bookmark';
import Comment from '../Comment/comment.holder';
import ArticleSocialSharing from '../ArticleSocialSharing/ArticleSocialSharing';
import Bookmark from '../Common/Bookmark/Bookmark';

const { getBookMarks } = bookmarkActions;

const { readArticle, getTags } = ReadArticleActions;
const { readPopularArticle } = PopularArticleAction;
const { getAllComments } = CommentAction;

export class ReadArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      isLoading: true,
      articles: [{ title: '', User: {}, Category: {} }],
      isAuthor: false
    };
  }

  componentDidMount() {
    const {
      readArticle: readArticles,
      getTags: getTag,
      readPopularArticle: readPopular,
      getAllComments: readCommentArticle
    } = this.props;
    const { match: { params: { slug } } } = this.props;
    readArticles(slug);
    getTag(slug);
    readPopular();
    this.fetchBookmark();
    readCommentArticle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article) {
      this.setState({
        slug: nextProps.article.slug,
        category: nextProps.article.Category.name,
        title: nextProps.article.title,
        body: nextProps.article.body,
        readTime: nextProps.article.readTime,
        createdAt: nextProps.article.createdAt,
        coverImage: nextProps.article.coverImage,
        firstName: nextProps.article.User.firstName,
        lastName: nextProps.article.User.lastName,
        profileImage: nextProps.article.User.profileImage,
        username: nextProps.article.User.username
      });
      if (localStorage.getItem('token')) {
        const { username } = this.state;
        const { user: author } = jwt(localStorage.getItem('token'));
        if (author.username === username) {
          this.setState({ isAuthor: true });
        }
      }
    }

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);

    if (nextProps.tags) {
      this.setState({ tags: nextProps.tags.data });
    }

    if (nextProps.popularArticle) {
      this.setState({ articles: nextProps.popularArticle.data });
    }

    const { readArticle: readArticles, getTags: getTag } = this.props;
    const { params: { slug } } = nextProps.match;

    if (nextProps.match.params.slug !== this.state.slug && this.state.slug) {
      this.setState({ isLoading: true });
      readArticles(slug);
      getTag(slug);
    }
    if (nextProps.bookmarked) {
      this.fetchBookmark();
    }
  }

  fetchBookmark = () => {
    const { user: { username } } = jwt(localStorage.getItem('token'));
    const { getBookMarks: getBookMarksData } = this.props;
    getBookMarksData(username);
  };

  render() {
    const {
      category,
      title,
      body,
      readTime,
      tags,
      createdAt,
      coverImage,
      firstName,
      lastName,
      profileImage,
      slug,
      isLoading,
      articles,
      username,
      isAuthor
    } = this.state;

    const authorCredential = { isAuthor, slug };

    const { bookmarks } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <React.Fragment>
        {!slug ? (
          <ArticleNotFound content="ARTICLE NOT FOUND" />
        ) : (
          <div>
            <Navbar />
            <BreadCrumb category={category} />
            <div className="container article">
              <div className="row">
                <div className="col-lg-1 col-sm-12 large-share">
                  <ArticleSocialSharing slug={slug} title={title} />
                  {username && <Bookmark username={username} slug={slug} bookmarks={bookmarks} />}
                </div>
                <div className="col-lg-11 col-sm-12">
                  <ArticleBody
                    title={title}
                    body={body}
                    readTime={readTime}
                    tags={tags}
                    createdAt={createdAt}
                    coverImage={coverImage}
                    firstName={firstName}
                    lastName={lastName}
                    profileImage={profileImage}
                    username={username}
                    authorCredential={authorCredential}
                  />
                  <div className="small-share">
                    <ArticleSocialSharing slug={slug} title={title} />
                  </div>
                  <Comment slug={slug} />
                  <BottomPopular articles={articles} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </React.Fragment>
    );
  }
}
ReadArticle.propTypes = {
  article: propTypes.object,
  tags: propTypes.object,
  getBookMarks: propTypes.func.isRequired,
  bookmarked: propTypes.bool.isRequired,
  bookmarks: propTypes.array
};
export const mapStateToProps = state => ({
  article: state.readArticle.article,
  tags: state.readArticle.tags,
  popularArticle: state.populars.Articles,
  bookmarks: state.bookmark.bookmarks,
  bookmarked: state.bookmark.bookmarked
});
export default connect(mapStateToProps,
  {
    readArticle,
    getTags,
    readPopularArticle,
    getBookMarks,
    getAllComments
  })(ReadArticle);
