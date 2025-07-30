import * as React from 'react';
import Svg, { Rect, Ellipse, Circle } from 'react-native-svg';

const CameraIcon: React.FC<{ width?: number; height?: number }> = ({
  width = 40,
  height = 34,
}) => (
  <Svg width={width} height={height} viewBox="0 0 40 34" fill="none">
    <Rect x={4.5} y={10.5} width={35} height={23} rx={5} fill="#989898" />
    <Rect x={0.5} y={10.5} width={35} height={23} rx={5} fill="#D9D9D9" />
    <Rect x={10.5} y={0.5} width={15} height={13} rx={5} fill="#D9D9D9" />
    <Rect x={10.5} y={0.5} width={12} height={6} rx={3} fill="#C66126" />
    <Ellipse cx={19.5} cy={21} rx={11} ry={10.5} fill="#BABABA" />
    <Circle cx={15.5} cy={20.5} r={12} fill="#989898" />
    <Circle cx={15.5} cy={20.5} r={11} fill="#424242" />
    <Ellipse
      cx={10.8209}
      cy={17.647}
      rx={2.5}
      ry={4.5}
      transform="rotate(28.0155 10.8209 17.647)"
      fill="#D9D9D9"
    />
    <Circle cx={31.5} cy={14.5} r={1} fill="#FF1111" />
  </Svg>
);

export default CameraIcon;
