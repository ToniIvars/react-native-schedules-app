import { useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoading from 'expo-app-loading'

import { ThemeContext } from '../App'
import colorPalette from '../config/colors'

export default function MainScreen({ navigation }) {
  const { darkTheme } = useContext(ThemeContext)

  const styles = createStyles(darkTheme)

  let [fontsLoaded] = useFonts({OpenSans_400Regular})

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.configBar]}>
        <OctIcon name='gear' size={24} style={[styles.text, {marginTop: 2, padding: 12}]}
          onPress={() => navigation.navigate('Configuration')}
        />
        <Text style={[styles.text, styles.scheduleTitle]}>Schedule title</Text>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {marginTop: 6, padding: 12}]}
          onPress={() => navigation.navigate('Schedules')}
        />
      </View>

      <View style={[styles.basic, styles.currentEvent]}>
        <Text style={[styles.text, styles.clock]}>00:00</Text>
        <Text style={[styles.text, styles.currentEventName]}>This will be the event name</Text>
      </View>

      <View style={[styles.basic, styles.nextEvent]}>
        <OctIcon name='chevron-right' size={24} style={[styles.text, {marginRight: 10}]} />
        <Text numberOfLines={1} style={styles.text}>This will be the information for the next event</Text>
      </View>
    </SafeAreaView>
  )
}

const createStyles = darkTheme => {
  const colors = darkTheme ? colorPalette.darkTheme : colorPalette.lightTheme

  return StyleSheet.create({
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
      justifyContent: 'space-between',
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
      backgroundColor: colors.secondaryBackground,
      paddingHorizontal: 16
    }
  })
}