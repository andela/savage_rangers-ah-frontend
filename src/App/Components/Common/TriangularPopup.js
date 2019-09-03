import React from 'react';
import PropTypes from 'prop-types';

export default function TriangularPopup(props) {
  const { direction, className } = props;
  const classData = `triangle triangle-${direction} custom-triangle-notifications ${className}`;
  return <div className={classData} id="notifications-triangle" />;
}

TriangularPopup.propTypes = { direction: PropTypes.string };
