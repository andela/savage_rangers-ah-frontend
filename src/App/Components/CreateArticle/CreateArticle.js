import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Common/Navbar';
import Editor from '../Editor/Editor';
import imageUploader from '../../../Helpers/image-upload';
import Footer from '../Common/Footer';
import articleActions from '../../../Redux/Actions/articles';
import categoryActions from '../../../Redux/Actions/categories';
import _ from 'lodash';
import create from './createLogic/createLogic';

const { changeState } = articleActions;

export class CreateArticle extends Component {
  constructor() {
    super();
    this.state = {
      isCoverImage: false,
      noImg: null,
      imgUrl: null,
      initialState: null,
    };
  }
  componentDidMount(){
    categoryActions()
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
  getImgUrl = e => {
    this.setState({imgUrl: null});
    const input = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;
      const output = document.getElementById('output-header');
      output.src = dataUrl;
    }

    reader.readAsDataURL(input.files[0]);
    imageUploader(e).then(res => {
      this.setState({ isCoverImage: true, imgUrl: res });
      const { article } = this.props;
      if (_.isEmpty(article)) {
        this.props.changeState({ coverImage: res });
      } else {
        this.props.changeState({ ...article, cover: res });
      }
    });
  };

  addContent = (e, article) => {
    const { name, value } = e.target;
    if (_.isEmpty(article)) {
      this.props.changeState({
        [name]: value
      });
    } else {
      this.props.changeState({ ...article, [name]: value });
    }
  };

  render() {
    const { initialState, noImg, imgUrl } = this.state;
    const { article, changeState, categoryActions } = this.props;
    
    console.log(this.props)
    //  setInterval(()=> {
    //    if(initialState === null) {
    //     create.initialCreate({
    //       ...article,
    //       title: 'dk',
    //       description: 'bffkof',
    //       body: 'vfbfbfbb',
    //       tags: ['test']
    //     }).then(res => {
    //       this.setState({initialState: {...res}})
    //       console.log('creation')
    //     })
    //     .catch(error => console.log(error));
    //    } else {
    //      create.drafting({...initialState})
    //      .then(res=> {
    //        this.setState({initialState: { ...res }})
    //        console.log(initialState)
    //        console.log('patching', article);
    //      })
    //      .catch(error=> console.log(error.response))

    //    }
    //  },10000);

    return (
      <div>
        <Navbar />
        <div className='page__label'>
          <p className='page__label--text'>Write Article</p>
        </div>
        <div className='container'>
          <div className="form-group">

          </div>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              id='title'
              className='form-control'
              onChange={e => this.addContent(e, article)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <input
              type='text'
              name='description'
              id='description'
              className='form-control'
              onChange={e => this.addContent(e, article)}
            />
          </div>
          <div className='form-group cover-image'>
            <label htmlFor='cover-image' className='image-icon'>
              <i className='fas fa-camera' />
            </label>
            <input
              type='file'
              name='cover-image'
              id='cover-image'
              accept='image/*'
              onChange={e => this.getImgUrl(e)}
            />
            <label htmlFor='cover-image'>
              <div 
              className={imgUrl ? '' : 'white-cover'} 
              id='white-cover'></div>
              <div className={imgUrl ? 'hidden' : 'btn btn-cover'} id='output'>
                <p>Cover image</p>
              </div>
              <img id='output-header' />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor=''>Body</label>
            <Editor />
          </div>
          <div className='text-center'>
            <button className='btn btn-button' type='button'>
              Save article
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => state,
  { changeState, categoryActions }
)(CreateArticle);
