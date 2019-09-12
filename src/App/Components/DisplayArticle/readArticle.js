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
import HighlightArticle from './HighlightArticle';
import getHighlight from '../../../Redux/Actions/getHighlight';
import postHighlight from '../../../Redux/Actions/postHighlight';

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
      getAllComments: readCommentArticle,
      getHighlight: fetchHighlight
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
    fetchHighlight(slug);
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

  componentDidUpdate = () => {
    const interval = setInterval(() => {
      const highlights = document.querySelectorAll('.highligthComment');
      if (highlights && highlights.length) {
        clearInterval(interval);
      }
      this.showHighlights();
    }, 1000);
  };

  showHighlights = () => {
    const { highlights } = this.props;
    const elements = document.querySelectorAll('.article__data *');
    let articleLength = document.querySelector('.article__data')
      && document.querySelector('.article__data').innerText
      && document.querySelector('.article__data').innerText.length;
    (elements || []).forEach((element) => {
      articleLength -= 1;
      const elementClass = element.getAttribute('class');
      if (elementClass && elementClass.includes('highligthComment')) {
        return element;
      }
      return element.setAttribute('id', `node-${articleLength}`);
    });

    (highlights || []).forEach(({
      startIndex, lastIndex, text, comment, nodeId
    }) => {
      if (document.querySelector(`#${nodeId}`) && document.querySelector(`#${nodeId}`).innerHTML) {
        const highlightedText = `<span
          class="highligthComment"
          style="background: green; cursor: pointer;"
          data-toggle="modal"
          data-target="#highlightDetailsModal"
          onclick="document.querySelector('#highlightDetailsModalBody').innerHTML = '${comment}'">
          ${text}
        </span>`;

        const updatedHtml = document
          .querySelector(`#${nodeId}`)
          .innerHTML.replace(text, highlightedText);

        document.querySelector(`#${nodeId}`).innerHTML = updatedHtml;
      }
    });
    return highlights;
  };

  fetchBookmark = (slug) => {
    const { hasBookmarked: hasBookmarkedInfo } = this.props;
    hasBookmarkedInfo(slug);
  };

  render() {
    const {
      category,
      title,
      readTime,
      body,
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
    const { postHighlight: highlightText } = this.props;

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
            <HighlightArticle slug={slug} postHighlight={highlightText} />
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
  bookmarks: propTypes.array,
  highlights: propTypes.array,
  getHighlight: propTypes.func,
  postHighlight: propTypes.func,
  isBookmarked: propTypes.bool
};

export const mapStateToProps = state => ({
  article: state.readArticle.article,
  tags: state.readArticle.tags,
  popularArticle: state.populars.Articles,
  bookmarks: state.bookmark.bookmarks,
  bookmarked: state.bookmark.bookmarked,
  highlights: state.highlight.highlights,
  isBookmarked: state.bookmark.isBookmarked,
  bookmarked: state.bookmark.bookmarked
});

export default connect(mapStateToProps,
  {
    readArticle,
    getTags,
    readPopularArticle,
    getAllComments,
    getHighlight,
    postHighlight,
    hasBookmarked,
    getAllComments
  })(ReadArticle);
