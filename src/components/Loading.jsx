import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const Loading = ({ centeredVertical }) => {
  const style = {};
  if (centeredVertical) style.height = '100vh';
  return (
    <div style={style}>
      <div className="loading">
        <ReactLoading color="#20A8D8" delay={0} type="spin" />
      </div>
    </div>
  );
};

Loading.propTypes = {
  centeredVertical: PropTypes.bool,
};

Loading.defaultProps = {
  centeredVertical: false,
};

export default Loading;
