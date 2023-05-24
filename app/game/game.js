import React, { useState, useEffect } from 'react';

// useRouter - hook we need to use when we want to manage app routing
// Stack - we import when we need to customize header
// useSearchParams - hook we use to pass params/data beetween app routs
import { Stack, useRouter, useSearchParams } from 'expo-router';

// Touchable Opacity - used when we want something to be clickable/touchable
// View - used when we want to wrap something into container (equivalent of div)
// Text - used when we want to display text
// SafeAreaView - we use to make sure that no element of the phone destroys the layout of our application, such as notch
// ScrollingView - used when we want to make our screen/view scrollable
// ActivityIndicator - used when we want to display loading indicator
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import HeaderBtn from '../../components/common/header/HeaderBtn';
import Button from '../../components/common/button/Button';

import useFetch from '../../hooks/useFetch';

import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const Game = () => {
  const router = useRouter();
  const params = useSearchParams();
  let letters = 'abcdefghijklmnopqrstuvwxyz';

  const [word, setWord] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);
  const [tries, setTries] = useState(params.tries);
  const [isPlaying, setIsPalying] = useState(true);
  const [lettersArray, setLettersArray] = useState(letters.split(''));

  const { data, finished, isLoading } = useFetch(params.wordLength);

  useEffect(() => {
    setWord(data.split(''));
    setDisplayWord(data.replaceAll(/[a-zA-Z]/g, '_').split(''));
    setIsPalying(true);
  }, [finished]);

  const handleCheck = checkLetter => {
    if (isPlaying) {
      let counter = 0;
      word.map((letter, index) =>
        letter === checkLetter
          ? setDisplayWord(prevDisplayWord =>
              prevDisplayWord.map((displayLetter, displayIndex) =>
                displayIndex === index ? letter : displayLetter
              )
            )
          : counter++
      );
      counter === word.length && setTries(prevTries => prevTries - 1);
      setLettersArray(prevLetters =>
        prevLetters.join('').replace(checkLetter, ' ').split('')
      );
    }
  };

  const handleGameEnd = () => {
    if (tries === 0 || word.join('') === displayWord.join(''))
      setIsPalying(false);
  };

  const handleStartGame = () => {
    // This line rerout to same place with same params
    router.replace({
      pathname: '/game/game',
      params: {
        difficulty: params.difficulty,
        tries: params.tries,
        wordLength: params.wordLength,
      },
    });
  };

  useEffect(() => {
    handleGameEnd();
  }, [tries, word, displayWord]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: '',
          headerBackVisible: false,
          headerLeft: () => (
            <HeaderBtn icon={faArrowLeft} handlePress={() => router.back()} />
          ),
          headerRight: () => <HeaderBtn icon={faBars} handlePress={() => {}} />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: SIZES.small }}>
          {isLoading ? (
            <ActivityIndicator size='large' />
          ) : (
            <Text
              style={{
                fontSize: SIZES.xLarge,
                color: COLORS.secondary,
                textAlign: 'center',
                marginTop: SIZES.xLarge,
                marginBottom: SIZES.xLarge,
                fontFamily: FONT.regular,
              }}
            >
              {isPlaying &&
                (tries
                  ? `You have ${tries} more tries`
                  : `You have an infinity of tries`)}
              {!isPlaying &&
                (tries > 0 || tries == Infinity
                  ? 'You correctly guessed word!'
                  : 'Game over! You lost!')}
            </Text>
          )}
          {!isPlaying && tries === 0 && (
            <View>
              <Text
                style={{
                  fontSize: SIZES.large,
                  color: COLORS.secondary,
                  textAlign: 'center',
                  marginBottom: 4,
                  fontFamily: FONT.regular,
                }}
              >
                Word:{' '}
              </Text>
              <Text
                style={{
                  fontSize: SIZES.xxLarge,
                  color: COLORS.secondary,
                  textAlign: 'center',
                  fontFamily: FONT.medium,
                }}
              >
                {word.join(' ').toUpperCase()}
              </Text>
            </View>
          )}
          <View style={{ marginTop: SIZES.xLarge * 2 }}>
            <Text
              style={{
                fontSize: SIZES.xxLarge,
                color: COLORS.secondary,
                textAlign: 'center',
                fontFamily: FONT.medium,
              }}
            >
              {displayWord.join(' ').toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              marginTop: SIZES.xxLarge * 3,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {lettersArray.map((letter, index) => (
              <TouchableOpacity
                style={{
                  padding: SIZES.small / 3,
                  margin: SIZES.small / 2,
                  width: 38,
                  height: 38,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={index}
                onPress={() => handleCheck(letter)}
                disabled={letter === ' ' ? true : false}
              >
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontSize: SIZES.xLarge,
                    fontFamily: FONT.medium,
                  }}
                >
                  {letter.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {!isPlaying && !isLoading && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: SIZES.xxLarge,
              }}
            >
              <Button handlePress={handleStartGame}>Play Again</Button>
              <Button handlePress={() => router.back()}>Go Home</Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Game;
