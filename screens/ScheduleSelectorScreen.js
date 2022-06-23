import { useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ScrollView, Platform, StatusBar, Dimensions } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { colorPalette, GlobalContext } from '../config/config'
import SchedulePreview from '../components/SchedulePreview'

export default function ScheduleSelectorScreen({ navigation }) {
  const { darkTheme, i18n, saveData, schedules, setSchedules, setScheduleInUse } = useContext(GlobalContext)
  
  const [styles, colors] = createStyles(darkTheme)

  const [fontsLoaded] = useFonts({OpenSans_400Regular})

  if (!fontsLoaded) {
    return null
  }

  const selectSchedule = index => {
    const newSchedules = schedules.map((ev, evIndex) => {
      ev.inUse = index === evIndex ? true : false
      if (ev.inUse) {
        setScheduleInUse(ev)
      }
      
      return ev
    })

    setSchedules(newSchedules)

    saveData('@schedules', newSchedules)
  }

  const removeSchedule = index => {
    const newSchedules = schedules.filter((ev, evIndex) => evIndex !== index)
    setSchedules(newSchedules)

    saveData('@schedules', newSchedules)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <OctIcon name='arrow-left' size={32}
        style={styles.goBackIcon}
        onPress={navigation.goBack}
      />

      <View style={[styles.basic, styles.titleBar]}>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {marginTop: 6, paddingRight: 10}]} />
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t('schedules.title')}</Text>
      </View>

      <ScrollView style={styles.scheduleSection} contentContainerStyle={[styles.basic, {justifyContent: 'flex-start'}]}>
        {schedules.map((ev, index) => <SchedulePreview key={index} styles={styles} colors={colors}
            schedule={ev} index={index} removeSchedule={removeSchedule} selectSchedule={selectSchedule}navigation={navigation}
          />
        )}
      </ScrollView>

      <View style={[styles.basic, {backgroundColor: colors.mainBackground, paddingTop: 10}]}>
        <OctIcon.Button style={styles.newSchedule} backgroundColor={colors.mainBackground} underlayColor={colors.mainBackground}
          name='plus' size={30} onPress={() => navigation.navigate('New Schedule')}
        >
          <Text style={styles.newScheduleText}>{i18n.t('schedules.button')}</Text>
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
    newSchedule: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: colors.green,
      height: 60,
      justifyContent: 'center',
      marginBottom: 16
    },
    newScheduleText: {
      color: '#F7F7FF',
      fontSize: 24
    },
    schedule: {
      backgroundColor: colors.secondaryBackground,
      width: Dimensions.get('window').width - 40,
      borderRadius: 5,
      marginVertical: 6,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    scheduleTitle: {
      fontSize: 16,
      marginLeft: 10
    },
    scheduleRemoveButton: {
      color: colors.red,
      marginTop: 2,
      paddingVertical: 10,
      paddingHorizontal: 16
    }
  }), colors]
}