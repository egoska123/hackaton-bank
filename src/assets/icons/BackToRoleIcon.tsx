import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BackToRoleIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const BackToRoleIcon: React.FC<BackToRoleIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#333333' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v3h7v4h-7v3z"
        fill={color}
      />
    </Svg>
  );
};

export default BackToRoleIcon; 