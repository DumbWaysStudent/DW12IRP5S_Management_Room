
import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';
import { Share } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import store from './components/_redux/store'
import Login from './components/screen/Login'
import Detail from './components/screen/Detail'
import profile from './components/screen/profile'
import customer from './components/screen/customer'
import checkin from './components/screen/checkin'



const SignedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      title: 'Login',
      navigationOptions: { header: null },
    }
  },
  {
    initialRouteName: 'Login',
  }
);

const RoomStack = createStackNavigator(
  {
    Detail: {
      screen: Detail,
      title: 'Room',
      navigationOptions: { header: null },
    },
  },
  {
    initialRouteName: 'Detail',
  }
)

const CheckinStack = createStackNavigator(
  {
    checkin: {
      screen: checkin,
      title: 'Check In',
      navigationOptions: { header: null },
    },

  },
  {
    initialRouteName: 'checkin',
  }
)

const SettingStack = createStackNavigator(
  {
    profile: {
      screen: profile,
      title: 'Setting',
      navigationOptions: { header: null },
    }
  },
  {
    initialRouteName: 'profile',
  }
)

const CustomerStack = createStackNavigator(
  {
    customer: {
      screen: customer,
      title: 'Customer',
      navigationOptions: { header: null },
    },
  },
  {
    initialRouteName: 'customer',
  }
)

const BottomTab = createBottomTabNavigator({
  checkin: CheckinStack,
  Detail: RoomStack,
  customer: CustomerStack,
  profile: SettingStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'checkin') {
        iconName = `check-circle`;
      } else if (routeName === 'Detail') {
        iconName = `bed`;
      } else if (routeName === 'customer') {
        iconName = `id-card`;
      } else if (routeName === 'profile') {
        iconName = `cog`;
      }
      return <Icon type="FontAwesome5" name={iconName} size={25} style={{ color: tintColor, }} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: '#E1F7D5',
    showLabel: false,
    keyboardHidesTabBar: true,
    style: {
      backgroundColor: '#f3b5f5',
    }
  }
})

const Switch = createSwitchNavigator({
  BottomTab: BottomTab,
  SignedOut: SignedOut
},
  {
    initialRouteName: "SignedOut",
  });

const AppContainer = createAppContainer(Switch);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App