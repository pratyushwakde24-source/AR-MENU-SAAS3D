import * as React from 'react';

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

// For newer versions of React (like React 19)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

// For standard JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': any;
  }
}
