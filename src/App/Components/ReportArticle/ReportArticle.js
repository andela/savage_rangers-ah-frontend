import React, { Component } from 'react';
import { connect } from 'react-redux';
import reportArticleAction from '../../../Redux/Actions/reportArticle';

const { reportArticle } = reportArticleAction;

export class ReportArticle extends Component {
  state = { hovered: false, displayMessage: false }

  content = (
    <div>
      <ul className="reasons">
        <li value="4" onClick={event => this.report(event)}>Spam </li>
        <li value="3" onClick={event => this.report(event)}>Harassment</li>
        <li value="6" onClick={event => this.report(event)}>Racist views</li>
        <li value="2" onClick={event => this.report(event)}>Sexual content</li>
        <li value="1" onClick={event => this.report(event)}>Violent content</li>
        <li value="5" onClick={event => this.report(event)}>Breaks privacy rules</li>
      </ul>
    </div>
  );


  setHover = (value) => {
    this.setState({ hovered: value });
  };

  report = (event) => {
    const reason = Number(event.target.value);
    this.setState({ hovered: false });
    this.setState({ displayMessage: true });
    const token = localStorage.getItem('token');
    const { slug } = this.props;
    if (!token) {
      this.props.history.push(`/login?redirect=${window.location.pathname}`);
    } else {
      this.props.reportArticle(slug, reason, token);
    }
  }

  render() {
    const { isAuthor } = this.props;
    const { hovered } = this.state;
    const { reportError, reportData } = this.props;
    const reportButton = isAuthor ? 'notAuthor' : 'report';
    const report = (reportError && 'Sorry, You can not report this Article twice with the same reason!!!') || (reportData && 'Article reported successfully') || '';
    const messageColor = reportError === null ? 'success' : 'error';
    if (report) {
      setTimeout(() => {
        this.setState({ displayMessage: false });
      }, 10000);
    }
    const displayedMessage = this.state.displayMessage === true ? report : '';
    return (
      <div>
        <button type="button" className={reportButton} onClick={() => this.setHover(!hovered)}>
          <i className="fas fa-flag" />
          {' '}
          Report this article
        </button>
        {hovered && this.content}
        <p className={messageColor}>{displayedMessage}</p>
      </div>

    );
  }
}

export const mapStateToProps = state => ({
  reportData: state.report.reportData,
  reportError: state.report.reportError
});

export default connect(mapStateToProps, { reportArticle })(ReportArticle);
