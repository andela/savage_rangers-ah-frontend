/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Navbar from '../Common/NavProfile/navbar';
import InlineLoader from '../Common/InlineLoader';
import actions from '../../../Redux/Actions/home';
import popularActions from '../../../Redux/Actions/readPopularActions';
import RandomArticles from './RandomHeader';
import RecentlyAdded from './RecentlyAdded';
import Categorized from './CategorizeArticles';
import ArticleCard from './ArticleCard';
import Footer from '../Common/Footer';

const { getArticlesByCategory, getRandomArticles, getRecentArticles } = actions;
const { readPopularArticle } = popularActions;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      getRandomArticles: getRandom,
      readPopularArticle: getPopularArticles,
      getRecentArticles: getRecentlyAdded
    } = this.props;
    getRandom();
    getPopularArticles();
    getRecentlyAdded();
  }

  componentDidUpdate({ categories: oldCategories }) {
    const { categories: newCategories, getArticlesByCategory: getArticles } = this.props;
    if (oldCategories !== newCategories) {
      getArticles(newCategories);
    }
  }

  render() {
    const { randomArticles, articles, recentArticles } = this.props;

    let { popularArticles } = this.props;

    popularArticles = popularArticles ? popularArticles.data : '';
    popularArticles = popularArticles !== ''
      ? popularArticles.map((item) => {
        const tempItem = item;
        tempItem.Category = { name: item.category };
        tempItem.User = {
          username: item.username,
          profileImage: item.profileImage
        };
        tempItem.body = '';
        return tempItem;
      })
      : '';
    return (
      <React.Fragment>
        <Navbar />
        <div className="home">
          <RandomArticles randomArticles={randomArticles} />
          <div className="row article-sections">
            <div className="col-xl-9 col-lg-9">
              <RecentlyAdded randomArticles={recentArticles} />
              <div className="mt-5">
                <Categorized articles={articles} />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 popular-home">
              <div className="popular-home-title">Popular</div>
              <hr />
              {popularArticles ? (
                popularArticles.map((item, index) => (
                  <div key={index} className="popular-home-card">
                    <ArticleCard article={item} truncateLevel="low" />
                  </div>
                ))
              ) : (
                <InlineLoader />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  categories: propTypes.array,
  getArticlesByCategory: propTypes.func,
  getRandomArticles: propTypes.func,
  getRecentArticles: propTypes.func,
  randomArticles: propTypes.array,
  recentArticles: propTypes.array,
  popularArticles: propTypes.array
};

export const mapStateToProps = ({
  home: {
    categories, randomArticles, articles, recentArticles
  },
  populars: { Articles: popularArticles }
}) => ({
  categories,
  articles,
  randomArticles,
  recentArticles,
  popularArticles
});

export default connect(mapStateToProps,
  {
    getArticlesByCategory,
    readPopularArticle,
    getRandomArticles,
    getRecentArticles
  })(Home);
