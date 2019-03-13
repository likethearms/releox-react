import React from 'react';
import ReactLoading, { LoadingProps as LP, LoadingType } from 'react-loading';
import PropTypes from 'prop-types';
import CenterContent from '../CenterContent/CenterContent';

export interface LoadingProps extends LP {
  centeredVertical: boolean;
  color?: string,
  type?: LoadingType;
}

const Loading = ({ centeredVertical, type, color }: LoadingProps) => {
  const loader = (
    <div className="loading">
      <ReactLoading color={color} delay={0} type={type} />
    </div>
  );
  if (centeredVertical) return <CenterContent>{loader}</CenterContent>;
  return loader;
};

Loading.propTypes = {
  /** Center indicator vertically and horizontally */
  centeredVertical: PropTypes.bool,
  /** Color of loading indicator */
  color: PropTypes.string,
  /** Type of loading indicator */
  type: PropTypes.string,
};

Loading.defaultProps = {
  centeredVertical: true,
  color: '#20A8D8',
  type: 'spin',
};

export default Loading;
