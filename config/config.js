import React from 'react'

const colorPalette = {
  lightTheme: {
    mainBackground: '#E8E8E8',
    secondaryBackground: '#CDCDCD',
    mainForeground: '#2B2B2B',
    secondaryForeground: '#2B2B2B',
    green: '#358247',
    grey: '#E8E8E8'
  },
  darkTheme: {
    mainBackground: '#424242',
    secondaryBackground: '#2B2B2B',
    mainForeground: '#F7F7FF',
    secondaryForeground: '#2B2B2B',
    green: '#358247',
    grey: '#AFAFAF'
  }
}

const GlobalContext = React.createContext()

const languages = {
  'English': 'en',
  'Español': 'es',
  'en': 'English',
  'es': 'Español'
}

export { colorPalette, GlobalContext, languages }