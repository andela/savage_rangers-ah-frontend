/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Popular from '../Popular/popular';
import ReadArticleActions from '../../../Redux/Actions/readArticleActions';
import PopularArticleAction from '../../../Redux/Actions/readPopularActions';
import ArticleNotFound from '../ArticleNotFound/ArticleNotFound';
import BreadCrumb from './breadCrumb';
import ArticleBody from './articleBody';
import Loader from '../Common/loader';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';

const { readArticle, getTags } = ReadArticleActions;
const { readPopularArticle } = PopularArticleAction;

export class ReadArticle extends Component {
  state = { tags: [], isLoading: true, articles: [{ title: '', User: {}, Category: {} }] }

  componentWillMount() {
    const {
      readArticle: readArticles,
      getTags: getTag,
      readPopularArticle: readPopular
    } = this.props;
    const { match: { params: { slug } } } = this.props;
    readArticles(slug);
    getTag(slug);
    readPopular();
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
        profileImage: nextProps.article.User.profileImage
      });
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
  }

  render() {
    const {
      category, title, body, readTime, tags,
      createdAt, coverImage,
      firstName, lastName, profileImage, slug, isLoading, articles
    } = this.state;

    return isLoading ? <Loader /> : (
      <React.Fragment>
        {
          !slug ? <ArticleNotFound /> : (
            <div>
              <Navbar />
              <BreadCrumb category={category} />
              <div className="container article">
                <div className="row">
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
                  />

                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12">
                    <Popular articles={articles} />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )
        }
      </React.Fragment>
    );
  }
}
ReadArticle.propTypes = { article: propTypes.object, tags: propTypes.object };
export const mapStateToProps = state => ({
  article: state.readArticle.article,
  tags: state.readArticle.tags,
  popularArticle: state.populars.Articles
});
export default connect(mapStateToProps, { readArticle, getTags, readPopularArticle })(ReadArticle);
