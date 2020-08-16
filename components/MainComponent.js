import React, { useState } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const MenuNavigator = createStackNavigator();

const MenuNavigatorScreen = () => {
  return (
    <MenuNavigator.Navigator
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
      <MenuNavigator.Screen 
        name='Menu'
        component={Menu}
      />
      <MenuNavigator.Screen 
        name='Dishdetail'
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail'}}
      />
    </MenuNavigator.Navigator>
  );
}

const Main = () => {

  return (
    <NavigationContainer  >
        <MenuNavigatorScreen />
    </NavigationContainer>
  );
}
  
export default Main;