import React from 'react';

interface OverlayElementOptions {
  overlayElement?: any;
  loadingText: string;
}

interface Props {
  children: any;
}

export default (opts: OverlayElementOptions) => (loading: boolean) => ({ children }: Props) => {
  if (loading)
    return opts && opts.overlayElement ? (
      <opts.overlayElement />
    ) : (
      <p className="text-center" style={{ textAlign: 'center' }}>
        {opts.loadingText}
      </p>
    );
  return children;
};
