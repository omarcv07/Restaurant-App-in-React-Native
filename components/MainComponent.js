import React, { useState } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Text, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';

const NavigatorComponent = createStackNavigator();
const Drawer = createDrawerNavigator();

// Menu Icon
const MenuIcon = (props) => {
  return (
    <Icon 
      name='menu'
      size={24}
      color='white'
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
}

// Menu Component
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
        options={
          () => ({
            headerLeft: () => <MenuIcon navigation={navigation} />
          })
        }
      />
      <NavigatorComponent.Screen 
        name='Dishdetail'
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail'}}
      />
    </NavigatorComponent.Navigator>
  );
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')}
            style={styles.drawerImage}/>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

// Home Component
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
        options={
          () => ({
            headerLeft: () => <MenuIcon navigation={navigation} />
          })
        }
      />
    </NavigatorComponent.Navigator>
  );
}

// Contact Component
const ContactNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff'
        },
      }}
    >
      <NavigatorComponent.Screen 
        name='Contact'
        component={Contact}
        options={
          () => ({
            headerLeft: () => <MenuIcon navigation={navigation} />
          })
        }
      />

    </NavigatorComponent.Navigator>
  );
}

// About Component 
const AboutNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouteName='About'
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
      name='About'
      component={About}
      options={
        () => ({
          headerLeft: () => <MenuIcon navigation={navigation} />
        })
      }
    />
    </NavigatorComponent.Navigator>
  );
}

// Sidebar
const MainNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      drawerStyle={{ 
        backgroundColor: '#D1C4E9',
      }}
      drawerContent={props => <CustomDrawerContentComponent {...props}/>}
    >
      <Drawer.Screen 
        name='Home' 
        component={HomeNavigatorScreen} 
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name='About us' 
        component={AboutNavigatorScreen} 
        options={{
          drawerLabel: 'About us',
          drawerIcon: ({ color }) => (
            <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                color={color}
              />
          )
        }}
      />
      <Drawer.Screen 
        name='Menu' 
        component={MenuNavigatorScreen} 
        options={{
          drawerLabel: 'Menu',
          drawerIcon: ({ color }) => (
            <Icon
                name='list'
                type='font-awesome'
                size={24}
                color={color}
              />
          )
        }}
      />
      <Drawer.Screen 
        name='Contact us' 
        component={ContactNavigatorScreen}
        options={{
          drawerLabel: 'Contact us',
          drawerIcon: ({ color }) => (
            <Icon
                name='address-card'
                type='font-awesome'
                size={22}
                color={color}              
              />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

// Main Component
const Main = () => {

  return (
    <NavigationContainer  >
        <MainNavigator />
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Main;