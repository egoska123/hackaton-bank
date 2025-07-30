import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface BusIconProps {
  width?: number;
  height?: number;
}

const BusIcon: React.FC<BusIconProps> = ({ width = 38, height = 31 }) => (
  <Svg width={width} height={height} viewBox="0 0 38 31" fill="none">
    <Rect x="3.57422" y="16" width="6" height="4" rx="2" transform="rotate(50.2236 3.57422 16)" fill="#EE8D70" />
    <Rect x="11.5" y="25" width="6" height="4" rx="2" transform="rotate(90 11.5 25)" fill="#EE8D70" />
    <Rect x="26.5" y="25" width="6" height="4" rx="2" transform="rotate(90 26.5 25)" fill="#EE8D70" />
    <Rect x="4.5" y="3" width="29" height="26" rx="7" fill="#F8A186" />
    <Rect x="14.5" y="6" width="6" height="11" rx="3" fill="white" />
    <Rect x="24.5" y="6" width="6" height="11" rx="3" fill="white" />
    <Rect x="17.5" y="8" width="3" height="6" rx="1.5" fill="#50B848" />
    <Rect x="27.5" y="8" width="3" height="6" rx="1.5" fill="#50B848" />
    <Rect x="16.5" width="6" height="7" rx="3" transform="rotate(90 16.5 0)" fill="#F8A186" />
    <Rect x="28.5" width="6" height="7" rx="3" transform="rotate(90 28.5 0)" fill="#F8A186" />
    <Rect x="29.5" y="25" width="6" height="4" rx="2" transform="rotate(90 29.5 25)" fill="#F8A186" />
    <Rect x="16.5" y="25" width="6" height="4" rx="2" transform="rotate(90 16.5 25)" fill="#F8A186" />
    <Rect x="14.5" y="12" width="21" height="15" rx="7" fill="#F48240" />
    <Rect x="18.5" y="18" width="6" height="4" rx="2" fill="#C66126" />
    <Rect x="28.5" y="18" width="6" height="4" rx="2" fill="#C66126" />
  </Svg>
);

export default BusIcon;
