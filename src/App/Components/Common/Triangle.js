import React from 'react';
import PropTypes from 'prop-types';

export default function Triangle(props) {
  const { direction } = props;
  const classData = `triangle triangle-${direction} custom-triangle-notifications`;
  return <div className={classData} id="notifications-triangle" />;
}

Triangle.propTypes = { direction: PropTypes.string };
