import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen'
import ConfigScreen from './screens/ConfigScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Main'
          component={MainScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name='Configuration' component={ConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}