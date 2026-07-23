import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from '../Layout';
import EmisoresListScreen from '../Screens/EmisoresListScreen';
import EmisorFormScreen from '../Screens/EmisorFormScreen';
import ReceptoresListScreen from '../Screens/ReceptoresListScreen';
import ReceptorFormScreen from '../Screens/ReceptorFormScreen';
import CFDIFormScreen from '../Screens/CFDIFormScreen';
import BorradoresScreen from '../Screens/BorradoresScreen';
import Leyes from '../Components/Leyes';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Layout" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Layout" component={Layout} />
      <Stack.Screen name="EmisoresList" component={EmisoresListScreen} />
      <Stack.Screen name="EmisorForm" component={EmisorFormScreen} />
      <Stack.Screen name="ReceptoresList" component={ReceptoresListScreen} />
      <Stack.Screen name="ReceptorForm" component={ReceptorFormScreen} />
      <Stack.Screen name="CFDIForm" component={CFDIFormScreen} />
      <Stack.Screen name="Borradores" component={BorradoresScreen} />
      <Stack.Screen name="Leyes" component={Leyes} />
    </Stack.Navigator>
  );
}
