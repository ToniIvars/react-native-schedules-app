import { useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar, Switch } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown'

import { colorPalette, GlobalContext, languages } from '../config/config'

export default function ConfigScreen() {
  const { darkTheme, setDarkTheme, changeLanguage, i18n, language, saveData, readData } = useContext(GlobalContext)

  const [styles, colors] = createStyles(darkTheme)

  const toggleSwitch = () => {
    readData('@config', {})
      .then(previousConfig => {
        previousConfig.darkTheme = !previousConfig.darkTheme
        saveData('@config', previousConfig)
      })

    setDarkTheme(previousState => !previousState)
  }

  const selectLang = (index, language) => {
    readData('@config', {})
      .then(previousConfig => {
        previousConfig.language = language
        saveData('@config', previousConfig)
      })

    changeLanguage(language)
  }

  const [fontsLoaded] = useFonts({OpenSans_400Regular})

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.basic, styles.titleBar]}>
        <OctIcon name='gear' size={24} style={[styles.text, {paddingTop: 2, paddingRight: 12}]} />
        <Text style={[styles.text, styles.screenTitle]}>{i18n.t('config.title')}</Text>
      </View>

      <View style={[styles.basic, styles.configuration]}>
        <View style={styles.configOptionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <OctIcon name='moon' size={22} style={[styles.text, {marginRight: 10, paddingTop: 2, transform: [{rotate: '100deg'}]}]} />
            <Text style={[styles.text, styles.configOptionText]}>{i18n.t('config.darkTheme')}</Text>
          </View>
          <Switch
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            trackColor={{ false: '#767577', true: '#9CD2F1' }}
            thumbColor={darkTheme ? '#2DA4E8' : '#ADADAD'}
            ios_backgroundColor='#3E3E3E'
            onValueChange={toggleSwitch}
            value={darkTheme}
          />
        </View>

        <View style={styles.configOptionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <IonIcon name='language' size={22} style={[styles.text, {marginRight: 10, paddingTop: 2}]} />
            <Text style={[styles.text, styles.configOptionText]}>{i18n.t('config.language')}</Text>
          </View>
          <ModalDropdown
            options={['English', 'Espa??ol']}
            defaultValue={languages[language]}
            onSelect={selectLang}
            style={styles.dropdownButton}
            textStyle={[styles.text, styles.dropdownButtonText]}
            dropdownStyle={styles.dropdown}
            dropdownTextStyle={[styles.text, styles.dropdownText]}
            dropdownTextHighlightStyle={[styles.text, {backgroundColor: colors.mainBackground}]}
          />
        </View>
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
    titleBar: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: colors.secondaryBackground,
    },
    screenTitle: {
      fontSize: 28
    },
    configuration: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colors.mainBackground,
    },
    configOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 24,
      paddingTop: 8
    },
    configOptionText: {
      fontSize: 20,
    },
    dropdown: {
      width: '45%',
      backgroundColor: colors.secondaryBackground,
      borderColor: colors.mainForeground,
      borderRadius: 5,
      paddingTop: 4
    },
    dropdownText: {
      backgroundColor: colors.secondaryBackground,
      fontSize: 14
    },
    dropdownButton: {
      backgroundColor: '#ADADAD',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 5
    },
    dropdownButtonText: {
      color: colors.secondaryForeground,
      fontSize: 14
    }
  }), colors]
}