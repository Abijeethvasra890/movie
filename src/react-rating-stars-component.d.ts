declare module 'react-rating-stars-component' {
    import * as React from 'react';
  
    type ReactStarsProps =  {
      count?: number;
      value?: number;
      size?: number;
      edit?: boolean;
      activeColor?: string;
      onChange?: (newRating: number) => void;
    }
  
    const ReactStars: React.FC<ReactStarsProps>;
    export default ReactStars;
  }
  