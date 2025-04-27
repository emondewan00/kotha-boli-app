import React from 'react';
import {View} from 'react-native';

type SeparatorProps = {
  color?: string;
};

const Separator: React.FC<SeparatorProps> = ({color = '#BD9FE9'}) => {
  return (
    <View
      className="h-0.5 w-full "
      style={{
        backgroundColor: color,
      }}
    />
  );
};
export default Separator;
