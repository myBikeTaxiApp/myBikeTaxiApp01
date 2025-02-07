import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

// Create the stack navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Configure StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide headers globally
          gestureEnabled: true, // Enable gestures for navigation
        }}
      >
        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
