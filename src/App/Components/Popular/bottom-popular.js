import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import { Link } from 'react-router-dom';
import moment from 'moment';
import configs from '../../../configs/urls';


const BottomPopular = (props) => {
  const scrollUp = () => {
    window.scrollTo(0, 50);
  };
  const { articles } = props;
  return (
    <div className="content-holder mt-5">
      <p className="content-holder__popular">Popular</p>
      <hr className="content-holder__line-separate" />

      {
        articles.map(item => (
          <Link to={`/articles/${item.slug}`} onClick={scrollUp()} key={item.title} style={{ color: '#000', textDecoration: 'none' }}>
            <div className="popular">
              <div className="popular-container">
                <div className="popular-div-holder" style={{ marginLeft: '15px' }}>
                  <ReactImageFallback className="popular-div-holder__popular-cover-image" src={item.coverImage} fallbackImage={configs.defaultCoverImage} alt="content" title="popular Image" />
                  <div className="popular-div-holder__popular-body">
                    <p className="popular-div-holder__popular-category">{item.category}</p>
                    <h3 className="popular-div-holder__popular-title">{item.title}</h3>
                    <p className="popular-div-holder__popular-description">{item.description}</p>
                  </div>
                  <div className="popular-div-holder__popular-content">
                    <ReactImageFallback className="popular-div-holder__popular-writer-image" src={item.profileImage} fallbackImage={configs.defaultCoverImage} alt="content" title="popular Image" />
                    <p className="popular-div-holder__popular-writer-name">{item.username}</p>
                    <p className="popular-div-holder__popular-published-date">{moment(item.createdAt).format('Do MMM YYYY')}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default BottomPopular;
