import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import truncate from 'truncate';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import Actions from '../../../Redux/Actions/readPopularActions';


const { readPopularArticle } = Actions;
export class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [{ title: '', User: {}, Category: {} }] };
  }

  componentWillMount() {
    const { readPopularArticle: readPopular } = this.props;
    readPopular();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ articles: nextProps.popularArticle.data });
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="container article__popular">

        <p id="popular-title">Popular</p>
        <hr />
        {
          articles.map(item => (
            <Link to={`/articles/${item.slug}`} key={item.title} style={{ color: '#000', textDecoration: 'none' }}>
              <div className="article__popular-content">
                <ReactImageFallback className="content-image" src={item.coverImage} fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg" alt="content" title="popular Image" />
                <div className="holder">
                  <p className="holder__content-title">
                    {truncate(item.title, 31)}
                    ...
                  </p>
                  <div className="holder__vl" />
                  <p className="holder__category">{item.Category.name}</p>
                  <div className="holder__writer">
                    <ReactImageFallback className="holder__writer-img" src={item.User.profileImage} fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg" alt="content" title="Writer Image" />
                    <p className="writer__name">{`${item.User.firstName} ${item.User.lastName}`}</p>
                    <p className="writer__date">{moment(item.createdAt).format('Do MMM YYYY')}</p>
                  </div>

                </div>

              </div>
            </Link>

          ))
        }
      </div>
    );
  }
}

export const mapStateToProps = state => ({ popularArticle: state.populars.Articles });


export default connect(mapStateToProps, { readPopularArticle })(Popular);
