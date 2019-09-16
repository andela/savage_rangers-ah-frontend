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
import Report from '../ReportArticle/ReportArticle';
import Ratings from './Ratings';

const { hasBookmarked } = bookmarkActions;

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
      isAuthor: false,
      token: localStorage.getItem('token')
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
    const { token } = this.state;
    if (token) {
      this.fetchBookmark(slug);
    }
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
      const { token } = this.state;
      if (token) {
        const { username } = this.state;
        const { user: author } = jwt(token);
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
      this.fetchBookmark(slug);
    }
  }

  fetchBookmark = (slug) => {
    const { hasBookmarked: hasBookmarkedInfo } = this.props;
    hasBookmarkedInfo(slug);
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

    const { isBookmarked } = this.props;

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
                  {username && (
                    <Bookmark username={username} slug={slug} bookmarked={isBookmarked} />
                  )}
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
                    slug={slug}
                    bookmarked={isBookmarked}
                  />
                  <div className="row">
                    <div className="col-lg-6 col-xl-6">
                      {!isAuthor && <Ratings articleSlug={slug} />}
                    </div>
                    <div className="col-lg-6 col-xl-6 report-article-custom">
                      <Report
                        isAuthor={this.state.isAuthor}
                        slug={slug}
                        history={this.props.history}
                      />
                    </div>
                  </div>
                  <div className="small-share">
                    <ArticleSocialSharing slug={slug} title={title} />
                  </div>
                  <Comment slug={slug} history={this.props.history} />
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
  hasBookmarked: propTypes.func.isRequired,
  bookmarked: propTypes.bool.isRequired,
  isBookmarked: propTypes.bool
};

export const mapStateToProps = state => ({
  article: state.readArticle.article,
  tags: state.readArticle.tags,
  popularArticle: state.populars.Articles,
  isBookmarked: state.bookmark.isBookmarked,
  bookmarked: state.bookmark.bookmarked
});

export default connect(mapStateToProps,
  {
    readArticle,
    getTags,
    readPopularArticle,
    hasBookmarked,
    getAllComments
  })(ReadArticle);
