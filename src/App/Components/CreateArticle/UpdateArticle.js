/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import jwt from 'jwt-decode';

import SimplexEditor from 'simple-react-editor';
import Tagify from 'react-tagify-section';
import queryString from 'query-string';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import Loader from '../Common/loader';
import {
  categories as getCategories,
  getTags,
  changeState,
  drafting,
  publish
} from '../../../Redux/Actions/articles';
import updateArticle from '../../../Redux/Actions/getArticle';
import imageUploader from '../../../Helpers/image-upload';
import Selector from './Selector';
import NotFound from '../ArticleNotFound/ArticleNotFound';

const { getArticleDetail, getArticleTags, getDraftedArticle } = updateArticle;
export class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      categories: [],
      tags: [],
      imgUrl: null,
      isCoverImage: false,
      stateTags: [],
      initialState: null,
      published: false,
      isLoading: true,
      title: '',
      description: '',
      isChanged: false
    };

    /* istanbul ignore next */
    this.autosaveFunctionality = setInterval(() => {
      const {
        stateTags, article, imgUrl, isChanged
      } = this.state;
      const { drafting: autosaveArticle, match } = this.props;
      const { slug } = match.params;
      const data = {
        ...article, slug, tags: stateTags, coverImage: imgUrl
      };
      if (isChanged) {
        autosaveArticle(data);
        this.setState({ isChanged: false });
      }
    }, 6000);
  }

  componentWillMount() {
    const {
      getCategories,
      getArticleTags,
      getDraftedArticle,
      location,
      match,
      getArticleDetail,
      getTags
    } = this.props;

    getCategories();
    getTags();
    const { draft } = queryString.parse(location.search);
    const { slug } = match.params;

    if (draft === 'true') {
      getDraftedArticle(slug);
      getArticleTags(slug);
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    } else {
      getArticleDetail(slug);
      getArticleTags(slug);
      /* istanbul ignore next */
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.autosaveFunctionality;
  }

  componentWillReceiveProps({
    listOfCategories,
    listOfTags,
    articleToUpdate,
    articleTags,
    notFound
  }) {
    if (articleToUpdate && articleTags) {
      const cleanTagName = [];
      articleTags.data.map(tagName => cleanTagName.push(tagName.name));
      if (localStorage.getItem('token')) {
        const { username } = articleToUpdate.User;
        const { user: author } = jwt(localStorage.getItem('token'));
        if (author.username === username) {
          this.setState({ isAuthor: true });
        } else {
          this.setState({ isAuthor: false });
        }
      }
      this.setState({
        categories: listOfCategories,
        tags: listOfTags,
        articleToUpdate,
        stateTags: cleanTagName,
        title: articleToUpdate.title,
        description: articleToUpdate.description,
        imgUrl: articleToUpdate.coverImage
      });
      /* istanbul ignore next */
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    } else {
      this.setState({ notFound });
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    clearInterval(this.autosaveFunctionality);
  }

  getImgUrl = (e) => {
    this.setState({ imgUrl: null });
    const input = e.target;
    const reader = new FileReader();
    /* istanbul ignore next */
    reader.onload = () => {
      const dataUrl = reader.result;
      const output = document.getElementById('output-header');
      output.src = dataUrl;
    };

    reader.readAsDataURL(input.files[0]);
    imageUploader(e).then((res) => {
      this.setState({ isCoverImage: true, imgUrl: res });
      this.articleContentUpdater(this.state, { coverImage: res });
    });
  };

  articleContentUpdater = (state, value) => {
    const { article } = state;
    if (_.isEmpty(article)) {
      this.setState({ article: { ...value }, isChanged: true });
    } else {
      this.setState({ article: { ...article, ...value }, isChanged: true });
    }
  };

  addContent = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      this.articleContentUpdater(this.state, { [name]: Number(value) });
    } else {
      if (e.target.name === 'title') {
        this.setState({ title: e.target.value });
      }
      if (e.target.name === 'description') {
        this.setState({ description: e.target.value });
      }
      this.articleContentUpdater(this.state, { [name]: value });
    }
  };

  addTags = (value) => {
    this.articleContentUpdater(this.state, { tags: value });
    this.setState({ stateTags: value });
  };

  addArticleToState = (value) => {
    this.articleContentUpdater(this.state, { body: value });
  };

  publishArticle = () => {
    const { publish, match } = this.props;
    const { article, imgUrl } = this.state;
    let data = {};

    const { slug } = match.params;
    data = { ...article, slug, coverImage: imgUrl };

    publish(data)
      .then((res) => {
        toast.success(res.payload);
        /* istanbul ignore next */
        setTimeout(() => {
          clearInterval(this.autosaveFunctionality);
          this.setState({ published: true });
        }, 2000);
      })
      .catch(() => {
        toast.warn("Ooops, can't publish at the moment, try again in a minute");
      });
  };

  render() {
    const {
      imgUrl,
      tags,
      categories,
      published,
      articleToUpdate,
      stateTags,
      isLoading,
      title,
      description,
      notFound,
      isAuthor
    } = this.state;
    if (published) {
      return <Redirect to={`/articles/${articleToUpdate.slug}`} />;
    }
    if (notFound) {
      return <NotFound content={notFound} />;
    }
    if (isAuthor === false) {
      return <Redirect to={`/articles/${articleToUpdate.slug}`} />;
    }

    if (!isLoading) {
      return (
        <div>
          <Navbar />
          <div className="page__label">
            <p className="page__label--text">Write Article</p>
          </div>
          <div className="container create">
            <div className="form-group category-dropdown">
              <Selector
                categories={categories}
                addContent={this.addContent}
                editMode="true"
                categoryId={articleToUpdate.category}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="title" className="required">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                onChange={e => this.addContent(e)}
                value={title}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="required">
                Description:
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control"
                onChange={e => this.addContent(e)}
                value={description}
                required
              />
            </div>
            <div className="form-group cover-image">
              <label htmlFor="cover-image" className="image-icon">
                <i className="fas fa-camera" />
              </label>
              <input
                type="file"
                name="cover-image"
                id="cover-image"
                accept="image/*"
                onChange={e => this.getImgUrl(e)}
                required
              />
              <label htmlFor="cover-image">
                <div className={imgUrl ? '' : 'white-cover'} id="white-cover" />
                <div
                  className={imgUrl ? 'hidden' : 'btn btn-cover'}
                  id="output"
                >
                  <p>Cover image</p>
                </div>
                <img id="output-header" src={imgUrl} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="editor">Body</label>
              <SimplexEditor
                getArticle={this.addArticleToState}
                content={articleToUpdate.body}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags" className="required">
                Tags
              </label>
              <Tagify
                tags={tags}
                getTagList={this.addTags}
                existingTags={stateTags}
              />
            </div>
            <div className="text-center">
              <button
                onClick={() => this.publishArticle()}
                className="btn btn-button"
                type="button"
                id="published"
              >
                Save article
              </button>
            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>
      );
    }
    return <Loader />;
  }
}

UpdateArticle.propTypes = {
  publish: propTypes.func,
  drafting: propTypes.func,
  listOfCategories: propTypes.array,
  listOfTags: propTypes.array,
  getCategories: propTypes.func,
  articleToUpdate: propTypes.object,
  getArticleTags: propTypes.func,
  getArticleDetail: propTypes.func,
  getDraftedArticle: propTypes.func,
  match: propTypes.object,
  articleTags: propTypes.array,
  getTags: propTypes.func,
  notFound: propTypes.string

};

export const mapStateToProps = state => (
  {
    listOfCategories: state.article.categories,
    listOfTags: state.article.tags,
    savedArticle: state.article.createdArticle,
    autoSave: state.article.updatedArticle,
    errorMessage: state.article.error,
    articleToUpdate: state.getArticle.article,
    articleTags: state.getArticle.tags,
    notFound: state.getArticle.notFound
  });

export default connect(mapStateToProps,
  {
    getCategories,
    getTags,
    changeState,
    drafting,
    publish,
    getArticleDetail,
    getArticleTags,
    getDraftedArticle
  })(UpdateArticle);
