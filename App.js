import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';

import { useFonts } from 'expo-font';




export default function App() {


  const [fontsLoaded] = useFonts({
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (<NavigationContainer>
    <RootNavigator />
  </NavigationContainer>)


}