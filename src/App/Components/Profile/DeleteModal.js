import React from 'react';
import propTypes from 'prop-types';

export default function DeleteModal(props) {
  const { delete: deleteArticle, id, slug } = props;
  return (
    <div>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Delete article
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Are you sure you want to delete this article?</div>
            <div className="modal-footer">
              <button
                id="t"
                type="submit"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => deleteArticle(slug)}
              >
                Delete
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  delete: propTypes.func.isRequired,
  id: propTypes.string,
  slug: propTypes.string
};
