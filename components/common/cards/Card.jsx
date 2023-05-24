import React from 'react';

// View - used when we want to wrap something into container (equivalent of div)
// Text - used when we want to display text
import { View, Text } from 'react-native';

import { COLORS, SHADOWS, SIZES, FONT } from '../../../constants/theme';

const Card = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.gray2,
        marginTop: SIZES.xSmall,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        ...SHADOWS.regular,
      }}
    >
      <Text
        style={{
          color: COLORS.secondary,
          fontSize: SIZES.medium,
          fontFamily: FONT.regular,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Card;
