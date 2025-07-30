import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ClockIcon = ({ width = 25, height = 26, color = 'black' }: { width?: number; height?: number; color?: string }) => (
  <Svg width={width} height={height} viewBox="0 0 25 26" fill="none">
    <Path
      d="M12.5 0.5C5.60729 0.5 0 6.10729 0 13C0 19.8927 5.60729 25.5 12.5 25.5C19.3927 25.5 25 19.8927 25 13C25 6.10729 19.3927 0.5 12.5 0.5ZM16.6667 14.0417H12.5C11.925 14.0417 11.4583 13.576 11.4583 13V6.75C11.4583 6.17396 11.925 5.70833 12.5 5.70833C13.075 5.70833 13.5417 6.17396 13.5417 6.75V11.9583H16.6667C17.2427 11.9583 17.7083 12.424 17.7083 13C17.7083 13.576 17.2427 14.0417 16.6667 14.0417Z"
      fill={color}
    />
  </Svg>
);

export default ClockIcon;
