import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen'; 
import EnableLocationScreen from './screens/EnableLocationScreen';
import HomeScreenWithMap from './screens/HomeScreenWithMap';



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

        {/* OTP Screen */}
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

        {/* Enable Location Screen */}
        <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />

         {/* Home Screen With Map */}
         <Stack.Screen name="HomeScreenWithMap" component={HomeScreenWithMap} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
