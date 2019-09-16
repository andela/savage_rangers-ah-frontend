/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import SimplexEditor from 'simple-react-editor';
import Tagify from 'react-tagify-section';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import Loader from '../Common/loader';
import {
  createArticle as firstDraft,
  categories as getCategories,
  getTags,
  changeState,
  drafting,
  publish
} from '../../../Redux/Actions/articles';
import imageUploader from '../../../Helpers/image-upload';
import Selector from './Selector';
import 'simple-react-editor/dist/index.css';

export class CreateArticle extends Component {
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
      isChanged: false
    };

    /* istanbul ignore next */
    this.autosaveFunctionality = setInterval(() => {
      const {
        initialState, isChanged, stateTags, article
      } = this.state;
      const { firstDraft: createFirstDraft, drafting: autosaveArticle } = this.props;
      const keys = Object.keys(article);
      if (keys.length !== 1) {
        if (initialState === null) {
          createFirstDraft(article).then(() => {
            const { savedArticle } = this.props;
            const allowed = [
              'id',
              'title',
              'description',
              'body',
              'slug',
              'readTime',
              'coverImage',
              'author',
              'category',
              'status',
              'createdAt',
              'updatedAt',
              'deletedAt',
              'Category',
              'User'
            ];

            const filteredArticle = Object.keys(savedArticle.article)
              .filter(key => allowed.includes(key))
              .reduce((obj, key) => {
                obj[key] = savedArticle.article[key];
                return obj;
              }, {});
            const patchableArticle = {
              ...filteredArticle,
              tags: stateTags
            };
            this.setState({
              initialState: patchableArticle,
              article: patchableArticle,
              isChanged: false
            });
          });
        } else if (isChanged === true) {
          autosaveArticle(article);
          this.setState({ isChanged: false });
        }
      }
    }, 6000);
  }

  componentWillMount() {
    const { getCategories, getTags } = this.props;

    getCategories();
    getTags();

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.autosaveFunctionality;
  }

  componentWillReceiveProps({ listOfCategories, listOfTags }) {
    if (listOfCategories && listOfTags) {
      this.setState({
        categories: listOfCategories,
        tags: listOfTags
      });
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
    const { publish } = this.props;
    const { article } = this.state;

    publish(article)
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
      imgUrl, tags, categories, published, isLoading, article
    } = this.state;
    if (published) {
      return <Redirect to={`/articles/${article.slug}`} />;
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
              <Selector categories={categories} addContent={this.addContent} editMode="false" />
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
                <div className={imgUrl ? 'hidden' : 'btn btn-cover'} id="output">
                  <p>Cover image</p>
                </div>
                <img id="output-header" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="editor">Body</label>
              <SimplexEditor getArticle={this.addArticleToState} />
            </div>
            <div className="form-group">
              <label htmlFor="tags" className="required">
                Tags
              </label>
              <Tagify tags={tags} getTagList={this.addTags} />
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
          <Footer />
        </div>
      );
    }
    return <Loader />;
  }
}

CreateArticle.propTypes = {
  savedArticle: propTypes.object,
  publish: propTypes.func,
  firstDraft: propTypes.func,
  drafting: propTypes.func,
  listOfCategories: propTypes.array,
  listOfTags: propTypes.array,
  getCategories: propTypes.func,
  getTags: propTypes.func
};

export const mapStateToProps = state => ({
  listOfCategories: state.article.categories,
  listOfTags: state.article.tags,
  savedArticle: state.article.createdArticle,
  autoSave: state.article.updatedArticle,
  errorMessage: state.article.error,
  articleTags: state.getArticle.tags
});

export default connect(mapStateToProps,
  {
    firstDraft,
    getCategories,
    getTags,
    changeState,
    drafting,
    publish
  })(CreateArticle);
