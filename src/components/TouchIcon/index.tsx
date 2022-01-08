import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';

type Props = Pick<TouchableOpacityProps, 'onPress'> & {
  color?: string;
  labelName: string;
  iconName: string;
  size?: number;
};

export const TouchIcon: React.FC<Props> = ({
  color,
  labelName,
  iconName,
  size,
  onPress
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <>
      <Ionicons
        name={iconName}
        style={{
          color: color,
          fontSize: size,
        }}
      />
      <Text style={{ fontSize: 11 }}>{labelName}</Text>
    </>

  </TouchableOpacity>
);