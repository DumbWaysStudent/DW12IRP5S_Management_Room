import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ip } from '../ip'

// const hight = Dimensions.get('window').height
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      pass: true,
      isDisabled: true,
      username: "",
      password: null,
      token: "",
      id: null,
      isLoading: false

    }
  }

  userLogin = () => {
    axios({
      method: 'POST',
      url: `${ip}/login`,
      data: {
        email: this.state.username,
        password: this.state.password
      }
    }).then(res => {

      this.setState({
        token: res.data.token,
        id: res.data.user.id
      })



      if (typeof res.data.token !== 'undefined') {
        AsyncStorage.setItem('token', this.state.token)
        AsyncStorage.setItem('id', JSON.stringify(this.state.id))
        this.props.navigation.navigate('Detail')
      } else {
        alert('Login failed!')
      }
    })
  }

  userValidation = (username) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(username) == true && this.state.password != null) {
      this.setState({
        username,
        isDisabled: false,
      })
    } else {
      this.setState({
        username,
        isDisabled: true
      })
    }
    this.setState({
      username,
    })
  }

  passValidation = (password) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (password != null && reg.test(this.state.username) == true) {
      this.setState({
        password,
        isDisabled: false,
      })
    } else {
      this.setState({
        password,
        isDisabled: true
      })
    }
    this.setState({
      password
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f3b5f5" barStyle="light-content" />
        <View style={styles.top}>
          <Text style={styles.title}>SNOHOY</Text>
          <Text style={styles.sub}>Room management App</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={username => this.userValidation(username)}
              />

            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="password"
                onChangeText={password => this.passValidation(password)}
                secureTextEntry={true}
              />
            </View>
          </View>
          {this.state.isLoading === true ? (
            <ActivityIndicator size="large" />
          ) : (
              <TouchableOpacity style={styles.btn} onPress={() => this.userLogin()}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3b5f5"
  },
  top: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 33,
    letterSpacing: 5.6,
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: "white"
  },
  sub: {
    fontSize: 16,
    color: "#696969",
    justifyContent: 'center',
    textAlign: 'center'
  },

  bottom: {
    minHeight: '45%',
    backgroundColor: "white",
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formGroup: {
    marginVertical: 13
  },
  lable: {
    fontSize: 15,
    fontFamily: 'Lato',
  },
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#696969"
  },
  input: {
    paddingVertical: 10,
    fontSize: 15,
  },

  btn: {
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    paddingVertical: 15
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
    color: "white"
  }
})
