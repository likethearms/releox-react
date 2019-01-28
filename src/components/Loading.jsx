import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import CenterContent from './CenterContent';

const Loading = ({ centeredVertical }) => {
  const loader = <ReactLoading color="#20A8D8" delay={0} type="spin" />;
  if (centeredVertical) return <CenterContent>{loader}</CenterContent>;
  return (
    <div className="loading">
      {loader}
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
