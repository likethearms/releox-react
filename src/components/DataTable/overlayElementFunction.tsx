import React, { Component } from 'react';

interface OverlayElementOptions {
  overlayElement?: any;
}

interface Props {
  children: any;
}

export default (opts?: OverlayElementOptions) => (loading: boolean) =>
  class TableLoadingOverlayWrapper extends Component<Props> {
    render() {
      const { children } = this.props;
      if (loading)
        return opts && opts.overlayElement ? (
          <opts.overlayElement />
        ) : (
          <p className="text-center" style={{ textAlign: 'center' }}>
            Loading...
          </p>
        );
      return children;
    }
  };
