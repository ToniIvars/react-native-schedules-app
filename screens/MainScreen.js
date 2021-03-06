import { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar, Button } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { colorPalette, GlobalContext } from '../config/config'

export default function MainScreen({ navigation }) {
  const { darkTheme, i18n, scheduleInUse } = useContext(GlobalContext)

  const [currentEvent, setCurrentEvent] = useState({})
  const [nextEvent, setNextEvent] = useState({})

  const eventBeforeNow = (event) => {
    const {eventHours, eventMinutes} = event

    const actualDate = new Date()
    const [currentHours, currentMinutes] = actualDate.toLocaleTimeString('en-GB').split(':')

    return parseInt(currentHours) === eventHours
      ? parseInt(currentMinutes) >= eventMinutes
      : parseInt(currentHours) > eventHours
  }

  useEffect(() => {
    if (Object.keys(scheduleInUse).length > 0) { // Check if there is any scheduleInUse (wait for it to be loaded)
      setNextEvent({}) // Reset the next event ecery time the scheduleInUse changes

      const scheduleEvents = scheduleInUse.events
      const possibleEvents = scheduleEvents.filter(scheduleEvent => eventBeforeNow(scheduleEvent))

      if (possibleEvents.length > 0) {
        const _currentEvent = possibleEvents[possibleEvents.length - 1]

        setCurrentEvent(_currentEvent)

        if (scheduleEvents.length > 1) {
          const _currentEventIndex = scheduleEvents.findIndex(el => el === _currentEvent)

          // If the current event is the last of the schedule events then set the next event to the first one
          setNextEvent(scheduleEvents[_currentEventIndex < scheduleEvents.length - 1 ? _currentEventIndex + 1 : 0])
        }

      } else {
        setCurrentEvent(scheduleEvents[scheduleEvents.length - 1])

        if (scheduleEvents.length > 1) {
          setNextEvent(scheduleEvents[0])
        }
      }
    }
  }, [scheduleInUse])

  const [styles, colors] = createStyles(darkTheme)

  const [fontsLoaded] = useFonts({OpenSans_400Regular})

  const getEventTime = event => event.eventHours.toString().padStart(2, '0') + ':' + event.eventMinutes.toString().padStart(2, '0')

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.configBar]}>
        <MaterialIcon name='clock-outline' size={28} style={[styles.text, {marginTop: 1, paddingRight: 8}]} />
        <Text style={[styles.text, styles.scheduleTitle]}>{scheduleInUse.title ? scheduleInUse.title : i18n.t('main.noScheduleTitle')}</Text>
      </View>

      {/* <View style={[styles.basic, styles.titleBar]}>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {marginTop: 6, paddingRight: 10}]} />
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t('schedules.title')}</Text>
      </View> */}

      {Object.keys(scheduleInUse).length > 0 && Object.keys(currentEvent).length > 0 ?
        <View style={[styles.basic, styles.currentEvent]}>
          <Text style={[styles.text, styles.clock, {color: scheduleInUse.color}]}>{getEventTime(currentEvent)}</Text>
          <Text style={[styles.text, styles.currentEventName, {color: scheduleInUse.color}]}>{currentEvent.eventName}</Text>
        </View>
        :
        <View style={[styles.basic, styles.currentEvent]}>
          <Text style={[styles.text, styles.noScheduletext]}>{i18n.t('main.noScheduleText')}</Text>
          <Button title={i18n.t('main.noScheduleButton')} color={colors.green} onPress={() => navigation.navigate('New Schedule')} />
        </View>
      }

      <View style={[styles.basic, styles.nextEvent]}>
        <OctIcon name='chevron-right' size={24} style={[styles.text, {marginRight: 10}]} />
        <Text numberOfLines={1} style={styles.text}>
          {Object.keys(nextEvent).length > 0
            ? `(${getEventTime(nextEvent)})  ${nextEvent.eventName}`
            : i18n.t('main.noNextEvent')}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const createStyles = darkTheme => {
  const colors = darkTheme ? colorPalette.darkTheme : colorPalette.lightTheme

  return [StyleSheet.create({
    container: {
      backgroundColor: colors.secondaryBackground,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    basic: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    text: {
      color: colors.mainForeground,
      fontFamily: 'OpenSans_400Regular'
    },
    configBar: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: colors.secondaryBackground,
      paddingHorizontal: 8
    },
    scheduleTitle: {
      fontSize: 28
    },
    currentEvent: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      paddingBottom: 70
    },
    currentEventName: {
      fontSize: 20,
      textAlign: 'center',
      paddingHorizontal: 24
    },
    clock: {
      fontSize: 112
    },
    nextEvent: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: colors.mainBackground,
      paddingHorizontal: 16
    },
    noScheduletext: {
      marginBottom: 16,
      marginHorizontal: 12,
      fontSize: 24,
      textAlign: 'center'
    }
  }), colors]
}