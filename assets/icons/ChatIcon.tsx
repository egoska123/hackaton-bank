import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ChatIcon: React.FC<Props> = ({ 
  width = 25, 
  height = 26, 
  color = 'black' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 26" fill="none">
      <Path 
        d="M12.5094 25.3255C12.0135 25.3255 11.5135 25.1505 11.1156 24.7964L7.21146 21.5078H4.16667C1.86875 21.5078 0 19.6391 0 17.3412V4.84117C0 2.54325 1.86875 0.6745 4.16667 0.6745H20.8333C23.1312 0.6745 25 2.54325 25 4.84117V17.3412C25 19.6391 23.1312 21.5078 20.8333 21.5078H17.8625L13.8552 24.8203C13.4792 25.1558 12.9958 25.3255 12.5094 25.3255Z" 
        fill={color}
      />
    </Svg>
  );
};

export default ChatIcon;