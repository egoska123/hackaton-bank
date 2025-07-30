import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface SuccessCheckIconProps {
  width?: number;
  height?: number;
}

const SuccessCheckIcon: React.FC<SuccessCheckIconProps> = ({ width = 27, height = 31 }) => (
  <Svg width={width} height={height} viewBox="0 0 27 31" fill="none">
    <Rect y="4" width="27" height="27" rx="8" fill="#3C9619" />
    <Rect width="27" height="27" rx="8" fill="#9DCC49" />
    <Rect
      x="20.5449"
      y="7"
      width="3"
      height="15.4068"
      rx="1.5"
      transform="rotate(45 20.5449 7)"
      fill="#FFF155"
    />
    <Rect
      x="5"
      y="13.507"
      width="3"
      height="9.20478"
      rx="1.5"
      transform="rotate(-45 5 13.507)"
      fill="#FFF155"
    />
  </Svg>
);

export default SuccessCheckIcon;
