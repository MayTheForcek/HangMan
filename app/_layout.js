// Stack is required to run layout of app
import { Stack } from 'expo-router';

// Rest of this file is needed for Font Awesome
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    RobotoBold: require('../assets/fonts/RobotoMono-Bold.ttf'),
    RobotoMedium: require('../assets/fonts/RobotoMono-Medium.ttf'),
    RobotoRegular: require('../assets/fonts/RobotoMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack onLayout={onLayoutRootView} />;
};

export default Layout;
