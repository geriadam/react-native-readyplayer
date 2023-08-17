import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../screens/SignInScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};