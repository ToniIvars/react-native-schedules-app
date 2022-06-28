import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import MainScreen from './screens/MainScreen'
import ConfigScreen from './screens/ConfigScreen'
import ScheduleSelectorScreen from './screens/ScheduleSelectorScreen'
import ScheduleScreen from './screens/ScheduleScreen'
import { en, es } from './i18n/translations'
import { GlobalContext, languages } from './config/config'

i18n.translations = { en, es }
i18n.fallbacks = true

const readData = async (key, emptyItem) => {
  try {
    const item = await AsyncStorage.getItem(key)
    return item !== null ? JSON.parse(item) : emptyItem

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

const ScheduleStack = createNativeStackNavigator()

function ScheduleStackScreen() {
  return (
    <ScheduleStack.Navigator screenOptions={{headerShown: false}}>
      <ScheduleStack.Screen name='Schedules Selector' component={ScheduleSelectorScreen} />
      <ScheduleStack.Screen name='New Schedule' component={ScheduleScreen} initialParams={{isNewSchedule: true}} />
      <ScheduleStack.Screen name='Edit Schedule' component={ScheduleScreen} initialParams={{isNewSchedule: false}} />
    </ScheduleStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  const [language, setLanguage] = useState(Localization.locale.substring(0, 2))
  const [schedules, setSchedules] = useState([])
  const [scheduleInUse, setScheduleInUse] = useState({})

  const changeLanguage = lang => setLanguage(languages[lang])
  
  useEffect(() => {
    readData('@config', {})
      .then(config => {
        if (config.darkTheme !== undefined) {
          setDarkTheme(config.darkTheme)
        }

        if (config.language !== undefined) {
          changeLanguage(config.language)
        }
      })

      readData('@schedules', [])
      .then(storageSchedules => {
        setSchedules(storageSchedules)

        const storageScheduleInUse = storageSchedules.filter(schedule => schedule.inUse)[0]
        setScheduleInUse(storageScheduleInUse ? storageScheduleInUse : {})
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
    saveData: saveData,
    schedules: schedules,
    setSchedules, setSchedules,
    scheduleInUse: scheduleInUse,
    setScheduleInUse, setScheduleInUse
  }

  const screenOptions = {
    tabBarLabelStyle: {marginBottom: 4, marginTop: 0},
    tabBarIconStyle: {marginBottom: -4},
    tabBarActiveTintColor: '#E7214C',
    tabBarInactiveTintColor: darkTheme ? '#AFAFAF' : '#808080',
    headerShown: false,
    tabBarStyle: {backgroundColor: darkTheme ? '#2B2B2B' : '#CDCDCD', borderTopWidth: 0} 
  }

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={globalContextValue}>
        <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name='Home' component={MainScreen} options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name='clock-outline' size={size} color={color} />,
            tabBarIconStyle: {marginBottom: -2},
            title: i18n.t('main.title')
          }}
        />
        <Tab.Screen name='Schedules' component={ScheduleStackScreen} options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name='timetable' size={size-1} color={color} />,
            title: i18n.t('schedules.title')
          }}
        />
        <Tab.Screen name='Configuration' component={ConfigScreen} options={{
            tabBarIcon: ({ color, size }) => <OctIcon name='gear' size={size-2} color={color} />,
            title: i18n.t('config.title')
          }}
        />
        </Tab.Navigator>
      </GlobalContext.Provider>
    </NavigationContainer>
  )
}