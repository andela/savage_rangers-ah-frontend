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
import {
  createArticle as firstDraft,
  categories as getCategories,
  getTags,
  changeState,
  drafting,
  publish
} from '../../../Redux/Actions/articles';
import imageUploader from '../../../Helpers/image-upload';

export class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tags: [],
      imgUrl: null,
      isCoverImage: false,
      stateTags: [],
      initialState: null,
      published: false,
      article: {}
    };

    // eslint-disable-next-line react/destructuring-assignment
    this.props.getCategories();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getTags();
    /* istanbul ignore next */
    this.autosaveFunctionality = setInterval(() => {
      const { initialState, stateTags, article } = this.state;
      const { firstDraft: createFirstDraft, drafting: autosaveArticle } = this.props;
      const keys = Object.keys(article);
      if (keys.length !== 1) {
        if (initialState === null) {
          createFirstDraft(article)
            .then(() => {
              const { savedArticle } = this.props;
              const patchableArticle = {
                ...savedArticle.article,
                tags: stateTags
              };
              this.setState({
                initialState: patchableArticle,
                article: patchableArticle
              });
              toast.success('Article saved successfully');
            })
            .catch(() => {
              const { errorMessage } = this.props;
              toast.warn(errorMessage);
            });
        } else {
          autosaveArticle(article)
            .then(() => {
              const { autoSave } = this.props;
              toast.success(autoSave);
            })
            .catch(() => {
              const { errorMessage } = this.props;
              toast.warn(errorMessage);
            });
        }
      }
    }, 15000);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.autosaveFunctionality;
  }

  componentWillReceiveProps({ listOfCategories, listOfTags }) {
    this.setState({ categories: listOfCategories, tags: listOfTags });
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
      this.setState({ article: { ...value } });
    } else {
      this.setState({ article: { ...article, ...value } });
    }
  };

  addContent = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      this.articleContentUpdater(this.state, { [name]: Number(value) });
    } else {
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
      imgUrl, tags, categories, published
    } = this.state;
    if (published) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <Navbar />
        <div className="page__label">
          <p className="page__label--text">Write Article</p>
        </div>
        <div className="container create">
          <div className="form-group category">
            <select
              name="category"
              className="selectpicker category__selector"
              onChange={e => this.addContent(e)}
              data-live-search="true"
            >
              <option defaultValue>Select Category</option>
              {categories.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                  id={`category-${category.id}`}
                  data-tokens={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" />
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={e => this.addContent(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              onChange={e => this.addContent(e)}
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
            <label htmlFor="tags">Tags</label>
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
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}

CreateArticle.propTypes = {
  savedArticle: propTypes.object,
  errorMessage: propTypes.string,
  publish: propTypes.func,
  firstDraft: propTypes.func,
  drafting: propTypes.func,
  autoSave: propTypes.string,
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
  errorMessage: state.article.error
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
