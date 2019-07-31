import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavPopulator from '../../../Helpers/NavPopulator';

export class Navbar extends Component {
  state = {
    categories: [],
    show: false
  };

  componentDidMount() {
    const { categories } = this.state;
    if (categories.length === 0) {
      axios
        .get('https://authors-heaven.herokuapp.com/api/articles')
        .then((res) => {
          const menuList = NavPopulator(res.data.result.Articles);

          this.setState({ categories: menuList });
        });
    }
  }

  render() {
    const { categories, show } = this.state;
    return (
      <div className="row">
        <div className="nav-body col-sm-12 col-md-12 col-lg-12">
          <div className="nav-logo">
            <p>AUTHORS HAVEN</p>
          </div>
          <ul className="nav justify-content-center nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {Object.keys(categories)
              .slice(0, 8)
              .map((menuItem, index) => (
                <li className="nav-item" key={index}>
                  <Link to={`/articles/${menuItem}`} className="nav-link">
                    {menuItem}
                  </Link>
                  <span className="line">&#124;</span>
                </li>
              ))}
          </ul>

          <ul className="nav justify-content-end nav-auth">
            <li className="nav-item">
              <Link to="/login"  className="nav-link">
                login
              </Link>
            </li>
            <span>&#124;</span>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                signup
              </Link>
            </li>
          </ul>
          <div
            className="responsive-nav"
            onClick={() => {
              this.setState({ show: !show });
            }}
          >
            <i className="fas fa-bars" />
            <span className="navbar-toggler-icon" />
          </div>
          <div className="responsive-block">
            <ul
              className={
                this.state.show
                  ? 'nav  flex-column show'
                  : 'nav  flex-column hide'
              }
            >
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              {Object.keys(this.state.categories)
                .slice(0, 8)
                .map((menuItem, index) => (
                  <li className="nav-item" key={index}>
                    <a href="#" className="nav-link">
                      {menuItem}
                    </a>
                  </li>
                ))}
              <li className="nav-item">
                <Link to="/" className="nav-link">login</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
