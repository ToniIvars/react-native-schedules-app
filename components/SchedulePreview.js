import { Text, View, TouchableHighlight } from 'react-native'
import OctIcon from 'react-native-vector-icons/Octicons'

const Event = ({ styles, colors, scheduleTitle, index, removeSchedule, navigation }) => {
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Edit Schedule', {index: index})} underlayColor={colors.mainBackground} style={styles.basic}>
      <View style={[styles.basic, styles.schedule]}>
        <Text style={[styles.text, styles.scheduleTitle]}>{scheduleTitle}</Text>
        <TouchableHighlight onPress={() => removeSchedule(index)} underlayColor={colors.mainBackground}>
          <OctIcon name='x' size={28} style={styles.scheduleRemoveButton} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  )
}

export default Event