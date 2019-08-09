import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavPopulator from '../../../Helpers/NavPopulator';


export class navLink extends Component {
  state = {
    categories: [],
    show: false
  }

  componentDidMount() {
    const { categories } = this.state;
    if (categories.length === 0) {
      axios
        .get('https://authors-heaven.herokuapp.com/api/articles')
        .then((res) => {
          console.log(res);
          const menuList = NavPopulator(res.data.result.Articles);

          this.setState({ categories: menuList });
        });
    }
  }

  render() {
    const { categories, show } = this.state;
    return (
      <div className="navbarLink">
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
      </div>
    );
  }
}

export default navLink;
