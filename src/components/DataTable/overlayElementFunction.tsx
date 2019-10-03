import React, { Component } from 'react';
import { ct } from '../../I18N';

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
      const t = ct('dataTable');
      if (loading)
        return opts && opts.overlayElement ? (
          <opts.overlayElement />
        ) : (
          <p className="text-center" style={{ textAlign: 'center' }}>
            {t('loading')}
          </p>
        );
      return children;
    }
  };
