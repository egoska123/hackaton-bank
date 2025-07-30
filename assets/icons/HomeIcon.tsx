import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const HomeIcon = ({
  width = 34,
  height = 33,
}: {
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} viewBox="0 0 34 33" fill="none">
    <Rect x="4.5" y="7" width="25" height="26" rx="7" fill="#40A93D" />
    <Path
      d="M13.5 25C13.5 22.7909 15.2909 21 17.5 21C19.7091 21 21.5 22.7909 21.5 25V33H13.5V25Z"
      fill="#9DCC49"
    />
    <Path
      d="M0.5 14.1266C0.5 12.5395 1.27286 11.0518 2.57142 10.1392L12.9753 2.82822C15.3901 1.13129 18.6099 1.13129 21.0247 2.82822L31.4286 10.1392C32.7271 11.0518 33.5 12.5395 33.5 14.1266C33.5 16.8181 31.3181 19 28.6266 19H5.3734C2.6819 19 0.5 16.8181 0.5 14.1266Z"
      fill="#2B8E28"
    />
  </Svg>
);

export default HomeIcon;
