import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'ar-placement'?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        autoplay?: boolean;
        'auto-rotate'?: boolean;
      };
    }
  }
}

// Support for newer React JSX namespace
declare namespace React.JSX {
  interface IntrinsicElements {
    'model-viewer': any;
  }
}
