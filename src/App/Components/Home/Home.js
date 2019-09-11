/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Navbar from '../Common/NavProfile/navbar';
import actions from '../../../Redux/Actions/home';
import popularActions from '../../../Redux/Actions/readPopularActions';
import RandomArticles from './RandomHeader';
import RecentlyAdded from './RecentlyAdded';
// import Categorized from './CategorizeArticles';
import ArticleCard from './ArticleCard';

const { getArticlesByCategory, getRandomArticles } = actions;
const { readPopularArticle } = popularActions;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getRandomArticles: getRandom } = this.props;
    getRandom();
  }

  componentDidUpdate() {
    const {
      categories,
      getArticlesByCategory: getArticles,
      readPopularArticle: getPopularArticles
    } = this.props;
    if (categories) {
      getArticles(categories);
      getPopularArticles();
    }
  }

  render() {
    const { randomArticles } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <div className="home">
          <RandomArticles randomArticles={randomArticles} />
          <div className="row article-sections">
            <div className="col-xl-9 col-lg-9">
              <RecentlyAdded randomArticles={randomArticles} />
            </div>
            <div className="col-xl-3 col-lg-3 popular-home">
              <div className="popular-home-title">Popular</div>
              <hr />
              {randomArticles
                ? randomArticles.map((item, index) => (
                  <div key={index} className="popular-home-card">
                    <ArticleCard article={item} truncateLevel="low" />
                  </div>
                ))
                : ''}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = { categories: propTypes.array, getArticlesByCategory: propTypes.func };

export const mapStateToProps = ({
  home: { categories, randomArticles },
  populars: { articles }
}) => ({
  categories,
  articles,
  randomArticles
});

export default connect(mapStateToProps,
  { getArticlesByCategory, readPopularArticle, getRandomArticles })(Home);
