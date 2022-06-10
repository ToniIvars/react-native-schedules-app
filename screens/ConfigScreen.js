import { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Platform, StatusBar, Switch } from 'react-native'
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans'
import OctIcon from 'react-native-vector-icons/Octicons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AppLoading from 'expo-app-loading'
import ModalDropdown from 'react-native-modal-dropdown'

import colors from '../config/colors'

export default function ConfigScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('English')

  const toggleSwitch = () => setDarkMode(previousState => !previousState)
  const selectLang = (index, value) => setLanguage(value)

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
          <OctIcon name='gear' size={24} style={[styles.text, {paddingTop: 2, paddingRight: 12}]} />
          <Text style={[styles.text, styles.screenTitle]}>Configuration</Text>
        </View>

        <View style={[styles.basic, styles.configuration]}>
          <View style={styles.configOptionContainer}>
            <View style={{ flexDirection: 'row' }}>
              <OctIcon name='moon' size={22} style={[styles.text, {marginRight: 10, paddingTop: 2, transform: [{rotate: '100deg'}]}]} />
              <Text style={[styles.text, styles.configOptionText]}>Dark mode</Text>
            </View>
            <Switch
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              trackColor={{ false: '#767577', true: '#FBF989' }}
              thumbColor={darkMode ? '#ECE809' : '#ADADAD'}
              ios_backgroundColor='#3E3E3E'
              onValueChange={toggleSwitch}
              value={darkMode}
            />
          </View>

          <View style={styles.configOptionContainer}>
            <View style={{ flexDirection: 'row' }}>
              <IonIcon name='language' size={22} style={[styles.text, {marginRight: 10, paddingTop: 2}]} />
              <Text style={[styles.text, styles.configOptionText]}>Language</Text>
            </View>
            <ModalDropdown
              options={['English', 'Español']}
              defaultValue={language}
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
    fontFamily: 'OpenSans_400Regular'
  },
  titleBar: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.secondaryBackgorund,
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
    backgroundColor: colors.secondaryBackgorund,
    borderColor: colors.foreground,
    borderRadius: 5,
    paddingTop: 4
  },
  dropdownText: {
    backgroundColor: colors.secondaryBackgorund,
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
  },
  goBackIcon: {
    position: 'absolute',
    top: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 16,
    left: 14,
    color: 'white',
    zIndex: 1
  }
})