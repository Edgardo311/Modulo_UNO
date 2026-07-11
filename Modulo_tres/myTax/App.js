import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './navigation/MainNavigator';
import LoginScreen from './LoginScreen';
import { AutoProvider } from './AutoContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AutoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AutoProvider>
  );
}
