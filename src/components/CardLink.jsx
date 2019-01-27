import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CardLink = ({ linkString }) => {
  const linkVals = linkString.split('|');
  return (
    <Link className={`btn ${linkVals[2] || 'btn-secondary'} mx-1 float-right`} key={linkVals[0]} to={linkVals[0]}>
      {linkVals[1].includes('fa-') ? (
        <i className={linkVals[1]} />
      ) : linkVals[1]}
    </Link>
  );
};

CardLink.propTypes = {
  /**
   * Format: URL|TEXT|BTN_CLASS
   */
  linkString: PropTypes.string.isRequired,
};

export default CardLink;
