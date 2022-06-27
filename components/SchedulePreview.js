import { Text, View, TouchableHighlight } from 'react-native'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Event = ({ styles, colors, schedule, index, showAlert, selectSchedule, navigation, showModalInput }) => {
  const { title, color, inUse } = schedule
  return (
    <TouchableHighlight
      onPress={() => selectSchedule(index)}
      onLongPress={() => navigation.navigate('Edit Schedule', {index: index})}
      underlayColor={colors.mainBackground}
      style={styles.basic}
    >
      <View style={[styles.basic, styles.schedule, {borderColor: inUse ? color : colors.secondaryBackground, borderWidth: 4}]}>
        <Text style={[styles.text, styles.scheduleTitle]}>{title}</Text>

        <View style={styles.scheduleButtons}>
          <TouchableHighlight onPress={() => showModalInput(index)} underlayColor={colors.mainBackground}>
            <MaterialIcon name='content-copy' size={22} style={styles.scheduleDuplicateButton} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => showAlert(index)} underlayColor={colors.mainBackground}>
            <OctIcon name='x' size={28} style={styles.scheduleRemoveButton} />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default Event