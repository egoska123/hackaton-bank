import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const CheckIcon = () => (
  <Svg width="38" height="43" viewBox="0 0 38 43" fill="none">
    <Rect x="0.5" y="5.5" width="37" height="37" rx="8" fill="#3C9619" />
    <Rect x="0.5" y="0.5" width="37" height="37" rx="8" fill="#9DCC49" />
    <Rect
      x="28.6541"
      y="9.61108"
      width="4.11111"
      height="21.113"
      rx="2.05556"
      transform="rotate(45 28.6541 9.61108)"
      fill="#FFF155"
    />
    <Rect
      x="7.35181"
      y="18.5281"
      width="4.11111"
      height="12.614"
      rx="2.05556"
      transform="rotate(-45 7.35181 18.5281)"
      fill="#FFF155"
    />
  </Svg>
);

export default CheckIcon;
