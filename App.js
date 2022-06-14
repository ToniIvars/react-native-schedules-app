import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

import MainScreen from './screens/MainScreen'
import ConfigScreen from './screens/ConfigScreen'
import SchedulesScreen from './screens/SchedulesScreen'
import NewScheduleScreen from './screens/NewScheduleScreen'
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

const readData = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key)
    return item !== null ? JSON.parse(item) : {}

  } catch(e) {
    console.error(e)
  }
}

const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)

  } catch (e) {
    console.error(e)
  }
}

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  const [language, setLanguage] = useState(Localization.locale.substring(0, 2))

  const changeLanguage = lang => setLanguage(languages[lang])

  useEffect(() => {
    readData('@config')
      .then(config => {
        if (config.darkTheme !== undefined) {
          setDarkTheme(config.darkTheme)
        }

        if (config.language !== undefined) {
          changeLanguage(config.language)
        }
      })
  }, [])

  i18n.locale = language

  const globalContextValue = {
    darkTheme: darkTheme,
    setDarkTheme: setDarkTheme,
    language: language,
    changeLanguage: changeLanguage,
    i18n: i18n,
    readData: readData,
    saveData: saveData
  }

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={globalContextValue}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='Configuration' component={ConfigScreen} />
          <Stack.Screen name='Schedules' component={SchedulesScreen} />
          <Stack.Screen name='New Schedule' component={NewScheduleScreen} />
        </Stack.Navigator>
      </GlobalContext.Provider>
    </NavigationContainer>
  )
}