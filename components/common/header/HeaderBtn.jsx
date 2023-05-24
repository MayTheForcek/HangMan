import React from 'react';

// Touchable Opacity - used when we want something to be clickable/touchable
import { TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { SIZES, COLORS } from '../../../constants/theme';

const HeaderBtn = ({ icon, handlePress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.gray,
        borderRadius: SIZES.xSmall,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handlePress}
    >
      <FontAwesomeIcon
        icon={icon}
        size={SIZES.large}
        color={COLORS.secondary}
      />
    </TouchableOpacity>
  );
};

export default HeaderBtn;
