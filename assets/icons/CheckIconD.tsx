import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

const CheckIconD: React.FC<{ width?: number; height?: number }> = ({
  width = 38,
  height = 42,
}) => (
  <Svg width={width} height={height} viewBox="0 0 38 42" fill="none">
    <Rect x={0.5} y={5} width={37} height={37} rx={8} fill="#849B7B" />
    <Rect x={0.5} y={0} width={37} height={37} rx={8} fill="#C9CEBF" />
    <Rect
      x={28.6543}
      y={9.11108}
      width={4.11111}
      height={21.113}
      rx={2.05556}
      transform="rotate(45 28.6543 9.11108)"
      fill="#FFFCDB"
    />
    <Rect
      x={7.35156}
      y={18.0281}
      width={4.11111}
      height={12.614}
      rx={2.05556}
      transform="rotate(-45 7.35156 18.0281)"
      fill="#FFFCDB"
    />
  </Svg>
);

export default CheckIconD;
