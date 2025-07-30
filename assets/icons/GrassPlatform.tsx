import React from 'react';
import Svg, { Rect, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

const GrassPlatform = ({ width = 180, height = 118 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 180 118" fill="none">
    <Rect y="16" width="180" height="102" fill="url(#gradBackground)" />
    <Ellipse cx="90" cy="17" rx="90" ry="17" fill="white" />
    <Ellipse cx="90.5" cy="16" rx="45.5" ry="8" fill="url(#gradTop)" />
    <Defs>
      <LinearGradient
        id="gradBackground"
        x1="90"
        y1="16"
        x2="90"
        y2="118"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#9CCFA6" />
        <Stop offset="0.767302" stopColor="#62E47C" stopOpacity="0" />
      </LinearGradient>
      <LinearGradient
        id="gradTop"
        x1="94"
        y1="-8"
        x2="95"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#A1DBAC" stopOpacity="0" />
        <Stop offset="1" stopColor="#9FD9AB" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default GrassPlatform;
