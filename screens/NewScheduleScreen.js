import { useState, useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar, Dimensions, TextInput } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { colorPalette, GlobalContext } from '../config/config'

export default function SchedulesScreen({ navigation }) {
  const { darkTheme, i18n } = useContext(GlobalContext)
  const [scheduleTitle, setScheduleTitle] = useState('')
  
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
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t('newSchedule.title')}</Text>
      </View>

      <View style={[styles.basic, styles.scheduleSection]}>
        <TextInput
          style={[styles.input, styles.scheduleTitleInput]}
          onChangeText={setScheduleTitle}
          value={scheduleTitle}
          maxLength={50}
          placeholder={i18n.t('newSchedule.titlePlaceholder')}
          placeholderTextColor={colors.grey}
        />

        <View style={[styles.basic, styles.eventsSectionTitle]}>
          <Text style={[styles.text, {fontSize: 20}]}>{i18n.t('newSchedule.eventTitle')}</Text>
          <MaterialIcon name='alarm-plus' size={24} style={[styles.text, styles.materialIcon]}
          onPress={() => console.log('Add event')}
        />
        </View>
      </View>

      <View style={[styles.basic, {backgroundColor: colors.mainBackground, paddingTop: 10}]}>
        <OctIcon.Button style={styles.addSchedule} backgroundColor={colors.mainBackground} underlayColor={colors.mainBackground}
          name='plus' size={30} onPress={() => console.log('Button pressed')}
        >
          <Text style={styles.addScheduleText}>{i18n.t('newSchedule.button')}</Text>
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
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    scheduleTitleInput: {
      fontSize: 20
    },
    eventsSectionTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width - 40,
      borderBottomColor: colors.mainForeground,
      borderBottomWidth: 1
    },
    materialIcon: {
      marginTop: 2,
      padding: 12
    }
  }), colors]
}