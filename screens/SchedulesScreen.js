import { useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ScrollView, Platform, StatusBar, Dimensions, TouchableHighlight } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoading from 'expo-app-loading'

import { ThemeContext } from '../App'
import colorPalette from '../config/colors'

export default function SchedulesScreen({ navigation }) {
  const { darkTheme } = useContext(ThemeContext)
  
  const [styles, colors] = createStyles(darkTheme)

  let [fontsLoaded] = useFonts({OpenSans_400Regular})

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <OctIcon name='arrow-left' size={32}
        style={styles.goBackIcon}
        onPress={navigation.goBack}
      />

      <View style={[styles.basic, styles.titleBar]}>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {marginTop: 6, paddingRight: 10}]} />
        <Text style={[styles.text, styles.screenTitle]}>Schedules</Text>
      </View>

      <ScrollView style={styles.scheduleSection} contentContainerStyle={[styles.basic, {justifyContent: 'flex-start'}]}>
        <TouchableHighlight onPress={() => console.log('Yes')} underlayColor={colors.mainBackground} style={styles.basic}>
          <View style={[styles.basic, styles.schedule]}>
            <Text style={[styles.text, styles.scheduleTitle]}>Schedule title</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>

      <View style={[styles.basic, {backgroundColor: colors.mainBackground, paddingTop: 10}]}>
        <OctIcon.Button style={styles.newSchedule} backgroundColor={colors.mainBackground} underlayColor={colors.mainBackground}
          name='plus' size={30} onPress={() => console.log('Button pressed')}
        >
          <Text style={styles.newScheduleText}>New schedule</Text>
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
      marginTop: 10,
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
      marginVertical: 10,
      paddingVertical: 12,
      marginHorizontal: 20
    },
    scheduleTitle: {
      fontSize: 16
    }
  }), colors]
}