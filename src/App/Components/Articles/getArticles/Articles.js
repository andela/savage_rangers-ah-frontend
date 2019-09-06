import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Pagination from 'react-pagination-library';
import searchAction from '../../../../Redux/Actions/searchArticle';
import Article from './Article';
import Navbar from '../../Common/NavProfile/navbar';
import Footer from '../../Common/Footer';
import articleActions from '../../../../Redux/Actions/getArticles';
import Loader from '../../Common/loader';

const { getArticles } = articleActions;
const { searchArticles } = searchAction;

let paginate = 1;
export class Articles extends Component {
  state = {
    isLoading: true,
    currentPage: 1,
    articles: [],
    input: '',
    filter: 'title'
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
    this.setState({ isLoading: true });
    const page = numPage - 1;
    paginate = page > 0 ? `${page}0` : page;
    const { getArticles: getArticlesData } = this.props;
    getArticlesData(Number(paginate));
    this.setState({ currentPage: numPage });
  }

  handleChange = (update) => {
    const newState = update.target.value;
    this.setState({ [update.target.name]: newState });
  }

  handleSearch = () => {
    this.setState({ isLoading: true });
    const { searchArticles: searchData } = this.props;
    const { filter, input } = this.state;
    searchData(input, filter);
  }

  // handleBack = () => {
  //   const { getArticles: getArticlesData } = this.props;
  //   getArticlesData(paginate);
  //   this.forceUpdate();
  // }

  render() {
    const { Search, articles, searchFailed } = this.props;
    const data = Search === undefined ? articles : Search;
    const page = Search === undefined ? 'page' : 'pagination-Container';
    const { isLoading } = this.state;
    let articlesToDisplay;
    if (data) {
      articlesToDisplay = data.map(article => (
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
                      <select name="filter" className="custom-select" onChange={({ target }) => this.setState({ filter: target.value })} value={this.state.filter}>
                        <option selected>Search by</option>
                        <option value="tags">Tag</option>
                        <option value="title">Title</option>
                        <option value="username">Author</option>
                        <option value="body">Content</option>
                      </select>
                    </form>
                  </div>

                  <div className="main__search--btn-search input-group-append">
                    <button type="submit" onClick={this.handleSearch}>
                      <span className="searchIcon input-group-text red lighten-3" id="basic-text1">
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

            {searchFailed ? (
              <div className="errorPage-articles">
                <div className="errorPage-articles__error-articles">
                  <h1>404</h1>
                  <p>
                    Article not found
                  </p>
                  <a href="/articles" className="back"><h6>Back to Articles</h6></a>
                  {/* <button type="button" onClick={this.setState({ currentPage: 0 })}>Go Back</button> */}
                </div>
              </div>
            )
              : (
                <div>

                  <div className="main__display-articles container">
                    {
                      articlesToDisplay
                    }
                  </div>
                  <div className={page}>
                    <Pagination
                      currentPage={activePage}
                      totalPages={numberOfPage}
                      changeCurrentPage={this.changeCurrentPage}
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
export default connect(mapStateToProps, { getArticles, searchArticles })(Articles);
