import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import MainScreen from './screens/MainScreen'
import ConfigScreen from './screens/ConfigScreen'
import SchedulesScreen from './screens/SchedulesScreen'
import { en, es } from './i18n/translations'

const Stack = createNativeStackNavigator()

export const GlobalContext = React.createContext()

i18n.translations = { en, es }
i18n.fallbacks = true

export const languages = {
  'English': 'en',
  'Español': 'es',
  'en': 'English',
  'es': 'Español'
}

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  const [language, setLanguage] = useState(Localization.locale.substring(0, 2))

  const changeLanguage = lang => setLanguage(languages[lang])

  i18n.locale = language

  const globalContextValue = {
    darkTheme: darkTheme,
    setDarkTheme: setDarkTheme,
    language: language,
    changeLanguage: changeLanguage,
    i18n: i18n
  }

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={globalContextValue}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='Configuration' component={ConfigScreen} />
          <Stack.Screen name='Schedules' component={SchedulesScreen} />
        </Stack.Navigator>
      </GlobalContext.Provider>
    </NavigationContainer>
  )
}