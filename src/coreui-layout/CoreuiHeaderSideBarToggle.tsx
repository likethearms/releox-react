import React from 'react';
import PropTypes from 'prop-types';

export interface CoreuiHeaderSideBarToggleProps {
  toggleClass: string;
  buttonClass: string;
}

const CoreuiHeaderSideBarToggleComponent = ({
  toggleClass,
  buttonClass,
}: CoreuiHeaderSideBarToggleProps) => {
  const onClick = () => document.getElementsByClassName('app')[0].classList.toggle(toggleClass);
  return (
    <button className={`CoreuiHeaderSideBarToggleComponent ${buttonClass}`} type="button" onClick={onClick}>
      <span className="navbar-toggler-icon" />
    </button>
  );
};

CoreuiHeaderSideBarToggleComponent.propTypes = {
  toggleClass: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
};

export const CoreuiHeaderSideBarToggle = CoreuiHeaderSideBarToggleComponent;
