import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar} from 'react-native'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../config/colors'

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.configBar]}>
        <OctIcon name='gear' size={24} style={[styles.text, {paddingTop: 2}]} />
        <Text style={[styles.text, styles.bigText]}>Timetable title</Text>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {paddingTop: 6}]} />
      </View>

      <View style={[styles.basic, styles.currentEvent]}>
        <Text style={styles.text}>This will be the current event</Text>
      </View>

      <View style={[styles.basic, styles.nextEvent]}>
        <Text style={styles.text}>This will be the information for the next event</Text>
      </View>
    </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
  container: {
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
  configBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.dark,
    paddingHorizontal: 20
  },
  currentEvent: {
    flex: 10,
    backgroundColor: colors.darker,
  },
  nextEvent: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  text: {
    color: colors.light,
  },
  bigText: {
    fontSize: 28
  },
})