import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar } from 'react-native'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../config/colors'

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.configBar]}>
        <OctIcon name='gear' size={24} style={[styles.text, {paddingTop: 2}]} />
        <Text style={[styles.text, styles.timetableTitle]}>Timetable title</Text>
        <MaterialIcon name='timetable' size={28} style={[styles.text, {paddingTop: 6}]} />
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
  text: {
    color: colors.foreground,
  },
  configBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.secondaryBackgorund,
    paddingHorizontal: 20
  },
  timetableTitle: {
    fontSize: 28
  },
  currentEvent: {
    flex: 10,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.secondaryBackgorund,
    paddingHorizontal: 16
  },
})