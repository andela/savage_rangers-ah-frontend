/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import ReactImageFallback from 'react-image-fallback';
import Popular from '../Popular/popular';
import Actions from '../../../Redux/Actions/readArticleActions';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';

const { readArticle, getTags } = Actions;

export class ReadArticle extends Component {
  state = { tags: [] }

  componentWillMount() {
    const { readArticle: readArticles, getTags: getTag } = this.props;
    const { match: { params: { slug } } } = this.props;
    readArticles(slug);
    getTag(slug);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.article && nextProps.tags) {
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
        tags: nextProps.tags.data
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { readArticle: readArticles, getTags: getTag } = this.props;
    const { params: { slug } } = nextProps.match;
    if (nextProps.match.params.slug !== this.state.slug) {
      readArticles(slug);
      getTag(slug);
    }
  }

  render() {
    const {
      category, title, body, readTime, tags,
      createdAt, coverImage,
      firstName, lastName, profileImage
    } = this.state;
    const formattedDate = moment(createdAt).format('Do MMM YYYY');
    return (
      <React.Fragment>
        <Navbar />
        <div className="page__label col-lg-2">
          <p className="page__label--text">Articles</p>
          <div className="category-p">
            <p className="category-p__label">CATEGORY</p>
          </div>
          <div className="category-t">
            <p className="category-t__label">{category}</p>
          </div>
        </div>
        <div className="container article">
          <div className="row">
            {/* <div className="article__icons col-lg-1">
              <button type="button" className="article__rating">
                <i className="fas fa-star" id="star" />
              </button>
              <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'} id="bookmark" />
            </div> */}
            <div className="col-sm-9 col-md-12 col-lg-9">
              <div className="article__data">
                <h2 className="article__description">{title}</h2>
                <div className="article__profileDetails">
                  <ReactImageFallback className="article__imgProfile" src={profileImage} fallbackImage="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profilePic" title="profile" />
                  <p to="/" className="article__nameDetails">{`${firstName} ${lastName}`}</p>
                  <p to="/" className="article__dateDetails">{formattedDate}</p>
                  <p to="/" className="article__minDetails">
                    {readTime}
                    {' '}
                    min
                  </p>
                </div>
                <div className="DraftEditor-root">
                  <div className="DraftEditor-editorContainer">
                    <div className="ml-0.5">{<ReactImageFallback className="DraftEditor-coverImage ml-1" src={coverImage} fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg" alt="coverImage" />}</div>
                    <div className="public-DraftEditor-content">
                      {ReactHtmlParser(body)}
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  {
                    tags.map(item => (
                      <div key={item.id} className="article__tags">
                        {item.name}
                      </div>
                    ))
                  }

                </div>
              </div>
            </div>
            <Popular />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
ReadArticle.propTypes = { article: propTypes.object, tags: propTypes.object };
export const mapStateToProps = state => ({ article: state.readArticle.article, tags: state.readArticle.tags });
export default connect(mapStateToProps, { readArticle, getTags })(ReadArticle);
