import { Text, View, TouchableHighlight } from 'react-native'
import OctIcon from 'react-native-vector-icons/Octicons'

const Event = ({ styles, colors, schedule, index, showAlert, selectSchedule, navigation }) => {
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
        <TouchableHighlight onPress={() => showAlert(index)} underlayColor={colors.mainBackground}>
          <OctIcon name='x' size={28} style={styles.scheduleRemoveButton} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  )
}

export default Event