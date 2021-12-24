import 'react-native-gesture-handler';
import * as React from 'react';
import { Image, StyleSheet,} from 'react-native';
import { IconButton } from 'react-native-paper'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import UpdateScreen from './screens/UpdateScreen';
import logo from './assets/aldenzee_rvs_logo.png';


export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen"
        style={Styles.header}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#333333',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
          headerTintColor: '#C2C2C2',
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <IconButton 
                icon="file-plus"
                size= {30}
                color='#C2C2C2'
                style = {Styles.headerButton}
                onPress={() => navigation.navigate('AddScreen')}
              />
            ),
          })}
        />
        <Stack.Screen 
          name="AddScreen" 
          component={AddScreen} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="UpdateScreen"
          component={UpdateScreen}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LogoTitle() {
  return (
    <Image
      source={logo}
      style={Styles.logo}
    />
  );
}

const Styles = StyleSheet.create({
  header: {
    padding: 10,
  },
  logo: {
    width: 150, 
    height: 30,
    marginLeft: 20,
  },
});