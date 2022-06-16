import { Text, View, TextInput, TouchableHighlight } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import OctIcon from 'react-native-vector-icons/Octicons'

const NewEvent = ({ styles, colors, i18n, ev, index, setEventName, setEventHours, setEventMinutes, removeEvent}) => {
  const { eventName, eventHours, eventMinutes } = ev

  return (
  <View style={[styles.basic, {marginVertical: 12}]}>
    <View style={[styles.basic, styles.eventContainer]}>
      <TextInput
        style={[styles.input, styles.eventInput]}
        value={eventName}
        onChangeText={value => setEventName(index, value)}
        maxLength={30}
        placeholder={i18n.t('newSchedule.eventPlaceholder')}
        placeholderTextColor={colors.grey}
      />
      <TouchableHighlight onPress={() => removeEvent(index)} underlayColor={colors.secondaryBackground}>
        <OctIcon name='x' size={24} style={[styles.text, styles.materialIcon, {color: colors.red}]} />
      </TouchableHighlight>
    </View>

    <View style={[styles.basic, styles.eventContainer, {justifyContent: 'flex-start'}]}>
      <View style={styles.eventContainer}>
        <Text style={[styles.text, {marginRight: 10}]}>{i18n.t('newSchedule.hours')}:</Text>
        <NumericInput initValue={eventHours} minValue={0} maxValue={24} rounded
          borderColor={colors.mainForeground}
          iconStyle={{color: colors.secondaryForeground}}
          textColor={colors.mainForeground}
          rightButtonBackgroundColor={colors.gray}
          leftButtonBackgroundColor={colors.gray}
          totalHeight={34} totalWidth={90}
          onChange={value => setEventHours(index, value)}
        />
      </View>

      <View style={[styles.eventContainer, {marginLeft: 14}]}>
        <Text style={[styles.text, {marginRight: 10}]}>{i18n.t('newSchedule.minutes')}:</Text>
        <NumericInput initValue={eventMinutes} minValue={0} maxValue={60} rounded step={5} editable={false}
          borderColor={colors.mainForeground}
          iconStyle={{color: colors.secondaryForeground}}
          textColor={colors.mainForeground}
          rightButtonBackgroundColor={colors.gray}
          leftButtonBackgroundColor={colors.gray}
          totalHeight={34} totalWidth={90}
          onChange={value => setEventMinutes(index, value)}
        />
      </View>
    </View>
  </View>
  )
}

export default NewEvent