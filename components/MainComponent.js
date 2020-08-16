import React, { useState } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './HomeComponent'

const NavigatorComponent = createStackNavigator();
const Drawer = createDrawerNavigator();


const MenuNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouterName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff'
        }
      }}
    >
      <NavigatorComponent.Screen 
        name='Menu'
        component={Menu}
      />
      <NavigatorComponent.Screen 
        name='Dishdetail'
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail'}}
      />
    </NavigatorComponent.Navigator>
  );
}

const HomeNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouterName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff'
        }
      }}
    >
      <NavigatorComponent.Screen 
        name='Home'
        component={Home}
      />
    </NavigatorComponent.Navigator>
  );
}

const MainNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      drawerStyle={{ 
        backgroundColor: '#D1C4E9' 
      }}
    >
      <Drawer.Screen name='Home' drawerLabel='Home' component={HomeNavigatorScreen} />
      <Drawer.Screen name='Menu' component={MenuNavigatorScreen} />
    </Drawer.Navigator>
  );
}

const Main = () => {

  return (
    <NavigationContainer  >
        <MainNavigator />
    </NavigationContainer>
  );
}
  
export default Main;