import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class HighlightArticle extends Component {
  state = {
    highlightedText: '',
    anchorKey: '',
    startIndex: 0,
    lastIndex: 0,
    selectionRectangle: null,
    isModalShown: false,
    comment: '',
    nodeId: null,
    highlights: null,
    originalHtml: null
  };

  componentDidMount = () => {
    window.addEventListener('mouseup', this.checkHighlightedText);
    window.addEventListener('click', this.checkHighlightedText);
    window.addEventListener('resize', this.checkHighlightedText);
  };

  getSelectionRange = (windowSelection) => {
    const selectionRange = windowSelection.toString() && windowSelection.getRangeAt(0);
    const selectionRectangle = selectionRange && selectionRange.getBoundingClientRect();
    return { selectionRange, selectionRectangle };
  };

  checkHighlightedText = () => {
    const { isModalShown } = this.state;
    if (isModalShown) return false;
    const windowSelection = window.getSelection();
    const { selectionRectangle } = this.getSelectionRange(windowSelection);
    const startIndex = Math.min(windowSelection.anchorOffset, windowSelection.focusOffset);
    const lastIndex = Math.max(windowSelection.anchorOffset, windowSelection.focusOffset);
    const highlightedText = windowSelection.toString();
    const nodeId = window.getSelection().anchorNode.parentNode.id;

    return this.setState(prevState => ({
      ...prevState,
      startIndex: highlightedText ? startIndex : prevState.startIndex,
      lastIndex: highlightedText ? lastIndex : prevState.lastIndex,
      highlightedText: highlightedText || prevState.highlightedText,
      selectionRectangle,
      nodeId: nodeId || prevState.nodeId
    }));
  };

  openCommentModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalShown: true,
      comment: ''
    }));
  };

  closeCommentModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalShown: false,
      selectionRectangle: null,
      comment: ''
    }));
  };

  handleChange = ({ target }) => {
    const input = { [target.name]: target.value };

    this.setState(prevState => ({
      ...prevState,
      ...input
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      highlightedText: text, startIndex, lastIndex, comment, nodeId
    } = this.state;
    const { postHighlight, slug } = this.props;

    const formData = {
      text,
      startIndex,
      lastIndex,
      comment,
      nodeId
    };

    postHighlight(formData, slug);
  };

  render() {
    const {
      selectionRectangle,
      isModalShown,
      highlightedText,
      comment,
      startIndex,
      lastIndex,
      nodeId
    } = this.state;

    const { highlightDetails } = this.props;
    return (
      <div>
        {selectionRectangle && !isModalShown ? (
          <div
            style={{
              position: 'absolute',
              top: `${selectionRectangle.top + 30 + window.scrollY}px`,
              left: `${selectionRectangle.left}px`,
              zIndex: 12345
            }}
          >
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.openCommentModal}
              data-toggle="modal"
              data-target="#highlightCommentModal"
            >
              <i className="fas fa-comment" />
            </button>
          </div>
        ) : (
          ''
        )}

        <div
          className="modal"
          id="highlightCommentModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="highlightCommentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="highlightCommentModalLabel">
                  Comment Highlight
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeCommentModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="comment-highlight-form" onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <textarea
                    name="comment"
                    row="4"
                    className="form-control"
                    value={comment}
                    onChange={this.handleChange}
                  />
                  <hr />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.closeCommentModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Higlight details */}
        <div
          className="modal"
          id="highlightDetailsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="highlightDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="highlightDetailsModalLabel">
                  Highlight details
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div id="highlightDetailsModalBody" className="modal-body">
                  Hello
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HighlightArticle.propTypes = { postHighlight: PropTypes.func };

export default connect(null,
  null)(HighlightArticle);
