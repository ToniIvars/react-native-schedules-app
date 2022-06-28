import { useContext, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ScrollView, Platform, StatusBar, Dimensions, Alert, TextInput } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ModalInput } from 'react-native-btr'

import { colorPalette, GlobalContext } from '../config/config'
import SchedulePreview from '../components/SchedulePreview'

export default function ScheduleSelectorScreen({ navigation }) {
  const { darkTheme, i18n, saveData, schedules, setSchedules, setScheduleInUse } = useContext(GlobalContext)

  const [modalInputVisible, setModalInputVisible] = useState(false)
  const [indexToDuplicate, setIndexToDuplicate] = useState(0)
  const [titleOfDuplicated, setTitleOfDuplicated] = useState('')
  const [errorOnDuplicated, setErrorOnDuplicated] = useState('')
  
  const [styles, colors] = createStyles(darkTheme, errorOnDuplicated)

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
    let newSchedules = schedules.filter((ev, evIndex) => evIndex !== index)

    if (schedules[index].inUse && newSchedules.length > 0) newSchedules[0].inUse = true

    setSchedules(newSchedules)
      
    const scheduleInUse = newSchedules.filter(schedule => schedule.inUse)[0]
    
    setScheduleInUse(scheduleInUse ? scheduleInUse : {})

    saveData('@schedules', newSchedules)
  }

  const showAlert = index => {
    Alert.alert(
      i18n.t('schedules.alertTitle'),
      i18n.t('schedules.alertMsg'),
      [
        {
          text: i18n.t('schedules.alertBtnCancel'),
          onPress: () => console.log('Canceled'),
          style: "cancel"
        },
        { text: i18n.t('schedules.alertBtnOK'), onPress: () => removeSchedule(index) }
      ]
    )
  }

  const showModalInput = index => {
    setModalInputVisible(true)
    setIndexToDuplicate(index)
    setTitleOfDuplicated(schedules[index].title)
  }

  const resetModal = () => {
    setErrorOnDuplicated('')
    setModalInputVisible(false)
  }

  const duplicateSchedule = () => {
    const schedulesTitles = schedules.map(schedule => schedule.title)

    if (schedulesTitles.includes(titleOfDuplicated) || titleOfDuplicated.length === 0) {
      setErrorOnDuplicated(i18n.t('schedules.invalidDuplicateTitle'))

    } else {
      const duplicatedSchedule = JSON.parse(JSON.stringify(schedules[indexToDuplicate]))
      duplicatedSchedule.title = titleOfDuplicated
      duplicatedSchedule.inUse = false
  
      const newSchedules = [...schedules]
      newSchedules.splice(indexToDuplicate + 1, 0, duplicatedSchedule)
  
      setSchedules(newSchedules)
  
      saveData('@schedules', newSchedules)
  
      resetModal()
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.titleBar]}>
        <MaterialIcon name='timetable' size={26} style={[styles.text, {marginTop: 6, paddingRight: 10}]} />
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t('schedules.title')}</Text>
      </View>

      {modalInputVisible && (
        <ModalInput onCancel={resetModal} onOk={duplicateSchedule}>
          <Text style={[{fontFamily: 'OpenSans_400Regular'}, styles.duplicateScheduleInfo]}>{i18n.t('schedules.duplicateScheduleTitle')}:</Text>
          <TextInput
            multiline={false}
            value={titleOfDuplicated}
            onChangeText={text => setTitleOfDuplicated(text.trim())}
            style={styles.duplicateScheduleInput}
          />
          {errorOnDuplicated.length > 0 && <Text style={styles.errorMessage}>{errorOnDuplicated}</Text>}
        </ModalInput>
      )}

      <ScrollView style={styles.scheduleSection} contentContainerStyle={[styles.basic, {justifyContent: 'flex-start'}]}>
        {schedules.length > 0
          ? schedules.map((ev, index) => <SchedulePreview key={index} styles={styles} colors={colors}
            schedule={ev} index={index} showAlert={showAlert} selectSchedule={selectSchedule}
            navigation={navigation} showModalInput={showModalInput}
          />)
          : <Text style={[styles.text, {fontSize: 16}]}>{i18n.t('schedules.noSchedules')}</Text>
        }
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

const createStyles = (darkTheme, errorOnDuplicated) => {
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
      width: '100%'
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
    scheduleButtons: {
      backgroundColor: colors.secondaryBackground,
      marginRight: 8,
      flexDirection: 'row'
    },
    scheduleTitle: {
      fontSize: 16,
      marginLeft: 10
    },
    scheduleRemoveButton: {
      color: colors.red,
      marginTop: 2,
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    scheduleDuplicateButton: {
      color: colors.orange,
      marginTop: 4,
      paddingVertical: 10,
      paddingHorizontal: 8
    },
    duplicateScheduleInfo: {
      paddingHorizontal: 12,
      paddingTop: 12,
    },
    duplicateScheduleInput: {
      backgroundColor: colors.secondaryBackground,
      color: colors.mainForeground,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginHorizontal: 12,
      marginTop: 12,
      borderRadius: 5,
      marginBottom: errorOnDuplicated.length === 0 ? 14 : 0
    },
    errorMessage: {
      color: colors.red,
      marginHorizontal: 20,
      marginTop: 4,
      marginBottom: 12,
      fontSize: 14
    }
  }), colors]
}