
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from 'react-pagination-library';
// import { Link } from 'react-rater';
import Article from './Article';
import Navbar from '../../Common/NavProfile/navbar';
import Footer from '../../Common/Footer';
import articleActions from '../../../../Redux/Actions/getArticles';
import Loader from '../../Common/loader';

const { getArticles } = articleActions;

let paginate = 1;
// let articles;
export class Articles extends Component {
  state = {
    currentPage: 1,
    articles: []
    // isLoading: true
  }

  componentWillMount() {
    const { getArticles: getArticlesData } = this.props;
    getArticlesData(paginate);
  }

  componentWillReceiveProps({ articles }) {
    if (articles) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  }

  changeCurrentPage = (numPage) => {
    const page = numPage - 1;
    paginate = page > 0 ? `${page}0` : page;
    const { getArticles: getArticlesData } = this.props;
    getArticlesData(Number(paginate));
    this.setState({ currentPage: numPage });
    // this.forceUpdate();
  }

  render() {
    const { articles } = this.props;
    const { isLoading } = this.state;
    let articlesToDisplay;
    if (articles) {
      articlesToDisplay = articles.map(article => (
        <Article
          key={article.id}
          data={article}
        />
      ));
    }

    let activePage;
    let numberOfPage;
    if (articles) {
      activePage = articles.pagination.currentPage;
      numberOfPage = articles.pagination.pages;
    }
    if (!isLoading) {
      return (
        <div className="main">
          <Navbar />
          <div>
            <div className="row check">
              <div className="col-lg-3 col-md-3 col-sm-11">
                <div className="page__label" id="label">
                  <p className="page__label--text">Articles</p>
                </div>
              </div>
              <div className="col-lg-9 col-md-11 col-sm-11 hello">
                <div className="main__searchField input-group md-form form-sm form-2 pl-0">
                  <input
                    className="form-control my-0 py-1 red-border"
                    type="text"
                    // value={this.state.input}
                    // onKeyUp={this.handleChange}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="dropdown">
                    <form>
                      <select name="cars" className="custom-select">
                        <option selected>Search by</option>
                        <option value="tags">tags</option>
                        <option value="body">body</option>
                        <option value="title">title</option>
                        <option value="username">username</option>
                      </select>
                    </form>
                  </div>

                  <div className="main__search--btn-search input-group-append">
                    <button type="submit">
                      <span className="searchIcon input-group-text red lighten-3" id="basic-text1">
                        {/* <Link to="search">search</Link> */}
                        <i
                          className="fas fa-search text-grey"
                          aria-hidden="true"
                        />


                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="main__displayArticles container">
              {
                articlesToDisplay
              }
            </div>
            <div>
              <Pagination
                currentPage={activePage}
                totalPages={numberOfPage}
                changeCurrentPage={this.changeCurrentPage}
              />
            </div>
            <Footer />
          </div>
        </div>
      );
    }
    return <Loader />;
  }
}

Articles.propTypes = {
  getArticles: propTypes.func.isRequired,
  articles: propTypes.array
};

export const mapStateToProps = state => ({ articles: state.articles.articles });
export default connect(mapStateToProps, { getArticles })(Articles);
