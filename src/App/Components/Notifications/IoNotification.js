/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function IoNotification({
  closeToast, message, link, id, markAsRead
}) {
  return (
    <div className="io-container--body">
      <p className="io-container--body__message">
        <i className="far fa-clock io-container--body__message--i" />
        <div className="io-container--body__message--div">{message}</div>
      </p>
      <div className="io-container--body__links">
        <p className="io-container--body__links--follow-up">
          <Link to={link} className="link-custom__io" onClick={() => markAsRead(id)}>
            Read
          </Link>
        </p>
        <p onClick={closeToast} className="io-container--body__links--dismiss">
          Dismiss
        </p>
      </div>
    </div>
  );
}

IoNotification.propTypes = {
  closeToast: PropTypes.func,
  message: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.number,
  markAsRead: PropTypes.func
};
