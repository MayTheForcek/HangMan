import { useState } from 'react';

// View - used when we want to wrap something into container (equivalent of div)
// SafeAreaView - we use to make sure that no element of the phone destroys the layout of our application, such as notch
// ScrollingView - used when we want to make our screen/view scrollable
// Image - we use when we need to display images
import { View, SafeAreaView, ScrollView, Image } from 'react-native';

// useRouter - hook we need to use when we want to manage app routing
// Stack - we import when we need to customize header
import { Stack, useRouter } from 'expo-router';

import Difficulty from '../components/home/difficulty/Difficulty';
import Info from '../components/home/info/Info';
import Button from '../components/common/button/Button';

import hangman from '../assets/images/hangman.png';

import { COLORS, FONT, SIZES } from '../constants/theme';

const Home = () => {
  const [difficulty, setDifficulty] = useState({});
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: 'HangMan',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: { fontFamily: FONT.bold },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: SIZES.small,
            paddingTop: 0,
            fontFamily: FONT.regular,
          }}
        >
          <View>
            <Image
              source={hangman}
              resizeMode='contain'
              style={{ width: '100%', height: 400 }}
            />
          </View>
          <Difficulty handleDifficulty={setDifficulty} />
          <Info />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: SIZES.small,
            }}
          >
            <Button
              handlePress={() => {
                // Thats how we handle app routing
                router.push({
                  pathname: '/game/game',
                  params: {
                    difficulty: difficulty.difficulty,
                    tries: difficulty.tries,
                    wordLength: difficulty.wordLength,
                  },
                });
              }}
            >
              PLAY
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
