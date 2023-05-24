import React, { useState } from 'react';

// Touchable Opacity - used when we want something to be clickable/touchable
// View - used when we want to wrap something into container (equivalent of div)
// Text - used when we want to display text
import { Text, TouchableOpacity, View } from 'react-native';

import Card from '../../common/cards/Card';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const Info = () => {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <View style={{ marginTop: SIZES.medium }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            paddingVertical: SIZES.xSmall,
            paddingStart: SIZES.xSmall / 2,
            fontSize: SIZES.large,
            textTransform: 'uppercase',
            color: COLORS.secondary,
            fontFamily: FONT.medium,
          }}
        >
          About Game
        </Text>
        <TouchableOpacity
          onPress={() => setInfoVisible(prevInfoVisible => !prevInfoVisible)}
        >
          <Text style={{ color: COLORS.white, fontFamily: FONT.medium }}>
            {infoVisible ? 'Hide' : 'Show more'}
          </Text>
        </TouchableOpacity>
      </View>
      {infoVisible && (
        <Card>
          The game involves guessing the word by pressing the correct letters
          one at a time. If the letter is in the word it is revealed. The player
          has several attempts to make a mistake, if the player guesses the word
          before using all the attempts he wins, otherwise he loses.
        </Card>
      )}
    </View>
  );
};

export default Info;
