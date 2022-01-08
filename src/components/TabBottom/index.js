import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';

export const TouchIcon = ({
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