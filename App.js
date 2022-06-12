import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen'
import ConfigScreen from './screens/ConfigScreen'
import SchedulesScreen from './screens/SchedulesScreen'

const Stack = createNativeStackNavigator()

export const ThemeContext = React.createContext()

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false)

  const themeContextValue = {
    darkTheme: darkTheme,
    setDarkTheme: setDarkTheme
  }

  return (
    <NavigationContainer>
      <ThemeContext.Provider value={themeContextValue}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='Configuration' component={ConfigScreen} />
          <Stack.Screen name='Schedules' component={SchedulesScreen} />
        </Stack.Navigator>
      </ThemeContext.Provider>
    </NavigationContainer>
  )
}