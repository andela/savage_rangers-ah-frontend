import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import propTypes from 'prop-types';
import Rater from 'react-rater';
import ReactHtmlParser from 'react-html-parser';
import ReactImageFallback from 'react-image-fallback';
import { Link } from 'react-router-dom';
import countRating from '../../../../Helpers/countRating';

export class Article extends Component {
  render() {
    const { data } = this.props;
    const {
      body, title, coverImage, createdAt, slug
    } = data;
    const { name } = data.Category;
    const { profileImage, firstName, username } = data.User;
    const { comments, reads, shares } = data.stats;
    const { allUsers, statistics } = data.rating;
    const ratings = countRating(statistics);

    const date = moment(createdAt).format('MMM Do YY');
    const img = 'https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg';
    const defaultProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const articleBody = body.length > 200 ? `${body.substring(0, 210)} ...` : body;
    const articleTitle = title.length > 52 ? `${title.substring(0, 52)}...` : title;
    const categoryColor = (name === 'LOVE' && '#ff1744') || (name === 'TECHNOLOGY' && '#3f51b5') || (name === 'MUSIC' && '#880e4f') || (name === 'BUSINESS' && '#2196f3') || (name === 'ART' && '#9c27b0') || '#afad99';
    const names = (firstName === null && username)
      || (firstName === undefined && username)
      || firstName;
    return (
      <React.Fragment>
        <div className="articles container row">
          <div className="articles__cover col-lg-3 col-md-12 col-sm-12">
            <ReactImageFallback
              src={coverImage}
              fallbackImage={img}
              initialImage="loader.gif"
              alt="cool image should be here"
              className="coverImage"
            />
          </div>
          <div className="articles__details col-lg-9 col-md-12 col-sm-12">
            <div className="articles__details--content">
              <Link className="link" to={`/articles/${slug}`}>
                <h3>
                  {articleTitle}
                </h3>
              </Link>
              <div className="category row">
                <div className="col-lg-6 col-md-6 col-sm-12 row">
                  <div className="color" style={{ background: `${categoryColor}` }} />
                  <div className="name col ">
                    <h5>{name}</h5>
                  </div>

                </div>
                <div className="Rate col-lg-6 col-md-6 col-sm-12 row">
                  <div className="rating col">
                    <Rater total={5} rating={ratings} interactive={false} />
                  </div>
                  <div className="ratedUser col-1">
                    <h6>
                      [
                      {allUsers}
                      ]
                    </h6>
                  </div>

                </div>
              </div>
              <p className="articleBody">
                {ReactHtmlParser(articleBody)}
              </p>
            </div>
            <div className="articles__details--Author row">
              <div className="col-lg-2 col-md-6 col-sm-6">
                <ReactImageFallback
                  src={profileImage}
                  fallbackImage={defaultProfileImage}
                  initialImage="loader.gif"
                  alt="cool image should be here"
                  className="proImage"
                />
              </div>
              <div className="profileDetail col-lg-3 col-md-6 col-sm-6">
                <Link className="userProfile link" to={`/profile/${username}`}>
                  <p className="pro">
                    {names}
                    {' '}
                    {data.User.lastName}
                  </p>
                </Link>
                <p>{date}</p>
              </div>
              <div className="articlesBtn col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  <div className="btn-articles">
                    <button type="button" className="btn-article fa">
                      <i className="fab fa-readme" />
                      {' '}
                      {''}
                      {reads}
                    </button>
                  </div>
                  <div className="btn-articles">
                    <button type="button" className="btn-article fa">
                      <i className="far fa-comment-alt" />
                      {' '}
                      {''}
                      {comments}
                    </button>
                  </div>
                  <div className="btn-articles">
                    <button type="button" className="btn-article fa">
                      <i className="fas fa-share-alt" />
                      {' '}
                      {''}
                      {shares}
                    </button>
                  </div>
                </div>

                <div className="more">
                  <Link className="read-more fa link" to={`/articles/${slug}`}><p>Read more</p></Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = { data: propTypes.object };

export default connect(state => ({ stats: state.articleData }))(Article);
