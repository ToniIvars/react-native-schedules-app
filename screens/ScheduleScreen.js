import { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar, Dimensions, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ColorPicker } from 'react-native-btr'

import { colorPalette, GlobalContext } from '../config/config'
import Event from '../components/Event'

export default function ScheduleScreen({ route, navigation }) {
  const { isNewSchedule, index } = route.params

  const { darkTheme, i18n, readData, saveData, setSchedules, setScheduleInUse } = useContext(GlobalContext)

  const scheduleColors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#03A9F4",
    "#009688",
    "#8BC34A",
    "#FF9800",
    "#FF5722"
  ]

  const [scheduleTitle, setScheduleTitle] = useState('')
  const [scheduleColor, setScheduleColor] = useState(scheduleColors[0])
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  // Load the state of the schedule if it is an existent one
  useEffect(() => {
    if (!isNewSchedule) {
      readData('@schedules', [])
      .then(previousSchedules => {
        const { title, color, events } = previousSchedules[index]

        setScheduleTitle(title)
        setScheduleColor(color)
        setEvents(events)
      })
    }
  }, [])

  const checkIsCorrect = (schedule, previousSchedules) => {
    if (!isNewSchedule) {
      previousSchedules = previousSchedules.filter((ev, evIndex) => evIndex !== index)
    }

    const previousSchedulesTitles = previousSchedules.map(sch => sch.title)

    if (!schedule.title || previousSchedulesTitles.includes(schedule.title)) {
      return [false, i18n.t('scheduleCreation.invalidTitle')]
    }

    const scheduleEvents = schedule.events

    if (scheduleEvents.length === 0) {
      return [false, i18n.t('scheduleCreation.noEvents')]
    }

    if (scheduleEvents.some(event => !event.eventName.trim())) {
      return [false, i18n.t('scheduleCreation.invalidEventsTitles')]
    }

    const scheduleEventsHours = schedule.events.map(event => event.eventHours)
    const scheduleEventsMinutes = schedule.events.map(event => event.eventMinutes)

    if (scheduleEvents.some(({ eventHours, eventMinutes }) => scheduleEventsHours.filter(hours => hours === eventHours).length > 1 &&
      scheduleEventsMinutes.filter(minutes => minutes === eventMinutes).length > 1)
    ) {
      return [false, i18n.t('scheduleCreation.invalidEventsTimes')]
    }

    return [true, '']
  }

  const addEvent = () => {
    const newEvent = {
      eventName: '',
      eventHours: 0,
      eventMinutes: 0,
    }

    const newEvents = [...events, newEvent]
    setEvents(newEvents)
  }

  const removeEvent = index => {
    const newEvents = events.filter((ev, evIndex) => evIndex !== index)
    setEvents(newEvents)
  }

  const setEventName = (index, value) => {
    const newEvent = events[index]
    newEvent.eventName = value

    const newEvents = events.map((ev, evIndex) => evIndex !== index ? ev : newEvent)
    setEvents(newEvents)
  }

  const setEventHours = (index, value) => {
    const newEvent = events[index]
    newEvent.eventHours = value < 24 ? value : 0

    const newEvents = events.map((ev, evIndex) => evIndex !== index ? ev : newEvent)
    setEvents(newEvents)
  }

  const setEventMinutes = (index, value) => {
    const newEvent = events[index]
    newEvent.eventMinutes = (value < 60 ? value : 0)

    const newEvents = events.map((ev, evIndex) => evIndex !== index ? ev : newEvent)
    setEvents(newEvents)
  }

  const saveSchedule = () => {
    readData('@schedules', [])
      .then(previousSchedules => {
        const schedule = {
          title: scheduleTitle.trim(),
          color: scheduleColor,
          events: events
        }

        const [isCorrect, message] = checkIsCorrect(schedule, previousSchedules)

        if (!isCorrect) {
          setError(message)
          return false
        }

        if (isNewSchedule) {
          schedule.inUse = previousSchedules.length > 0 ? false : true

          const newSchedules = [...previousSchedules, schedule]
          setSchedules(newSchedules)

          saveData('@schedules', newSchedules)

        } else {
          schedule.inUse = previousSchedules[index].inUse

          const newSchedules = previousSchedules
          newSchedules.splice(index, 1, schedule)

          setSchedules(newSchedules)

          saveData('@schedules', newSchedules)
        }

        if (schedule.inUse) {
          setScheduleInUse(schedule)
        }
        
        return true
      })
      .then(prev => prev && navigation.navigate('Schedules'))
  }
  
  const [styles, colors] = createStyles(darkTheme)

  const [fontsLoaded] = useFonts({OpenSans_400Regular})

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <OctIcon name='arrow-left' size={32}
        style={styles.goBackIcon}
        onPress={navigation.goBack}
      />

      <View style={[styles.basic, styles.titleBar]}>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {marginTop: 6, paddingRight: 10}]} />
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t(`${isNewSchedule ? 'newSchedule' : 'editSchedule'}.title`)}</Text>
      </View>

      {error.length > 0 && 
        <Text style={[styles.text, styles.errorMessage]}>{error}</Text>
      }

      <View style={[styles.basic, styles.scheduleSection]}>
        <TextInput
          style={[styles.input, styles.scheduleTitleInput]}
          onChangeText={setScheduleTitle}
          value={scheduleTitle}
          maxLength={50}
          placeholder={i18n.t('newSchedule.titlePlaceholder')}
          placeholderTextColor={colors.grey}
        />

        <View style={[styles.basic, {paddingHorizontal: 12}]}>
          <ColorPicker colors={scheduleColors} selectedColor={scheduleColor} onSelect={setScheduleColor} />
        </View>

        <View style={[styles.basic, styles.eventsSectionTitle]}>
          <Text style={[styles.text, {fontSize: 20}]}>{i18n.t('newSchedule.eventTitle')}</Text>
          <TouchableHighlight onPress={addEvent} underlayColor={colors.secondaryBackground}>
            <MaterialIcon name='alarm-plus' size={24} style={[styles.text, styles.materialIcon]} />
          </TouchableHighlight>
        </View>

        <ScrollView contentContainerStyle={[styles.basic, styles.eventSectionContainer]}>
          {events.map((ev, index) => <Event key={index} styles={styles} colors={colors} i18n={i18n} ev={ev} index={index}
              setEventName={setEventName} setEventHours={setEventHours} setEventMinutes={setEventMinutes} removeEvent={removeEvent}
            />
          )}
        </ScrollView>
      </View>

      <View style={[styles.basic, {backgroundColor: colors.mainBackground, paddingTop: 10}]}>
        <OctIcon.Button style={styles.addSchedule} backgroundColor={colors.mainBackground} underlayColor={colors.mainBackground}
          name='plus' size={30} onPress={saveSchedule}
        >
          <Text style={styles.addScheduleText}>{i18n.t(`${isNewSchedule ? 'newSchedule' : 'editSchedule'}.button`)}</Text>
        </OctIcon.Button>
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
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    titleBar: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: colors.secondaryBackground,
    },
    screenTitle: {
      fontSize: 28
    },
    scheduleSection: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      paddingTop: 10,
      justifyContent: 'flex-start'
    },
    goBackIcon: {
      position: 'absolute',
      top: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 6,
      left: 4,
      color: colors.mainForeground,
      zIndex: 1,
      paddingVertical: 10,
      paddingHorizontal: 16
    },
    addSchedule: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: colors.green,
      height: 60,
      justifyContent: 'center',
      marginBottom: 16
    },
    addScheduleText: {
      color: '#F7F7FF',
      fontSize: 24
    },
    input: {
      backgroundColor: colors.secondaryBackground,
      color: colors.mainForeground,
      width: Dimensions.get('window').width - 40,
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    scheduleTitleInput: {
      fontSize: 20,
      marginVertical: 10
    },
    eventsSectionTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width - 40,
      borderBottomColor: colors.mainForeground,
      borderBottomWidth: 1
    },
    eventSectionContainer: {
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width - 40
    },
    materialIcon: {
      marginTop: 2,
      padding: 12,
    },
    eventContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    eventInput: {
      paddingVertical: 4,
      width: Dimensions.get('window').width - 80
    },
    errorMessage: {
      backgroundColor: colors.red,
      width: '100%',
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: 16,
    }
  }), colors]
}