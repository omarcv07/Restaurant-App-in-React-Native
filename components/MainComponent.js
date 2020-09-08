import React, { useEffect } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Text, Platform, Image, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent'
import NetInfo from '@react-native-community/netinfo';

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
})

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

const ReservationNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouteName='Reservation'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#512DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          }
        }}>
        <NavigatorComponent.Screen
          name='Reservation'
          component={Reservation}
          options={
            () => ({
              headerLeft: () => <MenuIcon navigation={navigation} />
            })
          }
          />
    </NavigatorComponent.Navigator>
  );
}

const FavoritesNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouteName='Favorites'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#512DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          }
        }}>
        <NavigatorComponent.Screen
          name='Reservation'
          component={Favorites}
          options={
            () => ({
              headerLeft: () => <MenuIcon navigation={navigation} />
            })
          }
          />
    </NavigatorComponent.Navigator>
  );
}

const LoginNavigatorScreen = ({ navigation }) => {
  return (
    <NavigatorComponent.Navigator
      initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#512DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          }
        }}>
        <NavigatorComponent.Screen
          name='Login'
          component={Login}
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
        name='Login' 
        component={LoginNavigatorScreen} 
        options={{
          drawerLabel: 'Login',
          drawerIcon: ({ color }) => (
            <Icon
              name='sign-in'
              type='font-awesome'
              size={24}
              color={color}
            />
          )
        }}
      />
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
      <Drawer.Screen
        name='My Favorites'
        component={FavoritesNavigatorScreen}
        options={{
          drawerLabel: 'My Favorites',
          drawerIcon: ({ color }) => (
            <Icon 
              name='heart'
              type='font-awesome'
              size={24}
              color={color}
              />
          )
        }}
      />
      <Drawer.Screen
        name='Reservation'
        component={ReservationNavigatorScreen}
        options={{
          drawerLabel: 'Reservation',
          drawerIcon: ({ color }) => (
            <Icon 
              name='cutlery'
              type='font-awesome'
              size={24}
              color={color}
              />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

// Main Component
const Main = (props) => {

  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    NetInfo.addEventListener(state => {
      handleConnectivityChange(state)
    });
  }, []);

  const handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
        case 'none': 
            ToastAndroid.show ('You are now offline', ToastAndroid.LONG);
            break;
        case 'wifi':
            ToastAndroid.show ('You are now on WiFi', ToastAndroid.LONG);
            break;
        case 'cellular':
            ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
            break;
        case 'unknown':
            ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
            break;
        default: 
    }
  }

  return (
    <NavigationContainer  >
        <MainNavigator />
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);