import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TimeMachinesScreen from './screens/TimeMachinesScreen';
import ClsVScreen from './screens/ClsVScreen';
import ClsVIScreen from './screens/ClsVIScreen';
import ClsVIIScreen from './screens/ClsVIIScreen';
import ClsVIIIScreen from './screens/ClsVIIIScreen';
import PaleoliticScreen from './screens/PaleoliticScreen';
import NeoliticScreen from './screens/NeoliticScreen';
import VanatoareScreen from './screens/VanatoareScreen';
import AsezareScreen from './screens/AsezareScreen';
import LeonardoScreen from './screens/LeonardoScreen';    
import MichelangeloScreen from './screens/MichelangeloScreen';
import ReginaMariaScreen from './screens/ReginaMariaScreen';
import SoldatScreen from './screens/SoldatScreen'; // Assuming you have a SoldatScreen for the soldier puzzle
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TimeMachinesScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TimeMachinesScreen" component={TimeMachinesScreen} />
        <Stack.Screen name="ClsVScreen" component={ClsVScreen} />
        <Stack.Screen name="ClsVIScreen" component={ClsVIScreen} />
        <Stack.Screen name="ClsVIIScreen" component={ClsVIIScreen} />
        <Stack.Screen name="ClsVIIIScreen" component={ClsVIIIScreen} />
        <Stack.Screen name="PaleoliticScreen" component={PaleoliticScreen} />
        <Stack.Screen name="NeoliticScreen" component={NeoliticScreen} />
        <Stack.Screen name="Vanatoare" component={VanatoareScreen} />
        <Stack.Screen name="Asezare" component={AsezareScreen} />
        <Stack.Screen name="LeonardoScreen" component={LeonardoScreen} />
        <Stack.Screen name="Michelangelo" component={MichelangeloScreen} />
        <Stack.Screen name="ReginaMariaScreen" component={ReginaMariaScreen} />
        <Stack.Screen name="SoldatScreen" component={SoldatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
