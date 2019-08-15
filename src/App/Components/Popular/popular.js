import React from 'react';
import moment from 'moment';
import truncate from 'truncate';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';

const Popular = (props) => {
  const scrollUp = () => {
    window.scrollTo(0, 50);
  };

  const { articles } = props;
  return (
    <div className="article__popular">

      <p id="popular-title">Popular</p>
      <hr className="line-separator" />
      {
        articles.map(item => (
          <Link to={`/articles/${item.slug}`} onClick={scrollUp()} key={item.title} style={{ color: '#000', textDecoration: 'none' }}>
            <div className="article__popular-content">
              <ReactImageFallback className="content-image" src={item.coverImage} fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg" alt="content" title="popular Image" />
              <div className="holder">
                <p className="holder__content-title">
                  {truncate(item.title, 31)}

                  ...
                </p>
                <div className="holder__vl" />
                <p className="holder__category">{item.Category.name}</p>
                <div className="holder__writer">
                  <ReactImageFallback className="holder__writer-img" src={item.User.profileImage} fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg" alt="content" title="Writer Image" />
                  <p className="writer__name">{`${item.User.firstName} ${item.User.lastName}`}</p>
                  <p className="writer__date">{moment(item.createdAt).format('Do MMM YYYY')}</p>
                </div>

              </div>

            </div>
          </Link>

        ))
      }
    </div>
  );
};

export default Popular;
