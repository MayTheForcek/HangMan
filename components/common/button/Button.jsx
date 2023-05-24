import React from 'react';

// Touchable Opacity - used when we want something to be clickable/touchable
// Text - used when we want to display text
import { TouchableOpacity, Text } from 'react-native';

import { FONT, SIZES, COLORS } from '../../../constants/theme';

const Button = ({ handlePress, children }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        margin: SIZES.small,
        backgroundColor: COLORS.secondary,
        width: '35%',
        borderRadius: SIZES.large,
        padding: SIZES.small,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: SIZES.large,
          fontFamily: FONT.bold,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
