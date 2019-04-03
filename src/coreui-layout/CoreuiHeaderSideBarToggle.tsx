import React from 'react';
import PropTypes from 'prop-types';

export interface CoreuiHeaderSideBarToggleProps {
  toggleClass: string;
  buttonClass: string;
}

const CoreuiHeaderSideBarToggle =
  ({ toggleClass, buttonClass }: CoreuiHeaderSideBarToggleProps) => (
    <button
      className={buttonClass}
      type="button"
      onClick={() => document.getElementsByClassName('app')[0].classList.toggle(toggleClass)}
    >
      <span className="navbar-toggler-icon" />
    </button>
  );

CoreuiHeaderSideBarToggle.propTypes = {
  toggleClass: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
};

export default CoreuiHeaderSideBarToggle;
