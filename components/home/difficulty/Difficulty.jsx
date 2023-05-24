import React, { useState } from 'react';

// Touchable Opacity - used when we want something to be clickable/touchable
// FlatList - used when we want to display list of items (we need to pass keyExcractor and data as attributes)
// View - used when we want to wrap something into container (equivalent of div)
// Text - used when we want to display text
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import Card from '../../common/cards/Card';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const Difficulty = ({ handleDifficulty }) => {
  const [activeDifficulty, setActiveDifficulty] = useState(null);

  const gameDifficulties = ['Peaceful', 'Easy', 'Medium', 'Hard', 'Hardcore'];
  const difficultyInfo = [
    'At this level of difficulty, words are 5 letters long and the player has an infinite number of attempts.',
    'At this level of difficulty, words are 6 letters long and a player can make 10 mistakes by guessing the wrong letter.',
    'At this level of difficulty, words are 7 letters long and a player can make 7 mistakes by guessing the wrong letter.',
    'At this level of difficulty, words are 8 letters long and a player can make 4 mistakes by guessing the wrong letter.',
    'At this level of difficulty, words are 9 letters long and the player can make 1 mistake guessing the wrong letter.',
  ];
  const difficultyTries = [Infinity, 10, 7, 4, 1];
  const wordsLength = [5, 6, 7, 8, 9];

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={gameDifficulties}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingVertical: SIZES.xSmall,
              paddingHorizontal: SIZES.small,
              borderRadius: SIZES.xLarge,
              borderWidth: 1,
              borderColor: COLORS.secondary,
              minWidth: 106,
              backgroundColor:
                activeDifficulty === item ? COLORS.white : 'transparent',
            }}
            onPress={() => {
              setActiveDifficulty(item);
              handleDifficulty({
                difficulty: item,
                tries: difficultyTries[gameDifficulties.indexOf(item)],
                wordLength: wordsLength[gameDifficulties.indexOf(item)],
              });
            }}
          >
            <Text
              style={{
                color: COLORS.secondary,
                fontSize: SIZES.medium,
                textAlign: 'center',
                fontFamily: FONT.medium,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {activeDifficulty && (
        <Card>
          {difficultyInfo[gameDifficulties.indexOf(activeDifficulty)]}
        </Card>
      )}
    </View>
  );
};

export default Difficulty;
