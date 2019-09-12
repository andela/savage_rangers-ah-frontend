import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import queryString from 'query-string';
import Pagination from 'react-pagination-library';
import searchAction from '../../../../Redux/Actions/searchArticle';
import Article from './Article';
import Navbar from '../../Common/NavProfile/navbar';
import Footer from '../../Common/Footer';
import articleActions from '../../../../Redux/Actions/getArticles';
import Loader from '../../Common/loader';
import articleCategoryActions from '../../../../Redux/Actions/getArticlesByCategory';

const { getArticlesByCategory } = articleCategoryActions;

const { getArticles } = articleActions;
const { searchArticles } = searchAction;

export class Articles extends Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    const {
      page, filter, input, category
    } = parsed;
    this.state = {
      isLoading: true,
      currentPage: page || 1,
      input: '' || input,
      filter: 'title' || filter,
      category
    };
  }

  componentDidMount() {
    const page = this.state.currentPage - 1;
    const paginate = page > 0 ? `${page}0` : page;
    const { getArticles: getArticlesData, getArticlesByCategory: getByCategory } = this.props;
    const { filter, input, category } = this.state;

    if (filter && input) {
      const { searchArticles: searchData } = this.props;
      searchData(input, filter, paginate);
    } else if (category) {
      getByCategory(category, paginate);
    } else {
      getArticlesData(paginate);
    }
  }

  componentWillReceiveProps({ articles, Search }) {
    if (articles || Search) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  }

  changeToNextPage = (numPage) => {
    this.setState({ isLoading: true });
    const page = numPage - 1;
    const paginate = Number(page > 0 ? `${page}0` : page);
    const { Search } = this.props;
    const { category } = this.state;
    if (category) {
      this.props.history.push(`?category/${category}?page=${numPage}`);
      const { getArticlesByCategory: getByCategory } = this.props;
      getByCategory(category, paginate);
    } else if (Search === undefined) {
      this.props.history.push(`?page=${numPage}`);
      const { getArticles: getArticlesData } = this.props;
      getArticlesData(paginate);
    } else {
      const { searchArticles: searchData } = this.props;
      const { filter, input } = this.state;
      this.props.history.push(`?filter=${filter}&&input=${input}?page=${numPage}`);
      searchData(input, filter, paginate);
    }
  };

  handleChange = (update) => {
    const newState = update.target.value;
    this.setState({ [update.target.name]: newState });
  };

  handleSearch = () => {
    this.setState({ isLoading: true });
    const { searchArticles: searchData } = this.props;
    const { filter, input } = this.state;
    const page = this.state.currentPage - 1;
    const paginate = page > 0 ? `${page}0` : page;
    this.props.history.push(`?filter=${filter}&&input=${input}`);
    searchData(input, filter, paginate);
  };

  render() {
    const { Search, articles, searchFailed } = this.props;
    const data = Search === undefined ? articles : Search;
    let articlesToDisplay;
    if (data) {
      articlesToDisplay = data.map(article => <Article key={article.id} data={article} />);
    }

    const { isLoading } = this.state;

    let activePage;
    let numberOfPage;
    if (data) {
      activePage = data.pagination.currentPage;
      numberOfPage = data.pagination.pages;
    }
    if (!isLoading) {
      return (
        <div className="main">
          <Navbar />
          <div>
            <div className="row main__search_label">
              <div className="col-lg-3 col-md-3 col-sm-11">
                <div className="page__label" id="label">
                  <p className="page__label--text">Articles</p>
                </div>
              </div>
              <div className="main__search_label--search col-lg-9 col-md-11 col-sm-11 ">
                <div className="main__search-field input-group md-form form-sm form-2 pl-0">
                  <input
                    className="form-control my-0 py-1 red-border"
                    type="text"
                    name="input"
                    value={this.state.input}
                    onChange={this.handleChange}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="dropdown">
                    <form>
                      <select
                        name="filter"
                        className="custom-select"
                        onChange={({ target }) => this.setState({ filter: target.value })}
                        value={this.state.filter}
                      >
                        <option selected>Search by</option>
                        <option value="tag">Tag</option>
                        <option value="title">Title</option>
                        <option value="username">Author</option>
                        <option value="body">Content</option>
                      </select>
                    </form>
                  </div>

                  <div className="main__search--btn-search input-group-append">
                    <button type="submit" onClick={this.handleSearch}>
                      <span className="searchIcon input-group-text red lighten-3" id="basic-text1">
                        <i className="fas fa-search text-grey" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {searchFailed ? (
              <div className="errorPage-articles">
                <div className="errorPage-articles__error-articles">
                  <h1>404</h1>
                  <p>Article not found</p>
                  <a href="/articles" className="back">
                    <h6>Back to Articles</h6>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="main__display-articles container">{articlesToDisplay}</div>
                <div>
                  <Pagination
                    currentPage={activePage}
                    totalPages={numberOfPage}
                    changeCurrentPage={this.changeToNextPage}
                  />
                </div>
              </div>
            )}
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
  searchArticles: propTypes.func.isRequired,
  articles: propTypes.array,
  Search: propTypes.array,
  searchFailed: propTypes.object
};

export const mapStateToProps = state => ({
  articles: state.articles.articles,
  Search: state.searchArticle.articles,
  searchFailed: state.searchArticle.searchFailed
});
export default connect(mapStateToProps,
  { getArticles, searchArticles, getArticlesByCategory })(Articles);
