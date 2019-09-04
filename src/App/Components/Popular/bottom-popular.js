import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BottomPopular = (props) => {
  const scrollUp = () => {
    window.scrollTo(0, 50);
  };
  const { articles } = props;
  return (
    <div className="content-holder mt-5">
      <p className="ml-4" style={{ fontSize: '25px' }}>
        Most Popular
      </p>
      <hr className="ml-4" />
      {articles.map(item => (
        <Link
          to={`/articles/${item.slug}`}
          onClick={scrollUp()}
          key={item.title}
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <div className="popular">
            <div className="popular-container">
              <div className="popular-div-holder">
                <ReactImageFallback
                  className="popular-div-holder__popular-cover-image"
                  src={item.coverImage}
                  fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
                  alt="content"
                  title="popular Image"
                />
                <div className="popular-div-holder__popular-body">
                  <p className="popular-div-holder__popular-category">{item.category}</p>
                  <h3 className="popular-div-holder__popular-title">{item.title}</h3>
                  <p className="popular-div-holder__popular-description">{item.description}</p>
                </div>
                <div className="popular-div-holder__popular-content">
                  <ReactImageFallback
                    className="popular-div-holder__popular-writer-image"
                    src={item.profileImage}
                    fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
                    alt="content"
                    title="popular Image"
                  />
                  <p className="popular-div-holder__popular-writer-name">{item.username}</p>
                  <p className="popular-div-holder__popular-published-date">
                    {moment(item.createdAt).format('Do MMM YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default BottomPopular;
