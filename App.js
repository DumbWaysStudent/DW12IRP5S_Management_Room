
// import Login from './components/screen/Login';
// import ForYou from './components/screen/ForYou';
// import Detail from './components/screen/Detail';

// export default Detail;
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
import addcustomer from './components/screen/addcustomer'
import editcustomer from './components/screen/editcustomer'
import checkin from './components/screen/checkin'
import addcheckin from './components/screen/addcheckin'


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
      navigationOptions: () => ({
        title: "ROOM",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
    },
    // addroom: {
    //   screen: addroom,
    //   title: 'Add Room',
    //   navigationOptions: () => ({
    //     title: "ADD ROOM",
    //     headerStyle: {
    //       backgroundColor: '#f3b5f5'
    //     },
    //     headerTintColor: 'white',
    //     headerTitleStyles: {
    //       fontWeight: 'bold',
    //       fontSize: 22,
    //       fontFamily: 'Georgia',
    //     },

    //   })

    // },
    // editroom: {
    //   screen: editroom,
    //   title: 'Edit Room',
    //   navigationOptions: () => ({
    //     title: "EDIT ROOM",
    //     headerStyle: {
    //       backgroundColor: '#f3b5f5'
    //     },
    //     headerTintColor: 'white',
    //     headerTitleStyles: {
    //       fontWeight: 'bold',
    //       fontSize: 22,
    //       fontFamily: 'Georgia',
    //     },

    //   })
    // }
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
      navigationOptions: () => ({
        title: "CHECKIN",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
    },
    addcheckin: {
      screen: addcheckin,
      title: 'Add Check In',
      navigationOptions: () => ({
        title: "ADD CHECK IN",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
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
      navigationOptions: () => ({
        title: "SETTING",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
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
      navigationOptions: () => ({
        title: "CUSTOMER",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
    },
    addcustomer: {
      screen: addcustomer,
      title: 'Add Customer',
      navigationOptions: () => ({
        title: "ADD CUSTOMER",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
    },
    editcustomer: {
      screen: editcustomer,
      title: 'Edit Customer',
      navigationOptions: () => ({
        title: "EDIT CUSTOMER",
        headerStyle: {
          backgroundColor: '#f3b5f5'
        },
        headerTintColor: 'white',
        headerTitleStyles: {
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: 'Georgia',
        },

      })
    }
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