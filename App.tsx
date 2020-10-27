import 'react-native-gesture-handler';

import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_300Light_Italic, useFonts} from '@expo-google-fonts/roboto';

import Routes from './src/Routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_300Light_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
