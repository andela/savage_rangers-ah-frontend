/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import propTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Rater from 'react-star-ratings';
import Rating from './Rating';
import actions from '../../../Redux/Actions/articleRatings';

const { getRatings, rate } = actions;

export class Ratings extends Component {
  static propTypes = {
    getRatings: propTypes.func,
    ratings: propTypes.object,
    errorMessage: propTypes.string,
    successMessage: propTypes.string,
    rate: propTypes.func,
    articleSlug: propTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      average: null,
      allUsers: null,
      stats: [],
      rating: 0,
      redirect: false,
      isLoggedIn: false,
      defaultError: ''
    };
  }

  componentDidMount() {
    const { props: { articleSlug } } = this;
    const { getRatings: getArticleRatings } = this.props;
    getArticleRatings(articleSlug);
  }

  componentWillReceiveProps({ ratings, errorMessage, successMessage }) {
    const { state: { defaultError } } = this;
    if (!isEmpty(ratings)) {
      this.setState({
        average: ratings.average.toString().substring(0, 3),
        allUsers: ratings.data.allUsers,
        stats: ratings.data.statistics
      });
    }

    if (errorMessage && errorMessage !== defaultError) {
      this.setState({ defaultError: errorMessage });
      toast.error(errorMessage);
    }
    if (successMessage) toast.success(successMessage);
  }

  rate = async (rating) => {
    const redirectToLogin = () => this.setState({ redirect: true });
    const Toast = ({ closeToast }) => (
      <div>
        <p className="ogin-popup-message">Please, login first...</p>
        <p className="login-popup-buttons">
          <button type="submit" onClick={redirectToLogin}>
            Yes
          </button>
          <button type="submit" onClick={closeToast}>
            No
          </button>
        </p>
      </div>
    );

    const token = localStorage.getItem('token');
    const { props: { articleSlug } } = this;
    if (token) {
      this.setState({ isLoggedIn: true });
      const {
        props: { rate: postRating, getRatings: getArticleRatings },
        state: { rating: userRating, defaultError }
      } = this;
      if (rating !== userRating) {
        this.setState({ rating });
        postRating(rating, articleSlug, token).then(() => {
          getArticleRatings(articleSlug);
        });
      } else toast.error(defaultError);
    } else {
      toast.error(Toast);
    }
  };

  render() {
    const {
      state: {
        stats, average, allUsers, redirect, isLoggedIn
      }
    } = this;
    // Ordering the array of stats
    const orderedStats = [1, 2, 3, 4, 5];
    stats.map((item) => {
      orderedStats[item.rating - 1] = item;
      return item;
    });
    if (redirect) return <Redirect to={`/login?redirect=${location.pathname}`} />;
    return (
      <React.Fragment>
        {isLoggedIn ? <ToastContainer /> : <ToastContainer autoClose={false} closeButton={false} />}
        {!isEmpty(stats) ? (
          <div className="ratings-container">
            <div className="ratings-container--stats">
              <p className="ratings-container--stats__average">{average}</p>
              <p className="ratings-container--stats__viewers">
                {allUsers}
                {' '}
                {allUsers > 1 ? 'Reviews' : 'Review'}
              </p>
              <div className="custom-rater">
                <Rater
                  numOfStars={5}
                  rating={parseFloat(average)}
                  starRatedColor="#ffd700"
                  starHoverColor="#d4b50f"
                  name="rating"
                  starDimension="20px"
                  starSpacing="15px"
                  changeRating={this.rate}
                />
              </div>
            </div>
            {orderedStats.reverse().map(({ rating, percentage }) => (
              <Rating key={rating} rating={rating} percentage={percentage} stats={stats} />
            ))}
          </div>
        ) : (
          <div className="custom-rater-default">
            <p>Rate this article</p>
            <Rater
              numOfStars={5}
              rating={0}
              starRatedColor="#ffd700"
              starHoverColor="#d4b50f"
              name="rating"
              starDimension="20px"
              starSpacing="10px"
              changeRating={this.rate}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ articleRatings: { data, errorMessage, successMessage } }) => ({
  ratings: data,
  errorMessage,
  successMessage
});

export default connect(mapStateToProps,
  { getRatings, rate })(Ratings);
