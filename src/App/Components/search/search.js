import React, { Component } from 'react';
import { connect } from 'react-redux';
import searchAction from '../../../Redux/Actions/searchArticle';
import Article from '../Articles/getArticles/Article';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';


const { searchArticles } = searchAction;
export class search extends Component {
  state = { input: '', filter: 'title' }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange = (update) => {
    const newState = update.target.value;
    this.setState({ [update.target.name]: newState });
  }

  handleSearch = () => {
    const { searchArticles: searchData } = this.props;
    const { filter, input } = this.state;
    searchData(input, filter);
  }

  render() {
    const { articles } = this.props;
    let searched;
    if (articles) {
      searched = articles.map(article => (
        <Article
          key={article.id}
          data={article}
        />
      ));
    }
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
                  name="input"
                  // value={this.state.input}
                  onKeyUp={this.handleChange}
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="dropdown">
                  <form>
                    <select name="filter" className="custom-select" onChange={({ target }) => this.setState({ filter: target.value })} value={this.state.filter}>
                      <option selected>Search by</option>
                      <option value="tags">tags</option>
                      <option value="body">body</option>
                      <option value="title">title</option>
                      <option value="username">username</option>
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


          <div className="main__displayArticles container">
            {
              searched
            }
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({ articles: state.searchArticle.articles });
export default connect(mapStateToProps, { searchArticles })(search);
